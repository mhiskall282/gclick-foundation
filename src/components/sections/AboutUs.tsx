import React from 'react';
import { Award, Users, TrendingUp } from 'lucide-react';
import type { TeamMember } from '../../types';

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Miss Wintima Akudugu",
    role: "Founder & CEO",
    image: "/images/wintima.jpg"
  },
  {
    id: 2,
    name: "Miss Esther Gyimah",
    role: "Head of Programs and Operations",
    image: "/images/EG.jpg"
  },
  {
    id: 3,
    name: "Sofia Rodriguez",
    role: "Community Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
  }
];

const stats = [
  { id: 1, name: 'Students Impacted', value: '10,000+', icon: Users },
  { id: 2, name: 'Success Rate', value: '94%', icon: TrendingUp },
  { id: 3, name: 'Awards Won', value: '15+', icon: Award },
];

const AboutUs = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mission Statement */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Our Mission</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            At Gclick, we're dedicated to transforming lives through innovative education and mentorship,
            creating opportunities for growth and success in the digital age.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 mb-16">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="bg-pink-50 rounded-lg p-8 text-center">
                <Icon className="h-8 w-8 text-pink-600 mx-auto" />
                <p className="mt-4 text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-gray-600">{stat.name}</p>
              </div>
            );
          })}
        </div>

        {/* Team Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">Our Leadership Team</h3>
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <div key={member.id} className="text-center">
                <div className="relative">
                  <img
                    className="w-32 h-32 rounded-full mx-auto object-cover"
                    src={member.image}
                    alt={member.name}
                  />
                </div>
                <div className="mt-4">
                  <h4 className="text-lg font-bold text-gray-900">{member.name}</h4>
                  <p className="text-pink-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
