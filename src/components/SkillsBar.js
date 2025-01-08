import React, { useEffect, useRef } from 'react';

export default function SkillsBar() {
    const skillsBarRef = useRef(null);

    useEffect(() => {
        const scroller = skillsBarRef.current;

        const handleScroll = () => {
            if (!scroller) return;

            const rect = scroller.getBoundingClientRect();
            const windowHeight = window.innerHeight - 200;

            const bottomRect = rect.bottom - 250;

            console.log(rect.top, bottomRect, windowHeight);

            // Check if the skills bar is in the viewport
            const isVisible =
                rect.top < windowHeight && bottomRect > 0;

            if (isVisible) {
                // Determine the progress of the vertical scroll relative to the bar
                const barStartScroll =
                    window.pageYOffset + rect.top - windowHeight;
                const barEndScroll = window.pageYOffset + bottomRect;

                const scrollProgress = Math.min(
                    Math.max(0, window.pageYOffset - barStartScroll) /
                        (barEndScroll - barStartScroll),
                    1
                );

                // Calculate the horizontal scroll position for the skills bar
                const maxScrollLeft =
                    scroller.scrollWidth - scroller.clientWidth;
                const scrollLeft = scrollProgress * maxScrollLeft;

                scroller.scrollTo({
                    left: scrollLeft,
                    behavior: "auto",
                });
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="skills-bar" ref={skillsBarRef}>
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