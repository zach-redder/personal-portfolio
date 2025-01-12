import React from "react";
import "../stylesheets/Projects.css";

export default function ProjectCard({ projectName, projectLogo, projectDescription, techStack, link }) {
    return (
        <a href={link} target="_blank" rel="noreferrer">
            <div className="project-card" >
                <div className="project-card-front">
                    <img src={projectLogo} alt={`${projectName} logo`} className="project-logo" />
                    <h3>{projectName}</h3>
                </div>
                <div className="project-card-back">
                    <p>{projectDescription}</p>
                    <p><strong>Tech Stack:</strong> {techStack.join(', ')}</p>
                </div>
            </div>
        </a>
    );
}