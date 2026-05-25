const {Client} = require('pg'); 
const c = new Client('postgresql://postgres.ifwfuajivrsxwdzqjxls:Mhiskall9090@@aws-1-eu-central-1.pooler.supabase.com:6543/postgres'); 
c.connect()
.then(()=>c.query('ALTER TABLE programs DISABLE ROW LEVEL SECURITY; ALTER TABLE blog_posts DISABLE ROW LEVEL SECURITY; ALTER TABLE leadership DISABLE ROW LEVEL SECURITY; ALTER TABLE educational_tracks DISABLE ROW LEVEL SECURITY; ALTER TABLE interactive_labs DISABLE ROW LEVEL SECURITY; ALTER TABLE news DISABLE ROW LEVEL SECURITY; ALTER TABLE resources DISABLE ROW LEVEL SECURITY;'))
.then(()=>{console.log("RLS Disabled"); c.end()})
.catch(console.error);
