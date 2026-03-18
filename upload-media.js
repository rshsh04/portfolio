// Upload existing portfolio media to Supabase storage
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://kfixndvekvohfhrwzcbo.supabase.co";
// Service role key needed for server-side uploads without auth
// We'll use the anon key since the bucket is public and we need an authenticated session
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaXhuZHZla3ZvaGZocnd6Y2JvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NzIzODIsImV4cCI6MjA3MzU0ODM4Mn0.qrj3v6GSNHb3PTTLZ-lpFNoj9KlFgWnYASvPQmKXj0E";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const PUBLIC_DIR = path.join(__dirname, "public");
const BUCKET = "portfolio-media";

// Files to upload: [localPath, storagePath]
const uploads = [
  // Project images
  ["zain.png", "projects/zain.png"],
  ["splittra.png", "projects/splittra.png"],
  // Profile photo
  ["rashed.png", "profile/rashed.png"],
  // Certificate PDFs
  ["CERT/cert devicemaneg.pdf", "certificates/cert-devicemaneg.pdf"],
  ["CERT/Cert23232623487.pdf", "certificates/Cert23232623487.pdf"],
  ["CERT/Cert26332626221.pdf", "certificates/Cert26332626221.pdf"],
  ["CERT/Cert81132611159.pdf", "certificates/Cert81132611159.pdf"],
  ["CERT/Cert822172754873.pdf", "certificates/Cert822172754873.pdf"],
  ["CERT/Graphic Design  Illustration using Adobe Illustrator.pdf", "certificates/graphic-design-illustration-adobe-illustrator.pdf"],
  ["CERT/Visual Design.pdf", "certificates/visual-design.pdf"],
  ["CERT/Visual Effects  Motion Graphics using Adobe After Effects.pdf", "certificates/visual-effects-motion-graphics-adobe-after-effects.pdf"],
  ["CERT/YouTube Music-certifiering _ Google.pdf", "certificates/youtube-music-certification.pdf"],
];

async function main() {
  // Sign in first (needed for upload policy)
  const email = process.argv[2];
  const password = process.argv[3];
  
  if (!email || !password) {
    console.log("Usage: node upload-media.js <email> <password>");
    console.log("Create a user in Supabase Auth first, then run this script.");
    process.exit(1);
  }

  const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
  if (authError) {
    console.error("Auth failed:", authError.message);
    process.exit(1);
  }
  console.log("Authenticated successfully\n");

  for (const [local, remote] of uploads) {
    const filePath = path.join(PUBLIC_DIR, local);
    if (!fs.existsSync(filePath)) {
      console.log(`SKIP  ${local} (not found)`);
      continue;
    }
    const fileBuffer = fs.readFileSync(filePath);
    const contentType = local.endsWith(".pdf") ? "application/pdf" : "image/png";

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(remote, fileBuffer, { contentType, upsert: true });

    if (error) {
      console.log(`FAIL  ${remote}: ${error.message}`);
    } else {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(remote);
      console.log(`OK    ${remote} -> ${data.publicUrl}`);
    }
  }

  // Update database records with new URLs
  console.log("\nUpdating database records...");

  const { data: projects } = await supabase.from("portfolio_projects").select("id, title, image_url");
  for (const p of projects || []) {
    if (p.image_url?.startsWith("/")) {
      const fileName = path.basename(p.image_url);
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(`projects/${fileName}`);
      await supabase.from("portfolio_projects").update({ image_url: data.publicUrl }).eq("id", p.id);
      console.log(`  Project "${p.title}" -> ${data.publicUrl}`);
    }
  }

  const { data: certs } = await supabase.from("portfolio_certificates").select("id, name, pdf_path");
  const certPathMap = {
    "/CERT/cert devicemaneg.pdf": "certificates/cert-devicemaneg.pdf",
    "/CERT/Cert23232623487.pdf": "certificates/Cert23232623487.pdf",
    "/CERT/Cert26332626221.pdf": "certificates/Cert26332626221.pdf",
    "/CERT/Cert81132611159.pdf": "certificates/Cert81132611159.pdf",
    "/CERT/Cert822172754873.pdf": "certificates/Cert822172754873.pdf",
    "/CERT/Graphic Design  Illustration using Adobe Illustrator.pdf": "certificates/graphic-design-illustration-adobe-illustrator.pdf",
    "/CERT/Visual Design.pdf": "certificates/visual-design.pdf",
    "/CERT/Visual Effects  Motion Graphics using Adobe After Effects.pdf": "certificates/visual-effects-motion-graphics-adobe-after-effects.pdf",
    "/CERT/YouTube Music-certifiering _ Google.pdf": "certificates/youtube-music-certification.pdf",
  };

  for (const c of certs || []) {
    const remotePath = certPathMap[c.pdf_path];
    if (remotePath) {
      const { data } = supabase.storage.from(BUCKET).getPublicUrl(remotePath);
      await supabase.from("portfolio_certificates").update({ pdf_path: data.publicUrl }).eq("id", c.id);
      console.log(`  Cert "${c.name}" -> ${data.publicUrl}`);
    }
  }

  console.log("\nDone! All media uploaded and DB records updated.");
}

main();
