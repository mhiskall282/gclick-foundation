import type { Program } from '../types';

export const programsData: Program[] = [
  {
    id: 1,
    title: "Mentorship Program",
    description: "Connect with industry experts who will guide your professional journey. Get personalized feedback, career roadmaps, and industry insights.",
    image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
    duration: "12 Weeks",
    syllabus: [
      "Introduction & Goal Alignment",
      "Personal Branding & CV Review",
      "Mock Interviews & Technical Assessments",
      "Final Project & Graduation Pitch"
    ],
    details: "Our Mentorship Program pairs aspiring tech enthusiasts in Ghana with experienced industry veterans worldwide. Mentors provide 1-on-1 sessions weekly, offering feedback on projects, advice on career trajectories, and key opportunities to grow. Graduates gain access to a global alumni network and immediate job placement support."
  },
  {
    id: 2,
    title: "Skills Workshop",
    description: "Hands-on training sessions to develop practical skills. Master Git, React, responsive layouts, and cloud hosting.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
    duration: "4 Weeks (Saturdays)",
    syllabus: [
      "Git & GitHub Collaborative Workflows",
      "Tailwind CSS & Responsive Visual Layouts",
      "Vite & Modern Frontend Tooling",
      "Deployments to Vercel, Netlify & AWS"
    ],
    details: "These intensive, hands-on weekend workshops focus on filling practical skill gaps. We emphasize real-world team collaboration and the active use of developer tooling. By the end of each session, students will have shipped a live application to production and added a clean project to their portfolio."
  },
  {
    id: 3,
    title: "Online Courses",
    description: "Self-paced learning with expert-curated content. Follow structural curricula on full-stack development, database design, and UI/UX.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
    duration: "Self-Paced",
    syllabus: [
      "Web Development Fundamentals (HTML/CSS/JS)",
      "Database Systems & SQL Design",
      "React Essentials & Component Lifecycles",
      "Introduction to Backend Systems & API Routes"
    ],
    details: "For students who require flexibility, G-Click offers a curated online portal. Our curriculum is tailored for low-bandwidth environments, ensuring students in remote areas can access high-quality developer resources. The platform includes self-graded coding exercises and peer forum boards."
  },
  {
    id: 4,
    title: "Innovation Lab",
    description: "Explore cutting-edge technologies and creative solutions. Work in squads to build community projects using Web3, AI, and mobile APIs.",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
    duration: "Ongoing (Semester Basis)",
    syllabus: [
      "Ideation & User Research in Local Contexts",
      "API Integrations & AI Playground Projects",
      "Agile Product Management & Scrums",
      "Beta Testing & Community Launch"
    ],
    details: "The Innovation Lab is G-Click's sandbox for advanced graduates. Here, cross-functional student squads collaborate with local tech hubs to solve tangible community challenges. Previous projects include SMS-based healthcare platforms and agricultural logistics tracker dashboards."
  }
];
