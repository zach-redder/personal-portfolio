import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ThankYou() {
    return (
        <>
            <Head>
                <title>Thank You for Subscribing!</title>
            </Head>
            <div className="thankyou-page">
                <Navbar />
                <div className="thankyou-container">
                    <div className="thankyou-content">
                        <h1>Thank You for Subscribing!</h1>
                        <h2>Your subscription is confirmed.</h2>
                        <p>
                            Expect valuable insights and updates in your inbox.
                        </p>
                        <p>
                            If you have any questions or feedback, feel free to email me at{" "}
                            <a href="mailto:zach@zachredder.com" className="thankyou-link">
                                zach@zachredder.com
                            </a>
                            !
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
}