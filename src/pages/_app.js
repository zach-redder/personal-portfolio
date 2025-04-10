import '../stylesheets/About.css';  // Import global styles here
import '../stylesheets/Company.css'; // Import global styles here
import '../stylesheets/ContactBox.css'; // Import global styles here
import '../stylesheets/Main.css'; // Import global styles here
import '../stylesheets/Navbar.css'; // Import global styles here
import '../stylesheets/Newsletter.css'; // Import global styles here
import '../stylesheets/Projects.css'; // Import global styles here
import '../stylesheets/Skills.css'; // Import global styles here
import '../stylesheets/Socials.css'; // Import global styles here
import '../stylesheets/StartScreen.css'; // Import global styles here

import React from 'react';
import Head from 'next/head'; // Import the Head component from next/head

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Zach Redder</title>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="theme-color" content="#000000" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
        <link rel="icon" href="/zr3.png" />
        <link rel="apple-touch-icon" href="/zr3.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
