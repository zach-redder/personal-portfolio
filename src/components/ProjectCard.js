import React from "react";
// import "../stylesheets/Projects.css";

export default function ProjectCard({ projectName, projectLogo, projectDescription, techStack, link }) {
    return (
        <div className="project-card">
            <div className="project-image">
                <img src={projectLogo} alt={`${projectName}`} />
                <div className="project-overlay"></div>
            </div>
            <div className="project-content">
                <h3>{projectName}</h3>
                <p className="project-description">{projectDescription}</p>
                <div className="project-tech">
                    {techStack.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
                <div className="project-links">
                    <a href={link} target="_blank" rel="noreferrer" className="project-link">
                        <i className="fab fa-github"></i> View Project
                    </a>
                </div>
            </div>
        </div>
    );
}