import Footer from "@/components/footer";
import Main from "@/components/main";
import Nav from "@/components/nav";
import { supabase } from "@/lib/supabase";
import { DBProject, DBCertificate } from "@/lib/types";

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const [{ data: projects }, { data: certificates }] = await Promise.all([
    supabase.from("portfolio_projects").select("*").order("sort_order"),
    supabase.from("portfolio_certificates").select("*").order("sort_order"),
  ]);

  return (
    <>
      <Nav />
      <Main
        initialProjects={projects || []}
        initialCertificates={certificates || []}
      />
      <Footer />
    </>
  );
}
