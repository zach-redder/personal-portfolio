import React, { useState, useEffect } from 'react';

import '../stylesheets/Main.css';

export default function Navbar() {

    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const sections = document.querySelectorAll('section');
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 1, 
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
    }

    return (
        <nav className="navbar">
            <div className="logo">
                <div onClick={() => scrollToSection('home')}><img src="/zr1.png" alt='ZR'/></div>
            </div>
            <div className="nav-links">
                <div className={activeSection === 'home' ? 'active' : ''} onClick={() => scrollToSection('home')}>Home</div>
                <div className={activeSection === 'about' ? 'active' : ''} onClick={() => scrollToSection('about')}>About</div>
                <div className={activeSection === 'projects' ? 'active' : ''} onClick={() => scrollToSection('projects')}>Projects</div>
                <div className={activeSection === 'company' ? 'active' : ''}onClick={() => scrollToSection('company')}>Company</div>
                <div className={activeSection === 'contact' ? 'active' : ''} onClick={() => scrollToSection('contact')}>Contact</div>
            </div>
        </nav>
    );
}
