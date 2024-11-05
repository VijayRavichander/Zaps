import NavBar from "@/components/global/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
        <NavBar />
        <section className="h-screen w-full bg-neutral-950 rounded-md 
        !overflow-visible relative flex flex-col items-center antialiased">
          {/* Gradient  */}
          <div className="absolute inset-0 h-full w-full items-center px-5
           py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#225_100%)]"></div>
           <div className="flex flex-col mt-[-100px] md:mt-[-50px]">
            
           </div>
        </section>
    </main>
  );
}
