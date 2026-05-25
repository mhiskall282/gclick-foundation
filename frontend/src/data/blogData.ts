import type { BlogPost } from '../types';

export interface BlogItem extends BlogPost {
  author: string;
  readTime: string;
  content: string[];
}

export const blogData: BlogItem[] = [
  {
    id: 1,
    title: "The Future of Digital Education",
    excerpt: "Exploring how AI and machine learning are transforming educational experiences...",
    date: "2024-03-15",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    author: "Miss Wintima Akudugu",
    readTime: "5 min read",
    content: [
      "Education is undergoing its most significant transformation since the invention of the printing press. The integration of digital classrooms, interactive platforms, and artificial intelligence is reshaping how students learn, collaborate, and build.",
      "In West Africa, this shifts from a luxury to an absolute necessity. Access to remote computing courses, local coding workshops, and global mentorship platforms allows young developers in Ghana to compete globally without leaving their communities.",
      "At G-Click, we are embracing this future by integrating modern web methodologies and AI assistants directly into our project scrums. By training students in agile workflows and collaborative tooling, we prepare them for the realities of modern software engineering teams."
    ]
  },
  {
    id: 2,
    title: "Success Story: From Student to Tech Lead",
    excerpt: "Meet Sarah, who transformed her career through our mentorship program...",
    date: "2024-03-10",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    author: "Ms. Esther Gyimah",
    readTime: "4 min read",
    content: [
      "Sarah joined G-Click as an undergraduate student looking to gain practical coding experience. Struggling with standard theoretical lecture sheets, she joined our 12-week mentorship cohort where she was paired with a Senior Engineer from Berlin.",
      "Through collaborative mock scrums, responsive layouts training, and Git workflows, Sarah built a community logistics management tool. That project became the focal point of her portfolio.",
      "Today, Sarah leads a development squad at a fintech startup in Accra, Ghana, and actively mentors G-Click's incoming cohorts. Her journey highlights the core philosophy of our foundation: education is amplified when coupled with personalized guidance."
    ]
  },
  {
    id: 3,
    title: "Building Inclusive Tech Communities",
    excerpt: "How we're working to create more diverse and inclusive spaces in tech...",
    date: "2024-03-05",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
    author: "Sofia Rodriguez",
    readTime: "6 min read",
    content: [
      "Inclusivity is not a metric to be checked; it is a foundational pillar of structural community health. The tech industry has long faced barriers that keep underrepresented groups, particularly young women in rural regions, from accessing digital growth.",
      "We target these challenges directly by hosting specialized workshops at local institutions, offering remote study stipends, and conducting female-focused mentorship campaigns.",
      "By establishing safe spaces to fail, iterate, and build, we empower developers of all backgrounds to gain confidence. A diverse room of builders results in highly creative, resilient solutions for our community's biggest challenges."
    ]
  }
];
