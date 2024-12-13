import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import type { BlogPost } from '../../types';

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Future of Digital Education",
    excerpt: "Exploring how AI and machine learning are transforming educational experiences...",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Success Story: From Student to Tech Lead",
    excerpt: "Meet Sarah, who transformed her career through our mentorship program...",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Building Inclusive Tech Communities",
    excerpt: "How we're working to create more diverse and inclusive spaces in tech...",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800"
  }
];

const Blog = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Latest Updates</h2>
          <p className="mt-4 text-xl text-gray-600">Stay informed with our latest news and stories</p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={post.image}
                alt={post.title}
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <a
                  href={`/blog/${post.id}`}
                  className="inline-flex items-center text-pink-600 hover:text-pink-700"
                >
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;