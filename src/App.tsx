import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Programs from './components/sections/Programs';
import Testimonials from './components/sections/Testimonials';
import CallToAction from './components/sections/CallToAction';
import AboutUs from './components/sections/AboutUs';
import Blog from './components/sections/Blog';
import ResourceHub from './components/sections/ResourceHub';
import Contact from './components/sections/Contact';
import Donate from './components/sections/Donate';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <AboutUs />
      <Programs />
      <Testimonials />
      <Blog />
      <ResourceHub />
      <Donate />
      <Contact />
      <CallToAction />
    </div>
  );
}

export default App;