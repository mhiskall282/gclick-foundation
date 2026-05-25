import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import app from '../src/index';
import supabase from '../src/db/supabaseClient';

// Mock Supabase client
vi.mock('../src/db/supabaseClient', () => ({
  default: {
    from: vi.fn(() => ({
      select: vi.fn().mockReturnThis(),
      insert: vi.fn().mockReturnThis(),
      order: vi.fn().mockResolvedValue({
        data: [{ id: 1, name: 'John Doe', email: 'john@example.com' }],
        error: null,
      }),
    })),
  },
}));

describe('Members API', () => {
  it('GET /api/members should return list of members', async () => {
    const res = await request(app).get('/api/members');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('John Doe');
  });

  it('POST /api/members/bulk should return 400 for non-array payloads', async () => {
    const res = await request(app)
      .post('/api/members/bulk')
      .send({ name: 'John', email: 'john@example.com' });
      
    expect(res.status).toBe(400);
    expect(res.body.error).toBe('Expected an array of members');
  });
});
