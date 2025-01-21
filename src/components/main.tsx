import { FaGithub, FaLinkedin, FaReact, FaNodeJs } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss,  SiJavascript, SiMongodb, SiAppwrite } from "react-icons/si";
import Image from "next/image";
import Link from "next/link";

export default function Main() {


    return (
        <>
        <main className="relative min-h-screen">
            <div className="relative container mx-auto px-4 py-44 min-h-screen flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16" id="about">

                <Image
                    src="/backg.jpg"
                    alt="Background"
                    fill
                    className="object-cover absolute inset-0 -z-10"
                    priority
                />
          <div>
                <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden ring-4 ring-primary/20 hover:ring-primary/40 transition-all duration-300">
                    <Image
                        src="/Rashed.png"
                        alt="Rashed Ali Shekho"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            </div>
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 lg:space-y-8 max-w-2xl">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Rashed Ali Shekho
                    </h1>
                    
                    <h2 className="text-2xl md:text-3xl text-neutral/90 font-medium">
                        Software Developer
                    </h2>
                    
                    <p className="text-base lg:text-lg text-neutral/80 leading-relaxed px-4 lg:px-0">
                        I&apos;m a software developer focused on creating elegant solutions 
                        to complex problems. With expertise in modern web technologies, 
                        I build responsive and performant applications.
                    </p>

                    <div className="flex flex-wrap justify-center lg:justify-start gap-3 md:gap-4">
                        {[FaReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, FaNodeJs, SiMongodb].map((Icon, index) => (
                            <div key={index} className="p-2 md:p-3 bg-base-100/50 backdrop-blur-sm rounded-xl border border-neutral/10 hover:border-primary/30 hover:scale-105 transition-all duration-300">
                                <Icon className="w-8 h-8 md:w-10 md:h-10 text-neutral/80 hover:text-primary transition-colors duration-300" />
                            </div>
                        ))}
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <a 
                            href="https://github.com/rshsh04" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full sm:w-auto px-6 py-3 bg-base-100/50 backdrop-blur-sm rounded-full border border-neutral/10 hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <FaGithub className="text-xl text-neutral/80 group-hover:text-primary transition-colors duration-300" />
                            <span className="text-neutral/80 group-hover:text-primary transition-colors duration-300">GitHub</span>
                        </a>
                        <a 
                            href="https://www.linkedin.com/in/rashed-ali-shekho-03160b204/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group w-full sm:w-auto px-6 py-3 bg-base-100/50 backdrop-blur-sm rounded-full border border-neutral/10 hover:border-secondary/30 transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            <FaLinkedin className="text-xl text-neutral/80 group-hover:text-secondary transition-colors duration-300" />
                            <span className="text-neutral/80 group-hover:text-secondary transition-colors duration-300">LinkedIn</span>
                        </a>
                    </div>
                </div>
            </div>

            <section id="projects" className="min-h-screen py-12 md:py-20 bg-base-100/90 backdrop-blur-sm rounded-t-[3rem] border-t border-neutral/10">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 md:mb-12 text-center">
                        Featured Projects
                    </h2>




                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <Link href="" className="group bg-base-100/50 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral/10 hover:border-primary/20 transition-all duration-300">
                            <div className="relative h-96 w-full overflow-hidden">
                                <Image
                                    src="/zain.png"
                                    alt="Zain Restaurant"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-neutral/90">Zain Restaurant</h3>
                                    <span className="px-3 py-1 text-sm bg-secondary/20 text-secondary rounded-full">Website</span>
                                </div>
                                <p className="text-neutral/70 mb-4">
                                    A modern restaurant website with an integrated admin dashboard for menu and order management.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <FaReact className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <SiNextdotjs className="w-5 h-5 text-neutral/80" />
                                    </div>
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <SiAppwrite className="w-5 h-5 text-pink-500/80" />
                                    </div>
                                </div>
                            </div>
                        </Link>




                        <Link href="" className="group bg-base-100/50 backdrop-blur-sm rounded-xl overflow-hidden border border-neutral/10 hover:border-primary/20 transition-all duration-300">
                            <div className="relative h-96 w-full overflow-hidden">
                                <Image
                                    src="/zain.png"
                                    alt="Zain Restaurant"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-neutral/90">Zain Restaurant</h3>
                                    <span className="px-3 py-1 text-sm bg-secondary/20 text-secondary rounded-full">Website</span>
                                </div>
                                <p className="text-neutral/70 mb-4">
                                    A modern restaurant website with an integrated admin dashboard for menu and order management.
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <FaReact className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <SiNextdotjs className="w-5 h-5 text-neutral/80" />
                                    </div>
                                    <div className="p-2 bg-base-100/30 rounded-lg">
                                        <SiAppwrite className="w-5 h-5 text-pink-500/80" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>



                </div>
            </section>

            <section id="contact" className=" py-12 md:py-20  bg-base-100/90 backdrop-blur-sm">
                <div className="container mx-auto px-4 mb-52">
                    <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-8 md:mb-12 text-center">Contact</h2>
                    <div className="max-w-2xl mx-auto px-4">
                        <p className="text-base md:text-lg text-neutral/80 mb-6 md:mb-8 text-center">
                            I&apos;m always interested in hearing about new projects and opportunities.
                            Feel free to reach out!
                        </p>
                        <div className="space-y-4">
                            <a href="mailto:your.email@example.com" 
                               className="block px-4 md:px-6 py-3 md:py-4 bg-base-100/50 backdrop-blur-sm rounded-xl border border-primary/30  hover:border-secondary transition-all duration-300 text-center">
                                your.email@example.com
                            </a>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <a 
                                    href="https://github.com/rshsh04" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex-1 px-4 md:px-6 py-3 md:py-4 bg-base-100/50 backdrop-blur-sm rounded-xl border border-neutral/10 hover:border-primary/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <FaGithub className="text-xl text-neutral/80 group-hover:text-primary transition-colors duration-300" />
                                    <span className="text-neutral/80 group-hover:text-primary transition-colors duration-300">GitHub</span>
                                </a>
                                <a 
                                    href="https://www.linkedin.com/in/rashed-ali-shekho-03160b204/" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex-1 px-4 md:px-6 py-3 md:py-4 bg-base-100/50 backdrop-blur-sm rounded-xl border border-neutral/10 hover:border-secondary/30 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <FaLinkedin className="text-xl text-neutral/80 group-hover:text-secondary transition-colors duration-300" />
                                    <span className="text-neutral/80 group-hover:text-secondary transition-colors duration-300">LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}