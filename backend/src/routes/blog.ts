import { Router } from 'express';
import { supabase } from '../db/supabaseClient';

const router = Router();

// GET all blog posts
router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// GET single blog post
router.get('/:id', async (req, res) => {
  const { data, error } = await supabase.from('blog_posts').select('*').eq('id', req.params.id).single();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// POST new blog post
router.post('/', async (req, res) => {
  const { title, date, author, readTime, content, image } = req.body;
  const { data, error } = await supabase.from('blog_posts').insert([{ title, date, author, read_time: readTime, content, image }]).select();
  if (error) return res.status(500).json({ error: error.message });
  res.status(201).json(data[0]);
});

// PUT update blog post
router.put('/:id', async (req, res) => {
  const { title, date, author, readTime, content, image } = req.body;
  const { data, error } = await supabase.from('blog_posts').update({ title, date, author, read_time: readTime, content, image }).eq('id', req.params.id).select();
  if (error) return res.status(500).json({ error: error.message });
  res.json(data[0]);
});

// DELETE blog post
router.delete('/:id', async (req, res) => {
  const { error } = await supabase.from('blog_posts').delete().eq('id', req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.status(204).send();
});

export default router;
