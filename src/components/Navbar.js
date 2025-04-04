import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {

    const [activeSection, setActiveSection] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const navigateToNewsletter = () => {
        navigate('/newsletter');
    }

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
        setMenuOpen(false);
        
        // If we're on the newsletter page, navigate to main page first
        if (location.pathname === "/newsletter") {
            navigate("/", { state: { scrollTo: id } });
        } else {
            document.getElementById(id).scrollIntoView({ behavior: "smooth" });
        }
    }

    // Handle scroll after navigation from newsletter
    useEffect(() => {
        if (location.state?.scrollTo) {
            const element = document.getElementById(location.state.scrollTo);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [location.state]);

    return (
        <nav className="navbar">
            <div className="logo">
                <div onClick={() => scrollToSection('home')}><img src="/zr1.png" alt='ZR'/></div>
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
                    <div className={activeSection === 'startups' ? 'active' : ''}onClick={() => scrollToSection('startups')}>Startups</div>
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
