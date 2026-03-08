export default function TranscriptPage() {
  // Path to the PDF in the public/ folder
  const pdfPath = "/Certtranscript.pdf";

  return (
    <div className="w-screen h-screen bg-black">
      <iframe
        src={pdfPath}
        title="Transcript PDF"
        className="w-full h-full"
        style={{ border: 'none' }}
      >
        <div className="p-6 text-center text-white">
          <p>Unable to display PDF in your browser.</p>
          <a
            href={pdfPath}
            target="_blank"
            rel="noopener noreferrer"
            className="underline mt-4 inline-block"
          >
            Open or download the PDF
          </a>
        </div>
      </iframe>
    </div>
  );
}
