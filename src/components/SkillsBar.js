import React, { useEffect, useRef } from 'react';

export default function SkillsBar({direction}) {
    const skillsBarRef = useRef(null);
    
    useEffect(() => {
        const scroller = skillsBarRef.current;

        // Clone the skills and append them to the end of the scroller
        const skills = Array.from(scroller.children);
        skills.forEach(skill => {
            const clone = skill.cloneNode(true);
            scroller.appendChild(clone);
        });

        const scrollStep = direction === 'right' ? 1 : -1; // Adjust the scroll speed as needed

        const autoScroll = () => {
            if (!scroller) return;

            const maxScrollLeft = scroller.scrollWidth / 2; // Half of the total scroll width

            if (direction === 'right' && scroller.scrollLeft >= maxScrollLeft) {
                scroller.scrollLeft = 0; // Reset to start
            } else if (direction === 'left' && scroller.scrollLeft <= 0) {
                scroller.scrollLeft = maxScrollLeft; // Reset to end
            } else {
                scroller.scrollLeft += scrollStep;
            }

            requestAnimationFrame(autoScroll);
        };

        requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(autoScroll);
    }, [direction]);

    return (
        <div className="skills-bar scroller" ref={skillsBarRef}>
            <div className="skill">
                <img src="/react.png" alt="Skill 1" />
                <p>React.js</p>
            </div>
            <div className="skill">
                <img src="html.png" alt="Skill 2" />
                <p>HTML</p>
            </div>
            <div className="skill">
                <img src="javascript.webp" alt="Skill 3" />
                <p>Javascript</p>
            </div>
            <div className="skill">
                <img src="css.webp" alt="Skill 4" />
                <p>CSS</p>
            </div>
            <div className="skill">
                <img src="sql.png" alt="Skill 5" />
                <p>SQL</p>
            </div>
            <div className="skill">
                <img src="git.png" alt="Skill 6" />
                <p>Git</p>
            </div>
            <div className="skill">
                <img src="java.png" alt="Skill 7" />
                <p>Java</p>
            </div>
            <div className="skill">
                <img src="react.png" alt="Skill 8" />
                <p>React Native</p>
            </div>
            <div className="skill">
                <img src="postgresql.png" alt="Skill 9" />
                <p>PostgreSQL</p>
            </div>
            <div className="skill">
                <img src="cpp.png" alt="Skill 10" />
                <p>C++</p>
            </div>
        </div>
    );
}