import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.SUPABASE_POOLER_URL;

const setupDatabase = async () => {
  if (!connectionString) {
    console.error('SUPABASE_POOLER_URL is missing in .env');
    process.exit(1);
  }

  const client = new Client({
    connectionString,
  });

  try {
    await client.connect();
    console.log('Connected to PostgreSQL...');

    // Create programs table
    await client.query(`
      CREATE TABLE IF NOT EXISTS programs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        details TEXT,
        duration VARCHAR(100),
        image TEXT,
        syllabus JSONB,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created programs table.');

    // Create blog_posts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        date DATE NOT NULL,
        author VARCHAR(100) NOT NULL,
        read_time VARCHAR(50),
        image TEXT,
        content TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created blog_posts table.');

    // Drop and Create robust members table
    await client.query(`DROP TABLE IF EXISTS members;`);
    await client.query(`
      CREATE TABLE members (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        phone VARCHAR(50),
        location VARCHAR(255),
        address TEXT,
        employment_status VARCHAR(50),
        student_year VARCHAR(50),
        background_info TEXT,
        joined_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created robust members table.');

    // 5 New Tables for Extended CMS
    
    // 1. Leadership
    await client.query(`
      CREATE TABLE IF NOT EXISTS leadership (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL,
        bio TEXT,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created leadership table.');

    // 2. Educational Tracks
    await client.query(`
      CREATE TABLE IF NOT EXISTS educational_tracks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        details TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created educational_tracks table.');

    // 3. Interactive Labs
    await client.query(`
      CREATE TABLE IF NOT EXISTS interactive_labs (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        video_url TEXT,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created interactive_labs table.');

    // 4. News
    await client.query(`
      CREATE TABLE IF NOT EXISTS news (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        date DATE NOT NULL,
        image TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created news table.');

    // 5. Resources
    await client.query(`
      CREATE TABLE IF NOT EXISTS resources (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        type VARCHAR(100),
        file_url TEXT,
        description TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Created resources table.');

    // Seed Initial Data (Programs)
    const { rowCount: programCount } = await client.query(`SELECT COUNT(*) FROM programs`);
    if (!programCount || programCount === 0) {
      console.log('Seeding initial Programs...');
      const programs = [
        {
          title: "Mentorship Program",
          description: "Connect with industry experts who will guide your professional journey. Get personalized feedback, career roadmaps, and industry insights.",
          image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
          duration: "12 Weeks",
          syllabus: JSON.stringify([
            "Introduction & Goal Alignment",
            "Personal Branding & CV Review",
            "Mock Interviews & Technical Assessments",
            "Final Project & Graduation Pitch"
          ]),
          details: "Our Mentorship Program pairs aspiring tech enthusiasts in Ghana with experienced industry veterans worldwide. Mentors provide 1-on-1 sessions weekly, offering feedback on projects, advice on career trajectories, and key opportunities to grow. Graduates gain access to a global alumni network and immediate job placement support."
        },
        {
          title: "Skills Workshop",
          description: "Hands-on training sessions to develop practical skills. Master Git, React, responsive layouts, and cloud hosting.",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
          duration: "4 Weeks (Saturdays)",
          syllabus: JSON.stringify([
            "Git & GitHub Collaborative Workflows",
            "Tailwind CSS & Responsive Visual Layouts",
            "Vite & Modern Frontend Tooling",
            "Deployments to Vercel, Netlify & AWS"
          ]),
          details: "These intensive, hands-on weekend workshops focus on filling practical skill gaps. We emphasize real-world team collaboration and the active use of developer tooling. By the end of each session, students will have shipped a live application to production and added a clean project to their portfolio."
        },
        {
          title: "Online Courses",
          description: "Self-paced learning with expert-curated content. Follow structural curricula on full-stack development, database design, and UI/UX.",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
          duration: "Self-Paced",
          syllabus: JSON.stringify([
            "Web Development Fundamentals (HTML/CSS/JS)",
            "Database Systems & SQL Design",
            "React Essentials & Component Lifecycles",
            "Introduction to Backend Systems & API Routes"
          ]),
          details: "For students who require flexibility, G-Click offers a curated online portal. Our curriculum is tailored for low-bandwidth environments, ensuring students in remote areas can access high-quality developer resources. The platform includes self-graded coding exercises and peer forum boards."
        },
        {
          title: "Innovation Lab",
          description: "Explore cutting-edge technologies and creative solutions. Work in squads to build community projects using Web3, AI, and mobile APIs.",
          image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&q=80&w=800",
          duration: "Ongoing (Semester Basis)",
          syllabus: JSON.stringify([
            "Ideation & User Research in Local Contexts",
            "API Integrations & AI Playground Projects",
            "Agile Product Management & Scrums",
            "Beta Testing & Community Launch"
          ]),
          details: "The Innovation Lab is G-Click's sandbox for advanced graduates. Here, cross-functional student squads collaborate with local tech hubs to solve tangible community challenges. Previous projects include SMS-based healthcare platforms and agricultural logistics tracker dashboards."
        }
      ];

      for (const p of programs) {
        await client.query(`
          INSERT INTO programs (title, description, details, duration, image, syllabus)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [p.title, p.description, p.details, p.duration, p.image, p.syllabus]);
      }
      console.log('Programs seeded.');
    }

    // Seed Initial Data (Blog)
    const { rowCount: blogCount } = await client.query(`SELECT COUNT(*) FROM blog_posts`);
    if (!blogCount || blogCount === 0) {
      console.log('Seeding initial Blog Posts...');
      const blogs = [
        {
          title: "The Future of Digital Education",
          date: "2024-03-15",
          author: "Miss Wintima Akudugu",
          read_time: "5 min read",
          image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
          content: "Education is undergoing its most significant transformation since the invention of the printing press. The integration of digital classrooms, interactive platforms, and artificial intelligence is reshaping how students learn, collaborate, and build.\nIn West Africa, this shifts from a luxury to an absolute necessity. Access to remote computing courses, local coding workshops, and global mentorship platforms allows young developers in Ghana to compete globally without leaving their communities.\nAt G-Click, we are embracing this future by integrating modern web methodologies and AI assistants directly into our project scrums. By training students in agile workflows and collaborative tooling, we prepare them for the realities of modern software engineering teams."
        },
        {
          title: "Success Story: From Student to Tech Lead",
          date: "2024-03-10",
          author: "Ms. Esther Gyimah",
          read_time: "4 min read",
          image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800",
          content: "Sarah joined G-Click as an undergraduate student looking to gain practical coding experience. Struggling with standard theoretical lecture sheets, she joined our 12-week mentorship cohort where she was paired with a Senior Engineer from Berlin.\nThrough collaborative mock scrums, responsive layouts training, and Git workflows, Sarah built a community logistics management tool. That project became the focal point of her portfolio.\nToday, Sarah leads a development squad at a fintech startup in Accra, Ghana, and actively mentors G-Click's incoming cohorts. Her journey highlights the core philosophy of our foundation: education is amplified when coupled with personalized guidance."
        },
        {
          title: "Building Inclusive Tech Communities",
          date: "2024-03-05",
          author: "Sofia Rodriguez",
          read_time: "6 min read",
          image: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?auto=format&fit=crop&q=80&w=800",
          content: "Inclusivity is not a metric to be checked; it is a foundational pillar of structural community health. The tech industry has long faced barriers that keep underrepresented groups, particularly young women in rural regions, from accessing digital growth.\nWe target these challenges directly by hosting specialized workshops at local institutions, offering remote study stipends, and conducting female-focused mentorship campaigns.\nBy establishing safe spaces to fail, iterate, and build, we empower developers of all backgrounds to gain confidence. A diverse room of builders results in highly creative, resilient solutions for our community's biggest challenges."
        }
      ];

      for (const b of blogs) {
        await client.query(`
          INSERT INTO blog_posts (title, date, author, read_time, image, content)
          VALUES ($1, $2, $3, $4, $5, $6)
        `, [b.title, b.date, b.author, b.read_time, b.image, b.content]);
      }
      console.log('Blog posts seeded.');
    }

    console.log('Database setup complete!');
  } catch (err) {
    console.error('Error setting up database:', err);
  } finally {
    await client.end();
  }
};

setupDatabase();
