import React, { useEffect } from "react";

import { SlideInSection, FadeInSection } from "../functions/normalFunctions";

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
                <FadeInSection>
                    <div className="volunteering-body">
                        <div class="volunteering-image-wrapper">
                            <div className="volunteering-image">
                                <img src="https://i2.wp.com/evadotravel.com/wp-content/uploads/2019/01/CoP01BxTn6VTyLO1juTcQ.jpg?fit=1024%2C768&ssl=1" alt="Costa Rica"/>
                            </div>
                        </div>
                        <div className="volunteering-text">
                            <p>
                                I had the incredible opportunity to travel to Costa Rica with my church,
                                where we worked to support the local community through service projects.
                                During the trip, I lived with a local family, immersing myself in their
                                culture, the natural beauty of the forest's, and daily life. This experience was both humbling and inspiring,
                                giving me a deeper appreciation for community, resilience, and the beauty
                                of cultural exchange. It reinforced my belief in the importance of serving
                                others and broadened my perspective on the world.
                            </p>
                        </div>
                    </div>
                </FadeInSection>
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
                        <ProjectCard
                            projectDescription={'A mobile application used as a seamless workout organizer. Built alongside 5 others, our goal was to blend effective workouts with interactive recovery, ensuring that users maximize their time at the gym and stay motivated throughout their fitness journey. This was created using React Native with Typescript, HTML, and CSS for my Software Engineering course at Calvin University.'}
                            projectName={'Vigil - Workout Organizer'}
                            projectLogo={'/Weight.png'}
                            techStack={['React Native', 'Azure', 'PostgreSQL', 'Expo']}
                            link={'https://github.com/calvin-cs262-fall2024-no-pain-no-main/no-pain-no-main-client'}>
                        </ProjectCard>
                        <ProjectCard
                            projectDescription={'A webpage designed to display stock data and allow users to buy and sell stocks with fake money. Used a cloud function to update stock data with real time information. This was developed alonside 3 others using React.js, Firestore, and Firebase Hosting for my Web Development course at Calvin University.'}
                            projectName={'Sprout - Stock Trader'}
                            projectLogo={'https://cs336-stock-market-project.web.app/SproutLogo.png'}
                            techStack={['React.js', 'Firestore', 'Firebase Hosting']}
                            link={'https://github.com/calvin-cs336-finalproject/sprout-client'}>
                        </ProjectCard>
                        <ProjectCard 
                            projectDescription={'A webpage designed to house information about myself and my projects, providing easy access to my professional work. This was created using React.js and Github Pages as a personal project.'}
                            projectName={'Personal Portfolio'}
                            projectLogo={'/zr2.png'}
                            techStack={['React.js', 'Firestore', 'Github Pages']}
                            link={'https://github.com/zach-redder/personal-portfolio'}>
                        </ProjectCard>
                    </div>
                </FadeInSection>

                <div className="leading-line"/>
                
            </section>
            
            <section id="company">
                <SlideInSection>
                    <div className="company-header">
                        <h2>Scripted Evolution</h2>
                    </div>
                </SlideInSection>
                <FadeInSection>
                    <div className="company-text">
                        <p>
                            Info coming soon...
                        </p>
                    </div>
                </FadeInSection> 

                <div className="leading-line"/>
                
            </section> 

            <section id="contact">
                <FadeInSection>
                    <ContactBox></ContactBox>
                </FadeInSection>
            </section>
            <Footer></Footer>
        </div>
    );
}

export default MainPage;
