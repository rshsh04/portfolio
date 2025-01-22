import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from "react";
export default function Nav() {
    const [count, setCount] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const imageList = [
        {
            id: 1,
            src: "/logo.png",
            alt: "Logo1"
        },
        {
            id: 2,
            src: "/logo2.png",
            alt: "Logo2"
        },
        {
            id: 3,
            src: "/logo3.png",
            alt: "Logo3"
        },
        {
            id: 4,
            src: "/logo4.png",
            alt: "Logo4"
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevCount) => (prevCount + 1) % imageList.length);
        }, 800);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <nav className="absolute top-0 left-0 right-0 z-50">
            <div className="container mx-auto px-4 sm:px-8 py-4 sm:py-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="relative w-32 h-16 sm:w-40 sm:h-20">
                            <Image 
                                key={imageList[count].id}
                                src={imageList[count].src}
                                alt={imageList[count].alt}
                                fill
                                className="object-contain"
                                priority 
                            />
                        </div>
                    </Link>
                    
                    {/* Hamburger menu for mobile */}
                    <button 
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                        <div className="w-6 h-0.5 bg-current mb-1.5"></div>
                        <div className="w-6 h-0.5 bg-current"></div>
                    </button>

                    {/* Mobile menu */}
                    <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-full left-0 right-0 bg-base-100/90 backdrop-blur-sm flex-col items-center py-4 space-y-4 `}>
                        <Link href="#projects" className="text-lg hover:text-primary transition-colors duration-300 ">
                            Projects
                        </Link>
                        <Link href="#contact" className="text-lg hover:text-primary transition-colors duration-300">
                            Contact
                        </Link>
                        <a 
                            href="/resume"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-lg underline decoration-primary underline-offset-4 hover:text-primary transition-colors duration-300"
                        >
                            Resume
                        </a>
                    </div>

                    {/* Desktop menu */}
                    <div className="hidden md:flex items-center space-x-12">
                        <Link href="#projects" className="text-lg hover:text-primary transition-colors duration-300">
                            Projects
                        </Link>
                        <Link href="#contact" className="text-lg hover:text-primary transition-colors duration-300">
                            Contact
                        </Link>
                        <a 
                            href="/resume"
                            target="_blank"
                            rel="noopener noreferrer" 
                            className="text-lg underline decoration-primary underline-offset-4 hover:text-primary transition-colors duration-300"
                        >
                            Resume
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}