import React, { useState } from 'react';
// import '../stylesheets/Skills.css';

const Skills = () => {
    const [activeCategory, setActiveCategory] = useState('all');

    const skillsData = {
        frontend: [
            { name: 'React', icon: '../react.png', level: 75 },
            { name: 'JavaScript', icon: '../javascript.webp', level: 65 },
            { name: 'HTML5', icon: '../html.png', level: 90 },
            { name: 'CSS3', icon: '../css.webp', level: 85 },
            { name: 'React Native', icon: '../react.png', level: 80 },
        ],
        backend: [
            { name: 'Node.js', icon: '../nodejs.png', level: 35 },
            { name: 'Azure', icon: '../azure.png', level: 60 },
            { name: 'Firebase', icon: '../firebase.png', level: 70 },
            { name: 'PostgreSQL', icon: '../postgresql.png', level: 80 },
            { name: 'SQLite', icon: '../sqlite.png', level: 50 },
            { name: 'Supabase', icon: '../supabase.png', level: 70 },
        ],
        languages: [
            { name: 'Java', icon: '../java.png', level: 80 },
            { name: 'C++', icon: '../cpp.png', level: 70 },
            { name: 'Python', icon: '../python.webp', level: 75 },
            { name: 'SQL', icon: '../sql.png', level: 70 },
            { name: 'C#', icon: '../csharp.png', level: 55 },
            { name: 'TypeScript', icon: '../typescript.webp', level: 85 },
        ],
        tools: [
            { name: 'Git', icon: '../git.png', level: 90 },
            { name: 'GitHub', icon: '../github.png', level: 85 },
            { name: 'Expo', icon: '../expo.png', level: 70 },
            { name: 'Figma', icon: '../figma.webp', level: 65 },
            { name: 'VS Code', icon: '../vscode.png', level: 95 },

        ]
    };
    const getActiveSkills = () => {
        switch(activeCategory) {
            case 'frontend':
                return skillsData.frontend;
            case 'backend':
                return skillsData.backend;
            case 'languages':
                return skillsData.languages;
            case 'tools':
                return skillsData.tools;
            default:
                return skillsData.frontend;
        }
    };

    return (
        <div className="skills-grid-container">
            <div className="skills-categories">
                <button 
                    className={`category-button ${activeCategory === 'frontend' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('frontend')}
                >
                    Frontend
                </button>
                <button 
                    className={`category-button ${activeCategory === 'backend' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('backend')}
                >
                    Backend
                </button>
                <button 
                    className={`category-button ${activeCategory === 'languages' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('languages')}
                >
                    Languages
                </button>
                <button 
                    className={`category-button ${activeCategory === 'tools' ? 'active' : ''}`}
                    onClick={() => setActiveCategory('tools')}
                >
                    Tools
                </button>
            </div>
            
            <div className="skills-grid">
                {getActiveSkills().map((skill, index) => (
                    <div className="skill-card" key={index}>
                        <div className="skill-icon">
                            <img src={skill.icon} alt={skill.name} />
                        </div>
                        <h3>{skill.name}</h3>
                        <div className="skill-progress-container">
                            <div 
                                className="skill-progress-bar" 
                                style={{ width: `${skill.level}%` }}
                            >
                                <span className="skill-progress-text">{skill.level}%</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Skills; 