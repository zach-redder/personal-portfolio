import React, { useEffect } from "react";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "../stylesheets/Main.css";
import "../stylesheets/Navbar.css";
import "../stylesheets/Socials.css";
import "../stylesheets/ContactBox.css";
import "../stylesheets/About.css";
import "../stylesheets/StartScreen.css";
import "../stylesheets/Skills.css";
import "../stylesheets/Projects.css";
import "../stylesheets/Company.css";
import "../stylesheets/Volunteering.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactBox from "../components/ContactBox";
import SkillsBar from "../components/SkillsBar";

function MainPage() {

    useEffect(() => {
        const homeSection = document.getElementsByClassName('beginning-content')[0];

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight;
            const opacity = 1 - (scrollY / maxScroll);
            const scale = 1 + (scrollY / maxScroll) * .5;

            if (homeSection) {
                homeSection.style.opacity = opacity;
                homeSection.style.transform = `scale(${scale})`;
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const scrollToSection = (id) => {
        document.getElementById(id).scrollIntoView({ behavior: "smooth" });
    }

    return (
        <div className="main-container">
            <Navbar></Navbar>
            <section id="home">
                <div className="beginning-content">
                    <div className="text-section">
                        <p className="first-p">Hello,</p>
                        <h1>I am Zach Redder</h1>
                        <p className="second-p">Developer, Entrepreneur, Creator, & Philosopher</p>
                        <button onClick={() => scrollToSection('contact')} className="contact-button">Contact</button>
                    </div>
                    <div className="dividing-line"></div>
                    <div className="image-section">
                        <div className="profile-image">
                            <img src="/profile_pic.jpg" alt="Zach Redder" />
                        </div>
                    </div>
                    
                </div>
                <div className="social-icons">
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
            </section>
            
            <section id="about">
                <div className="about-me-header">
                    <h2>About Me</h2>
                    <div className="about-header-line"/>
                </div>
                <div className="about-me-text">
                    <p>
                        I am an American software developer, entrepreneur, creator, and philosopher.
                    </p>
                    <p>
                        I have a passion for creating and building systems, whether it be a new
                        software project, a business, or a new idea. I am always looking to learn
                        and grow, and I am constantly seeking new challenges and opportunities.
                    </p>
                </div>
            </section>

            <div className="volunteering">
                <div className="volunteering-header">
                    <div className="volunteering-header-line"/>
                    <h2>Volunteering</h2>
                </div>                
            </div>

            <div className="skills">
                <div className="skills-header">
                    <h2>Skills & Tools</h2>
                    <div className="skills-header-line"/>
                </div>   
                <SkillsBar direction="left"></SkillsBar>
                <SkillsBar direction="right"></SkillsBar>
                <a href="Résumé.pdf" download><i class="fa fa-download"/>Download Resume</a>
             </div>

            <div className="leading-line"/>

            <section id="projects">
                <div className="projects-header">
                    <h2>Projects</h2>
                </div>

                <div className="leading-line"/>
                
            </section>
            
            <section id="company">
                <div className="company-header">
                    <h2>Scripted Evolution</h2>
                </div>

                <div className="leading-line"/>
                
            </section> 

            

            <section id="contact">
                <ContactBox></ContactBox>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;
