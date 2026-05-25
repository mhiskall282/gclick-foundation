import { Client } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const connectionString = process.env.SUPABASE_POOLER_URL;

const seedDatabase = async () => {
  if (!connectionString) {
    console.error('SUPABASE_POOLER_URL is missing in .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL for seeding...');

    // Clear existing data in the 5 tables
    await client.query(`TRUNCATE TABLE leadership, educational_tracks, interactive_labs, news, resources RESTART IDENTITY CASCADE;`);
    console.log('Cleared existing data in target tables.');

    // 1. Seed Leadership
    const leadership = [
      { name: "Miss Wintima Akudugu", role: "Founder & CEO", image: "/images/wintima.png", bio: "Founder's Message: Our goal is not just teaching syntax. We teach problem-solving, collaboration, and provide direct pathways to global tech teams." },
      { name: "Ms. Esther Gyimah", role: "Head of Programs and Operations", image: "/images/EG.png", bio: "" },
      { name: "Sofia Rodriguez", role: "Community Manager", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400", bio: "" }
    ];
    for (const l of leadership) {
      await client.query(`INSERT INTO leadership (name, role, image, bio) VALUES ($1, $2, $3, $4)`, [l.name, l.role, l.image, l.bio]);
    }
    console.log('Seeded leadership.');

    // 2. Seed Educational Tracks
    const tracks = [
      { title: "Mentorship Program", description: "Connect with industry experts who will guide your professional journey.", details: "Our Mentorship Program pairs aspiring tech enthusiasts in Ghana with experienced industry veterans worldwide.", duration: "12 Weeks", image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800" },
      { title: "Skills Workshop", description: "Hands-on training sessions to develop practical skills.", details: "These intensive, hands-on weekend workshops focus on filling practical skill gaps.", duration: "4 Weeks (Saturdays)", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" },
      { title: "Online Courses", description: "Self-paced learning with expert-curated content.", details: "For students who require flexibility, G-Click offers a curated online portal.", duration: "Self-Paced", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" },
      { title: "Innovation Lab", description: "Explore cutting-edge technologies and creative solutions.", details: "The Innovation Lab is G-Click's sandbox for advanced graduates.", duration: "Ongoing", image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800" }
    ];
    for (const t of tracks) {
      await client.query(`INSERT INTO educational_tracks (title, description, details) VALUES ($1, $2, $3)`, [t.title, t.description, t.details]);
    }
    console.log('Seeded educational_tracks.');

    // 3. Seed Interactive Labs
    const labs = [
      { title: "React in 100 Seconds", video_url: "https://www.youtube.com/embed/SqcY0GlETPk", description: "A rapid-fire introduction to components, state, props, and standard rendering cycles in React." },
      { title: "Next.js in 100 Seconds", video_url: "https://www.youtube.com/embed/jMy4pVZ7upE", description: "Learn file-system routing, Server Components, client-side rendering boundaries, and API routes." },
      { title: "Git & GitHub in 100 Seconds", video_url: "https://www.youtube.com/embed/RGOj5yH7evk", description: "Understand commits, branching structures, pulling changes, and managing developer repositories." },
      { title: "Terminal in 100 Seconds", video_url: "https://www.youtube.com/embed/5Xg1Sp65x_0", description: "Get comfortable with files, paths, environment operations, and piping CLI commands." }
    ];
    for (const lb of labs) {
      await client.query(`INSERT INTO interactive_labs (title, video_url, description) VALUES ($1, $2, $3)`, [lb.title, lb.video_url, lb.description]);
    }
    console.log('Seeded interactive_labs.');

    // 4. Seed News
    const newsData = [
      { title: "The Future of Digital Education", content: "Education is undergoing its most significant transformation since the invention of the printing press...", date: "2024-03-15", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800" },
      { title: "Success Story: From Student to Tech Lead", content: "Sarah joined G-Click as an undergraduate student looking to gain practical coding experience...", date: "2024-03-10", image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" },
      { title: "Building Inclusive Tech Communities", content: "Inclusivity is not a metric to be checked; it is a foundational pillar of structural community health...", date: "2024-03-05", image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800" }
    ];
    for (const n of newsData) {
      await client.query(`INSERT INTO news (title, content, date, image) VALUES ($1, $2, $3, $4)`, [n.title, n.content, n.date, n.image]);
    }
    console.log('Seeded news.');

    // 5. Seed Resources
    const resourcesData = [
      { title: "Learning Materials", description: "Access our comprehensive library of educational slides, guides, and checklists.", type: "Document", file_url: "#" },
      { title: "Workshop Videos", description: "Watch full recordings of our past software development workshops and panels.", type: "Video", file_url: "#" },
      { title: "Mentorship Guides", description: "Learn how to establish relationships and set roadmap goals with your mentors.", type: "Document", file_url: "#" },
      { title: "Developer Kits", description: "Get started quickly with structured CV templates, Git guides, and IDE setups.", type: "Archive", file_url: "#" }
    ];
    for (const r of resourcesData) {
      await client.query(`INSERT INTO resources (title, description, type, file_url) VALUES ($1, $2, $3, $4)`, [r.title, r.description, r.type, r.file_url]);
    }
    console.log('Seeded resources.');

    console.log('Database seeding complete!');
  } catch (err) {
    console.error('Error seeding database:', err);
  } finally {
    await client.end();
  }
};

seedDatabase();
