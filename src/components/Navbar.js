import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';  // Import Next.js router

export default function Navbar() {
    const [activeSection, setActiveSection] = useState('home');
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();  // Use Next.js router

    const navigateToNewsletter = () => {
        router.push('/newsletter');  // Use router.push for navigation
    }

    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        const navCheck = () => {
            const scrollPos = window.scrollY;
            
            if (scrollPos < 100) {
                setActiveSection('home');
                return;
            }
            
            sections.forEach((section) => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    setActiveSection(section.getAttribute('id'));
                }
            });
        };

        window.addEventListener('scroll', navCheck);
        navCheck();
        
        return () => {
            window.removeEventListener('scroll', navCheck);
        };
    }, [router.pathname]);

    const scrollToSection = (id) => {
        setMenuOpen(false);
        
        if (router.pathname === "/newsletter") {
            router.push("/", { query: { scrollTo: id } });
        } else {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        }
    }

    useEffect(() => {
        if (router.query.scrollTo) {
            const element = document.getElementById(router.query.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [router.query]);

    return (
        <nav className="navbar">
            <div className="logo">
                <div onClick={() => scrollToSection('home')}><img src="/zr2.png" alt='ZR'/></div>
            </div>
            <div className="navbar-right">
                <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <div className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</div>
                    <div className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</div>
                    <div className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</div>
                    <div className={activeSection === 'companies' ? 'active' : ''} onClick={() => scrollToSection('companies')}>Companies</div>
                    <div className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</div>
                    <div className="navbar-social-icons">
                        <a href="https://github.com/zach-redder" target="_blank" rel="noreferrer">
                            <i className="fab fa-github"></i>
                        </a>
                        <a href="https://www.linkedin.com/in/zachredder/" target="_blank" rel="noreferrer">
                            <i className="fab fa-linkedin"></i>
                        </a>
                        <a href="https://x.com/zach_redder" target="_blank" rel="noreferrer">
                            <i className="fa-brands fa-x-twitter"></i>
                        </a>
                    </div>
                </div>
                <div className="vertical-line"></div>
                <button className="mobile-newsletter-button" onClick={navigateToNewsletter}>Newsletter</button>
            </div>
        </nav>
    );
}
