import React from 'react';
import { BookOpen, Users, Video, Brain } from 'lucide-react';
import type { Program } from '../../types';

const programs: Program[] = [
  {
    id: 1,
    title: "Mentorship Program",
    description: "Connect with industry experts who will guide your professional journey",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 2,
    title: "Skills Workshop",
    description: "Hands-on training sessions to develop practical skills",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "Online Courses",
    description: "Self-paced learning with expert-curated content",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "Innovation Lab",
    description: "Explore cutting-edge technologies and creative solutions",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
  },
];

const Programs = () => {
  return (
    <section id="programs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Our Programs
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Discover opportunities that align with your goals
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program) => (
            <div
              key={program.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-48">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{program.title}</h3>
                <p className="mt-2 text-gray-600">{program.description}</p>
                <a
                  href={`/programs/${program.id}`}
                  className="mt-4 inline-flex items-center text-pink-600 hover:text-pink-700"
                >
                  Learn more
                  <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Programs;