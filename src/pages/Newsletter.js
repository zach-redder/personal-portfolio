import React, { useState } from "react";
import { Helmet } from 'react-helmet-async'; 

// import "../stylesheets/Newsletter.css";
// import "../stylesheets/Main.css";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { addToNewsletter } from "../functions/firebaseFunctions";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        try {
            await addToNewsletter(email);
            setIsSubmitted(true);
            setEmail("");
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Error subscribing to newsletter:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <Helmet>
            <title>Join My Newsletter</title>
        </Helmet>
        <div className="newsletter-page">
            <Navbar />
            <div className="newsletter-container">
                <div className="newsletter-content">
                    <h1>The Z Philosophy</h1>
                    {isSubmitted ? (
                        <div className="success-message">
                            <h2>Thank you for subscribing!</h2>
                        </div>
                    ) : (
                        <div className="subscription-container">
                            <h2>Subscribe to My Newsletter</h2>
                            <p>Exclusive information and tips regarding software development, marketing, and the philosophy behind it all.</p>
                            <form onSubmit={handleSubmit} className="subscription-form">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                <button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? "Subscribing..." : "Subscribe"}
                                </button>
                            </form>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </div>
        </>
    );
}