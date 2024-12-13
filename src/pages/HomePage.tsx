import React from 'react';
import Hero from '../components/Hero';
import Programs from '../components/sections/Programs';
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