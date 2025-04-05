import React, { useEffect } from "react";

import { AOSElement } from "../functions/normalFunctions";

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
import "../stylesheets/Newsletter.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ContactBox from "../components/ContactBox";
import Skills from "../components/Skills";
import ProjectCard from "../components/ProjectCard";

function MainPage() {

    useEffect(() => {
        const homeSection = document.getElementsByClassName('beginning-content')[0];

        // Enhanced parallax effect for the home section
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = window.innerHeight;
            const opacity = Math.max(0, 1 - (scrollY / maxScroll));
            const scale = Math.min(2, 1 + (scrollY / maxScroll) * .75);

            if (homeSection) {
                homeSection.style.opacity = opacity;
                homeSection.style.transform = `scale(${scale})`;
            }

            // Add dynamic background color change based on scroll position
            const scrollProgress = Math.min(1, scrollY / (document.body.scrollHeight - window.innerHeight));
            document.body.style.backgroundColor = `rgb(${9 + scrollProgress * 3}, ${9 + scrollProgress * 3}, ${9 + scrollProgress * 3})`;
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
            <section id="home">
                <section className="beginning-content">
                    <div className="text-section">
                        <p className="first-p">Hello, my name is</p>
                        <h1>Zach Redder</h1>
                        <p className="second-p">I'm a developer, creator, and entrepreneur.</p>
                        <button className="contact-button" onClick={() => scrollToSection('contact')}>
                            Get in Touch
                        </button>
                    </div>
                    <div className="dividing-line"/>
                    <div className="image-section">
                        <div className="profile-image">
                            <img src="/profilepic.png" alt="Profile" />
                        </div>
                    </div>
                </section>
            </section>
            
            <section id="about">
                <AOSElement animation="fade-down" duration={800}>
                    <div className="section-header-common">
                        <h2 data-text="ABOUT">About Me</h2>
                        <div className="section-header-line"/>
                    </div>
                </AOSElement>
                <AOSElement animation="zoom-in" duration={1000} delay={200}>
                    <div className="about-me-container">
                        <div className="about-me-profile">
                            <div className="about-image">
                                <img src="/calvin.png" alt="Code Editor" />
                                <div className="profile-gradient-overlay"></div>
                            </div>
                        </div>
                        <div className="about-me-content">
                            <div className="about-me-text">
                                <p>
                                    I am an American software developer, entrepreneur, creator, and philosopher.
                                </p>
                                <p>
                                    I study Computer Science and Philosophy at Calvin University, combining
                                    technical skills with critical thinking.
                                </p>
                                <p>
                                    I have a passion for creating and building systems, whether it be a new
                                    software project, a business, or a new idea. I am always looking to learn
                                    and grow, and I am constantly seeking new challenges and opportunities.
                                </p>
                            </div>
                            <div className="about-me-highlights">
                                <AOSElement animation="flip-left" delay={400} className="highlight-box">
                                    <i className="fas fa-code highlight-icon"></i>
                                    <h3>Developer</h3>
                                </AOSElement>
                                <AOSElement animation="flip-left" delay={600} className="highlight-box">
                                    <i className="fas fa-lightbulb highlight-icon"></i>
                                    <h3>Entrepreneur</h3>
                                </AOSElement>
                                <AOSElement animation="flip-left" delay={800} className="highlight-box">
                                    <i className="fas fa-paint-brush highlight-icon"></i>
                                    <h3>Creator</h3>
                                </AOSElement>
                                <AOSElement animation="flip-left" delay={1000} className="highlight-box">
                                    <i className="fas fa-book highlight-icon"></i>
                                    <h3>Philosopher</h3>
                                </AOSElement>
                            </div>
                        </div>
                    </div>
                </AOSElement>
            </section>

            <div className="skills section-content-width">
                <AOSElement animation="fade-down">
                    <div className="section-header-common">
                        <h2 data-text="SKILLS">Skills & Tools</h2>
                        <div className="section-header-line"/>
                    </div>
                </AOSElement>
                <AOSElement animation="fade-up" delay={200}> 
                    <Skills />
                </AOSElement>
             </div>

            <div className="leading-line"/>

            <section id="projects">
                <AOSElement animation="fade-down">
                    <div className="section-header-common">
                        <h2 data-text="PROJECTS">Projects</h2>
                        <div className="section-header-line"/>
                    </div>
                </AOSElement>
                <AOSElement animation="fade-up" delay={200}>
                    <div className="projects-container">
                        <AOSElement animation="fade-right" delay={300}>
                            <ProjectCard
                                projectDescription={'A mobile application workout organizer. Built alongside 5 others, our goal was to blend effective workouts with interactive recovery, ensuring that users maximize their time at the gym. This was created for my Software Engineering course at Calvin University.'}
                                projectName={'Vigil - Workout Organizer'}
                                projectLogo={'/Weight.png'}
                                techStack={['React Native', 'Azure', 'PostgreSQL', 'Expo']}
                                link={'https://github.com/calvin-cs262-fall2024-no-pain-no-main/no-pain-no-main-client'}>
                            </ProjectCard>
                        </AOSElement>
                        <AOSElement animation="fade-up" delay={400}>
                            <ProjectCard
                                projectDescription={'A webpage designed to display stock data and allow users to buy and sell stocks with fake money. Used a cloud function to update stock data with real time information. This was developed alongside 3 others for my Web Development course at Calvin University.'}
                                projectName={'Sprout - Stock Trader'}
                                projectLogo={'https://cs336-stock-market-project.web.app/SproutLogo.png'}
                                techStack={['React.js', 'Firestore', 'Firebase Hosting']}
                                link={'https://github.com/calvin-cs336-finalproject/sprout-client'}>
                            </ProjectCard>
                        </AOSElement>
                        <AOSElement animation="fade-left" delay={500}>
                            <ProjectCard 
                                projectDescription={'A webpage designed to house information about myself and my projects, providing easy access to my professional work and personal newsletter. This was created as a personal project for myself by myself.'}
                                projectName={'Personal Portfolio'}
                                projectLogo={'/zr2.png'}
                                techStack={['React.js', 'Firestore', 'Github Pages']}
                                link={'https://github.com/zach-redder/personal-portfolio'}>
                            </ProjectCard>
                        </AOSElement>
                    </div>
                </AOSElement>

                <div className="leading-line"/>
                
            </section>
            
            <section id="companies">
                <AOSElement animation="fade-down">
                    <div className="section-header-common">
                        <h2 data-text="COMPANIES">My Companies</h2>
                        <div className="section-header-line"/>
                    </div>
                </AOSElement>
                <AOSElement animation="fade-up" delay={200}>
                    <div className="companies-container">
                        <AOSElement animation="fade-right" delay={300}>
                            <div className="company-card">
                                <div className="company-logo">
                                    <div className="hourglass-container">
                                        <i className="fas fa-hourglass-half hourglass-icon"></i>
                                    </div>
                                </div>
                                <div className="company-content">
                                    <h3>Scripted Evolution</h3>
                                    <p className="company-description">
                                        Scripted Evolution is a marketing company focused on helping B2B SaaS businesses
                                        reach their target audience and grow their customer base. We specialize in creating
                                        high-converting landing pages and marketing funnels that turn visitors into qualified leads,
                                        streamlining the path from discovery to decision for complex software solutions.
                                    </p>
                                    <div className="status-label">
                                        <i className="fas fa-hourglass-half"></i> Coming Soon
                                    </div>
                                </div>
                            </div>
                        </AOSElement>

                        <AOSElement animation="fade-left" delay={400}>
                            <div className="company-card">
                                <div className="company-logo">
                                    <img src="/Weight.png" alt="Vigil Fitness" />
                                </div>
                                <div className="company-content">
                                    <h3>Vigil Fitness</h3>
                                    <p className="company-description">
                                        Vigil Fitness is revolutionizing the way people approach their workout routines. 
                                        Our platform combines personalized workout plans with interactive recovery tracking, 
                                        ensuring users maximize their fitness potential. Our innovative friends feature 
                                        helps beginners overcome gym anxiety by connecting them with workout buddies and 
                                        creating a supportive community that makes the gym less intimidating.
                                    </p>
                                    <a href="https://vigilfitness.com" target="_blank" rel="noreferrer" className="company-link">
                                        <i className="fas fa-dumbbell"></i> Join Waitlist
                                    </a>
                                </div>
                            </div>
                        </AOSElement>
                    </div>
                </AOSElement>

                <div className="leading-line"/>
                
            </section> 

            <section id="contact">
                <AOSElement animation="fade-down">
                    <div className="section-header-common">
                        <h2 data-text="CONTACT">Get in Touch</h2>
                        <div className="section-header-line"/>
                    </div>
                </AOSElement>
                <AOSElement animation="zoom-in-up" delay={200}>
                    <ContactBox></ContactBox>
                </AOSElement>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;
