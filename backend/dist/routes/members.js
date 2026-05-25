"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const supabaseClient_1 = __importDefault(require("../db/supabaseClient"));
const router = express_1.default.Router();
// Get all members
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabaseClient_1.default
            .from('members')
            .select('*')
            .order('joined_at', { ascending: false });
        if (error)
            throw error;
        res.json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
// Add a single member
router.post('/', async (req, res) => {
    const { name, email, phone, location, address, employment_status, student_year, background_info } = req.body;
    try {
        const { data, error } = await supabaseClient_1.default
            .from('members')
            .insert([{ name, email, phone, location, address, employment_status, student_year, background_info }])
            .select();
        if (error)
            throw error;
        res.status(201).json(data[0]);
    }
    catch (error) {
        if (error.code === '23505') { // Unique violation for email
            res.status(400).json({ error: 'Email is already registered.' });
        }
        else {
            res.status(500).json({ error: error.message });
        }
    }
});
// Bulk insert members
router.post('/bulk', async (req, res) => {
    const members = req.body; // Expects an array of objects
    if (!Array.isArray(members)) {
        return res.status(400).json({ error: 'Expected an array of members' });
    }
    try {
        const { data, error } = await supabaseClient_1.default
            .from('members')
            .insert(members)
            .select();
        if (error)
            throw error;
        res.status(201).json(data);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.default = router;
