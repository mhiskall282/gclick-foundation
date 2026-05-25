import express, { Request, Response } from 'express';
import multer from 'multer';
import { supabase } from '../db/supabaseClient';
import { verifyToken } from '../middleware/auth';
import crypto from 'crypto';
import path from 'path';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

router.post('/', verifyToken, upload.single('image'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided.' });
    }

    const fileExt = path.extname(req.file.originalname);
    const fileName = `${crypto.randomUUID()}${fileExt}`;
    const filePath = `public/${fileName}`;

    const { data, error } = await supabase.storage
      .from('images')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    res.status(201).json({ url: publicUrlData.publicUrl });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
