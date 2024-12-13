import React from 'react';
import { Heart, Star, Shield, Award } from 'lucide-react';

const sponsorshipTiers = [
  {
    id: 1,
    name: "Supporter",
    price: "25",
    icon: Heart,
    features: [
      "Recognition on our website",
      "Monthly newsletter updates",
      "Impact report access"
    ]
  },
  {
    id: 2,
    name: "Champion",
    price: "100",
    icon: Star,
    features: [
      "All Supporter benefits",
      "Exclusive event invitations",
      "Quarterly impact meetings",
      "Social media recognition"
    ]
  },
  {
    id: 3,
    name: "Partner",
    price: "500",
    icon: Shield,
    features: [
      "All Champion benefits",
      "Featured sponsor spotlight",
      "Program naming rights",
      "VIP event access",
      "Custom impact report"
    ]
  }
];

const impactMetrics = [
  {
    id: 1,
    metric: "$25",
    impact: "Provides learning materials for one student"
  },
  {
    id: 2,
    metric: "$100",
    impact: "Sponsors a full workshop session"
  },
  {
    id: 3,
    metric: "$500",
    impact: "Funds a complete mentorship program"
  }
];

const Donate = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Support Our Mission</h2>
          <p className="mt-4 text-xl text-gray-600">Help us create more opportunities for growth and learning</p>
        </div>

        {/* Impact Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-8">Your Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {impactMetrics.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-3xl font-bold text-pink-600">{item.metric}</p>
                <p className="mt-2 text-gray-600">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Tiers */}
        <div className="grid gap-8 lg:grid-cols-3">
          {sponsorshipTiers.map((tier) => {
            const Icon = tier.icon;
            return (
              <div
                key={tier.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-8">
                  <Icon className="h-12 w-12 text-pink-600 mx-auto" />
                  <h3 className="mt-4 text-2xl font-semibold text-center text-gray-900">
                    {tier.name}
                  </h3>
                  <p className="mt-4 text-center">
                    <span className="text-4xl font-bold text-gray-900">${tier.price}</span>
                    <span className="text-gray-600">/month</span>
                  </p>
                  <ul className="mt-6 space-y-4">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <svg
                          className="h-5 w-5 text-pink-600"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="ml-3 text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className="mt-8 w-full bg-pink-600 text-white py-2 px-4 rounded-md hover:bg-pink-700 transition-colors"
                  >
                    Become a {tier.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Donate;