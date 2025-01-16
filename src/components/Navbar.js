import React, { useState, useEffect } from 'react';

export default function Navbar() {

    const [activeSection, setActiveSection] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: .5, 
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id); // Update active section
                }
            });
        }, options);

        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <div onClick={() => scrollToSection('home')}><img src="/zr1.png" alt='ZR'/></div>
            </div>
                <div className={`hamburger-menu ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)}>
                    <div className="bar1"></div>
                    <div className="bar2"></div>
                    <div className="bar3"></div>
                </div>
                <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                    <div className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</div>
                    <div className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</div>
                    <div className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</div>
                    <div className={activeSection === 'company' ? 'active' : ''}onClick={() => scrollToSection('company')}>Company</div>
                    <div className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</div>
                    <div className="navbar-social-icons">
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-github"></i></a>
                    </div>
                </div>
        </nav>
    );
}
