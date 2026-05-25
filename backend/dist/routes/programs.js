"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const supabaseClient_1 = require("../db/supabaseClient");
const router = (0, express_1.Router)();
// GET all programs
router.get('/', async (req, res) => {
    const { data, error } = await supabaseClient_1.supabase.from('programs').select('*').order('created_at', { ascending: false });
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data);
});
// GET single program
router.get('/:id', async (req, res) => {
    const { data, error } = await supabaseClient_1.supabase.from('programs').select('*').eq('id', req.params.id).single();
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data);
});
// POST new program
router.post('/', async (req, res) => {
    const { title, description, details, duration, image, syllabus } = req.body;
    const { data, error } = await supabaseClient_1.supabase.from('programs').insert([{ title, description, details, duration, image, syllabus }]).select();
    if (error)
        return res.status(500).json({ error: error.message });
    res.status(201).json(data[0]);
});
// PUT update program
router.put('/:id', async (req, res) => {
    const { title, description, details, duration, image, syllabus } = req.body;
    const { data, error } = await supabaseClient_1.supabase.from('programs').update({ title, description, details, duration, image, syllabus }).eq('id', req.params.id).select();
    if (error)
        return res.status(500).json({ error: error.message });
    res.json(data[0]);
});
// DELETE program
router.delete('/:id', async (req, res) => {
    const { error } = await supabaseClient_1.supabase.from('programs').delete().eq('id', req.params.id);
    if (error)
        return res.status(500).json({ error: error.message });
    res.status(204).send();
});
exports.default = router;
