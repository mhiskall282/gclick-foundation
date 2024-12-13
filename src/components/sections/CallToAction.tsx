import React from 'react';
import { Heart, BookOpen, Users } from 'lucide-react';

const CallToAction = () => {
  return (
    <section className="bg-gradient-to-r from-pink-600 to-purple-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <Heart className="h-12 w-12 text-white mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-white">Donate Now</h3>
            <p className="mt-2 text-pink-100">Support our mission to empower through education</p>
            <a
              href="/donate"
              className="mt-4 inline-block px-6 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-50 transition-colors"
            >
              Contribute
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <BookOpen className="h-12 w-12 text-white mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-white">Join a Program</h3>
            <p className="mt-2 text-pink-100">Start your learning journey today</p>
            <a
              href="/programs"
              className="mt-4 inline-block px-6 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-50 transition-colors"
            >
              Browse Programs
            </a>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-8">
            <Users className="h-12 w-12 text-white mx-auto" />
            <h3 className="mt-4 text-xl font-semibold text-white">Become a Mentor</h3>
            <p className="mt-2 text-pink-100">Share your expertise with others</p>
            <a
              href="/mentor"
              className="mt-4 inline-block px-6 py-2 bg-white text-pink-600 rounded-md hover:bg-pink-50 transition-colors"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;