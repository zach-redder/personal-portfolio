import React, { useEffect } from "react";

import { SlideInSection, FadeInSection } from "../functions";

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
import ProjectCard from "../components/ProjectCard";

function MainPage() {

    useEffect(() => {
        const homeSection = document.getElementsByClassName('beginning-content')[0];

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight;
            const opacity = 1 - (scrollY / maxScroll);
            const scale = 1 + (scrollY / maxScroll) * 1;

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
                <SlideInSection>
                    <div className="about-me-header">
                        <h2>About Me</h2>
                        <div className="about-header-line"/>
                    </div>
                </SlideInSection>
                <FadeInSection>
                    <div className="about-me-text">
                        <p>
                            I am an American software developer, entrepreneur, creator, and philosopher.
                        </p>
                        <p>
                            I study Computer Science and Philosophy at Calvin University, combining
                            technical skills with critical thinking. My passion for technology increased
                            during high school robotics, where building and programming robots inspired
                            me to explore how systems work and their broader implications.
                        </p>
                        <p>
                            I have a passion for creating and building systems, whether it be a new
                            software project, a business, or a new idea. I am always looking to learn
                            and grow, and I am constantly seeking new challenges and opportunities.
                        </p>
                    </div>
                </FadeInSection>
            </section>

            <div className="volunteering">
                <SlideInSection>
                    <div className="volunteering-header">
                        <div className="volunteering-header-line"/>
                        <h2>Volunteering</h2>
                    </div>                
                </SlideInSection>
            </div>

            <div className="skills">
                <SlideInSection>
                    <div className="skills-header">
                        <h2>Skills & Tools</h2>
                        <div className="skills-header-line"/>
                    </div>
                </SlideInSection>
                <FadeInSection>
                    <SkillsBar direction="left"></SkillsBar>
                    <SkillsBar direction="right"></SkillsBar>
                    <a href="Zach_Redder_Résumé.pdf" download><i class="fa fa-download"/>Download Resume</a>
                </FadeInSection>
             </div>

            <div className="leading-line"/>

            <section id="projects">
                <SlideInSection>
                    <div className="projects-header">
                        <h2>Projects</h2>
                    </div>
                </SlideInSection>
                <FadeInSection>
                    <div classname="projects-container">
                        <ProjectCard projectDescription={''} projectName={'Vigil - Workout Organizer'} projectLogo={'/Weight.png'} techStack={['React Native', 'Azure', 'PostgreSQL', 'Expo']}></ProjectCard>
                        <ProjectCard projectDescription={''} projectName={'Sprout - Stock Trader'} projectLogo={'https://cs336-stock-market-project.web.app/SproutLogo.png'} techStack={['React.js', 'Firestore', 'Firebase Hosting']}></ProjectCard>
                        <ProjectCard projectDescription={''} projectName={'Personal Portfolio'} projectLogo={'/zr2.png'} techStack={['React.js', 'Github Pages']}></ProjectCard>
                    </div>
                </FadeInSection>


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
