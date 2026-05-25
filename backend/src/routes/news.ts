import express, { Request, Response } from 'express';
import { supabase } from '../db/supabaseClient';

const router = express.Router();

// GET all
router.get('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// GET by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('news').select('*').eq('id', req.params.id).single();
    if (error) throw error;
    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// POST
router.post('/', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('news').insert([req.body]).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// PUT
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('news').update(req.body).eq('id', req.params.id).select();
    if (error) throw error;
    res.json(data[0]);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { error } = await supabase.from('news').delete().eq('id', req.params.id);
    if (error) throw error;
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
