import React from 'react';
import { BookOpen, Video, Users, Download, ArrowRight } from 'lucide-react';

const resources = [
  {
    id: 1,
    title: "Learning Materials",
    description: "Access our comprehensive library of educational resources",
    icon: BookOpen,
    link: "/resources/materials"
  },
  {
    id: 2,
    title: "Workshop Recordings",
    description: "Watch recordings of our past workshops and training sessions",
    icon: Video,
    link: "/resources/workshops"
  },
  {
    id: 3,
    title: "Mentorship Guide",
    description: "Learn how to make the most of your mentorship journey",
    icon: Users,
    link: "/resources/mentorship"
  },
  {
    id: 4,
    title: "Downloadable Templates",
    description: "Get started with our professional development templates",
    icon: Download,
    link: "/resources/templates"
  }
];

const ResourceHub = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Resource Hub</h2>
          <p className="mt-4 text-xl text-gray-600">Everything you need to succeed in your journey</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {resources.map((resource) => {
            const Icon = resource.icon;
            return (
              <div
                key={resource.id}
                className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow"
              >
                <Icon className="h-8 w-8 text-pink-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <a
                  href={resource.link}
                  className="inline-flex items-center text-pink-600 hover:text-pink-700"
                >
                  Access Resource
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourceHub;