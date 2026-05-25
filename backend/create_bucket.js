const { Client } = require('pg');
require('dotenv').config();

const c = new Client(process.env.SUPABASE_POOLER_URL);
c.connect()
  .then(() => c.query("INSERT INTO storage.buckets (id, name, public) VALUES ('images', 'images', true) ON CONFLICT (id) DO NOTHING;"))
  .then(() => c.query("CREATE POLICY \"Public Access\" ON storage.objects FOR SELECT USING ( bucket_id = 'images' );"))
  .then(() => c.query("CREATE POLICY \"Public Insert\" ON storage.objects FOR INSERT WITH CHECK ( bucket_id = 'images' );"))
  .then(() => console.log('Bucket created and policies set'))
  .catch(console.error)
  .finally(() => c.end());
