import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import programRoutes from './routes/programs';
import blogRoutes from './routes/blog';
import membersRoutes from './routes/members';
import leadershipRoutes from './routes/leadership';
import tracksRoutes from './routes/tracks';
import labsRoutes from './routes/labs';
import newsRoutes from './routes/news';
import resourcesRoutes from './routes/resources';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Security and Logging Middlewares
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/programs', programRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/members', membersRoutes);
app.use('/api/leadership', leadershipRoutes);
app.use('/api/tracks', tracksRoutes);
app.use('/api/labs', labsRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/resources', resourcesRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'G-Click API is live!' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running' });
});

// Global Error Handler Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[Error]:', err.message);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`[Server] running on http://localhost:${PORT}`);
  });
}

export default app;
