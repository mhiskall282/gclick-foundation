"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabaseClient_1 = require("../db/supabaseClient");
const router = express_1.default.Router();
// GET all
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.supabase.from('interactive_labs').select('*').order('created_at', { ascending: false });
        if (error)
            throw error;
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// GET by ID
router.get('/:id', async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.supabase.from('interactive_labs').select('*').eq('id', req.params.id).single();
        if (error)
            throw error;
        res.json(data);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// POST
router.post('/', async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.supabase.from('interactive_labs').insert([req.body]).select();
        if (error)
            throw error;
        res.json(data[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// PUT
router.put('/:id', async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.supabase.from('interactive_labs').update(req.body).eq('id', req.params.id).select();
        if (error)
            throw error;
        res.json(data[0]);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const { error } = await supabaseClient_1.supabase.from('interactive_labs').delete().eq('id', req.params.id);
        if (error)
            throw error;
        res.json({ success: true });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
exports.default = router;
