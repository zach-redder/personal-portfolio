import React, { useState, useEffect, useRef } from 'react';

// New function using AOS instead of IntersectionObserver
export function AOSElement(props) {
    const { 
        animation = 'fade-up', 
        duration = 800, 
        delay = 0, 
        offset = 120,
        className = '',
        ...rest 
    } = props;

    return (
        <div 
            data-aos={animation}
            data-aos-duration={duration}
            data-aos-delay={delay}
            data-aos-offset={offset}
            className={className}
            {...rest}
        >
            {props.children}
        </div>
    );
}

// Keep the old components for backward compatibility
export function SlideInSection(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) {
                observer.unobserve(domRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`slide-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}

export function FadeInSection(props) {
    const [isVisible, setVisible] = useState(false);
    const domRef = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setVisible(true);
                }
            });
        });

        if (domRef.current) {
            observer.observe(domRef.current);
        }

        return () => {
            if (domRef.current) {
                observer.unobserve(domRef.current);
            }
        };
    }, []);

    return (
        <div
            className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
}