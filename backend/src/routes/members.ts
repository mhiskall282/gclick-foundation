import express, { Request, Response } from 'express';
import supabase from '../db/supabaseClient';

const router = express.Router();

// Get all members
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('members')
      .select('*')
      .order('joined_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Add a single member
router.post('/', async (req: Request, res: Response) => {
  const { name, email, phone, location, address, employment_status, student_year, background_info } = req.body;
  try {
    const { data, error } = await supabase
      .from('members')
      .insert([{ name, email, phone, location, address, employment_status, student_year, background_info }])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error: any) {
    if (error.code === '23505') { // Unique violation for email
      res.status(400).json({ error: 'Email is already registered.' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Bulk insert members
router.post('/bulk', async (req: Request, res: Response) => {
  const members = req.body; // Expects an array of objects
  if (!Array.isArray(members)) {
    return res.status(400).json({ error: 'Expected an array of members' });
  }

  try {
    const { data, error } = await supabase
      .from('members')
      .insert(members)
      .select();

    if (error) throw error;
    res.status(201).json(data);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
