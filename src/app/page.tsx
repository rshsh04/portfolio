"use client"; 
import Main from "@/components/main";
import Nav from "@/components/nav";
import Image from "next/image";


export default function Home() {
  return (
    <>
    <div className="fixed inset-0 ">
          <Image
            alt="Background image"
            src={"/backg.jpg"}
            quality={100}
            fill
            sizes="100vw"
            style={{
              objectFit: 'cover',
            }}
            priority
          />
        </div>
    <Nav/>
    <Main/>
    </>
  );
}
