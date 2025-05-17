import React, { useState } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Head from "next/head";

export default function Newsletter() {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const FORM_ID = "8060516";
    const API_KEY = "j7iI-lU6B88XzVqUC3ecXA";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
    
        try {
            const res = await fetch(`https://api.convertkit.com/v3/forms/${FORM_ID}/subscribe`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email,
                    api_key: API_KEY
                })
            });
    
            if (!res.ok) throw new Error("Failed to subscribe");
    
            setIsSubmitted(true);
            setEmail("");
    
            // Hide success message after 5 seconds
            setTimeout(() => {
                setIsSubmitted(false);
            }, 5000);
        } catch (error) {
            console.error("Error subscribing to ConvertKit:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
        <Head>
            <title>Join My Newsletter</title>
            <meta property="og:title" content="Join My Newsletter" />
            <meta property="og:description" content="Real stories, actionable tactics, and mindset shifts to help you build profitable products. Become the founder you aspire to be." />
            <meta property="og:image" content="https://zachredder.com/og-newsletter.png" />
            <meta property="og:url" content="https://zachredder.com/newsletter" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Join My Newsletter" />
            <meta
                name="twitter:description"
                content="Real stories, actionable tactics, and mindset shifts to help you build profitable products. Become the founder you aspire to be."
            />
            <meta
                name="twitter:image"
                content="https://zachredder.com/og-newsletter.png"
            />
        </Head>
        <div className="newsletter-page">
            <Navbar />
            <div className="newsletter-container">
                <div className="newsletter-content">
                    <h1>The Builder's Compass</h1>
                    {isSubmitted ? (
                        <div className="success-message">
                            <h2>Check your email to verify your subscription</h2>
                        </div>
                    ) : (
                        <div className="subscription-container">
                            <h2>Personal stories and philosophical frameworks to help you craft software with integrity and learn authentic branding.</h2>
                            <p>Subscribe for a FREE 10 page authentic branding guide.</p>
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
