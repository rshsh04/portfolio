export default function Footer() {
    return (
        <footer className="bg-base-100  text-white text-center py-4 absolute inset-x-0">
            <div className="container mx-auto">
                <p className="text-sm">This website is built with Next.js and Tailwind CSS. &copy; {new Date().getFullYear()} Rashed Ali Shekho. All rights reserved.</p>
            </div>
        </footer>
    );
}