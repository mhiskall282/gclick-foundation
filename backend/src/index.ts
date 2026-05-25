import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import programRoutes from './routes/programs';
import blogRoutes from './routes/blog';
import membersRoutes from './routes/members';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/programs', programRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/members', membersRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server] running on http://localhost:${PORT}`);
  });
}

export default app;
