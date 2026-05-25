import React from 'react';
import Hero from '../components/Hero';
import Programs from '../components/sections/Programs';
import MediaConsole from '../components/sections/MediaConsole';
import Testimonials from '../components/sections/Testimonials';
import CallToAction from '../components/sections/CallToAction';
import AboutUs from '../components/sections/AboutUs';
import Blog from '../components/sections/Blog';
import ResourceHub from '../components/sections/ResourceHub';
import Contact from '../components/sections/Contact';
import Donate from '../components/sections/Donate';

const HomePage = () => {
  return (
    <>
      <Hero />
      <AboutUs />
      <Programs />
      <MediaConsole />
      <Testimonials />
      <Blog />
      <ResourceHub />
      <Donate />
      <Contact />
      <CallToAction />
    </>
  );
};

export default HomePage;
