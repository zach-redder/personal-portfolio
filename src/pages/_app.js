import '../stylesheets/About.css';
import '../stylesheets/Company.css';
import '../stylesheets/ContactBox.css';
import '../stylesheets/Main.css';
import '../stylesheets/Navbar.css';
import '../stylesheets/Newsletter.css';
import '../stylesheets/Projects.css';
import '../stylesheets/Skills.css';
import '../stylesheets/Socials.css';
import '../stylesheets/StartScreen.css';

import React, { useEffect } from 'react';
import Head from 'next/head';
import AOS from 'aos';
import 'aos/dist/aos.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    AOS.init({ once: true });
    AOS.refresh();
  }, []);

  return (
    <>
      <Head>
        <title>Zach Redder</title>
        <meta name="description" content="Web site created using create-react-app" />
        <meta name="theme-color" content="#000000" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/zr3.png" />
        <link rel="apple-touch-icon" href="/zr3.png" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
