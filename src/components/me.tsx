import Link from "next/link";
import { useState } from "react";

export default function Me() {
    const [activeTab, setActiveTab] = useState('experience');

    const experience = [
        {
            title: "Software Developer",
            company: "Freelance",
            duration: "2023 - Present", 
            description: "Developed and maintained web applications using React, Next.js, and TypeScript. Collaborated with cross-functional teams to deliver high-quality software solutions."
        },
    ];

    const education = [
        {
            degree: "Bachelor of Science in Information Systems",
            institution: "Karlstads Universitet",
            duration: "2023 - 2026",
            description: "Focused on software engineering, system design, and web development fundamentals."
        },
    ];

    const certificate = [
        {
            Certificate: "Device Configuration and Managment",
            Issuing: "ITS",
            date: "2023-05",
            path:"/CERT/cert devicemaneg.pdf"
        },
        {
            Certificate: "Video Design",
            Issuing: "Adobe",
            date: "2023-03",
            path:"/CERT/Cert23232623487.pdf"
        },
        {
            Certificate: "Visual Design using Adobe Photoshop",
            Issuing: "Adobe",
            date: "2023-03",
            path:"/CERT/Cert26332626221.pdf"
        },
        {
            Certificate: "Digital Video using Adobe Premiere Pro",
            Issuing: "Adobe",
            date: "2023-04",
            path:"/CERT/Cert81132611159.pdf"
        },
        {
            Certificate: "Print & digital media publication using Adobe InDesign",
            Issuing: "Adobe",
            date: "2023-04",
            path:"/CERT/Cert822172754873.pdf"
        },
        {
            Certificate: "Graphic Design & Illustration using Adobe Illustrator",
            Issuing: "Adobe",
            date: "2023-04",
            path:"/CERT/Graphic Design  Illustration using Adobe Illustrator.pdf"
        },
        {
            Certificate: "Visual Design",
            Issuing: "Adobe",
            date: "2023-04",
            path:"/CERT/Visual Design.pdf"
        },
        {
            Certificate: "Visual Effects & Motion Graphics using Adobe After Effects",
            Issuing: "Adobe",
            date: "2023-04",
            path:"/CERT/Visual Effects  Motion Graphics using Adobe After Effects.pdf"
        }, {
            Certificate: "YouTube Music Certification",
            Issuing: "Youtube Music",
            date: "2023-11",
            path:"/CERT/YouTube Music-certifiering _ Google.pdf"
        },
        
        
    ];

    return (
        <section className="py-16 md:py-24 bg-base-100/90 backdrop-blur-sm border-y border-neutral/10 rounded-[3rem]">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-12 text-center">
                    About Me
                </h2>

                <div className="flex justify-center mb-8">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 p-2 bg-base-100/50 backdrop-blur-sm rounded-full border border-neutral/10 shadow-lg shadow-primary/5">
                        <button
                            onClick={() => setActiveTab('experience')}
                            className={`px-6 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                                activeTab === 'experience'
                                    ? 'bg-gradient-to-r from-primary to-primary/80 text-black shadow-md'
                                    : 'hover:bg-neutral/10'
                            }`}
                        >
                            Experience
                        </button>
                        <button
                            onClick={() => setActiveTab('education')}
                            className={`px-6 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                                activeTab === 'education'
                                    ? 'bg-gradient-to-r from-secondary to-secondary/80 text-black shadow-md'
                                    : 'hover:bg-neutral/10'
                            }`}
                        >
                            Education
                        </button>
                        <button
                            onClick={() => setActiveTab('Certificate')}
                            className={`px-6 py-2 rounded-full transition-all duration-300 font-medium whitespace-nowrap ${
                                activeTab === 'Certificate'
                                    ? 'bg-gradient-to-r from-primary to-primary/80 text-black shadow-md'
                                    : 'hover:bg-neutral/10'
                            }`}
                        >
                            Certificate
                        </button>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto">
                    {activeTab === 'experience' ? (
                        <div className="space-y-6">
                            {experience.map((exp, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-base-100/50 backdrop-blur-sm rounded-[2rem] border border-neutral/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                                >
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                        {exp.title}
                                    </h3>
                                    <p className="text-base text-neutral/80 font-medium mt-1">{exp.company}</p>
                                    <p className="text-sm text-neutral/60 font-medium">{exp.duration}</p>
                                    <p className="mt-3 text-base text-neutral/80 leading-relaxed">
                                        {exp.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : activeTab === 'education' ? (
                        <div className="space-y-6">
                            {education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-base-100/50 backdrop-blur-sm rounded-[2rem] border border-neutral/10 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/5 group"
                                >
                                    <h3 className="text-xl font-bold bg-gradient-to-r from-secondary to-secondary/80 bg-clip-text text-transparent">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-base text-neutral/80 font-medium mt-1">{edu.institution}</p>
                                    <p className="text-sm text-neutral/60 font-medium">{edu.duration}</p>
                                    <p className="mt-3 text-base text-neutral/80 leading-relaxed">
                                        {edu.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ):(
                        <div className="space-y-6">
                        {certificate.map((cert, index) => (
                            <div
                                key={index}
                                className="p-6 bg-base-100/50 backdrop-blur-sm rounded-[2rem] border border-neutral/10 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 group"
                            >
                                <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                                    {cert.Certificate}
                                </h3>
                                <p className="text-base text-neutral/80 font-medium mt-1">{cert.Issuing}</p>
                                <p className="text-sm text-neutral/60 font-medium">{cert.date}</p>
                                <Link href={cert.path} target="_blank">
                                    <button className="mt-3 px-6 py-2 rounded-full bg-gradient-to-r from-primary to-primary/80 text-black font-medium 
                                        hover:shadow-lg hover:shadow-primary/20 
                                        hover:scale-105 
                                        hover:border-primary/30 
                                        border border-transparent 
                                        transition-all duration-300 
                                        flex items-center gap-2 
                                        group">
                                        Preview
                                        <svg 
                                            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24">
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </button>
                                </Link>
                                
                            </div>
                        ))}
                    </div>
                    )}
                </div>
            </div>
        </section>
    );
}
