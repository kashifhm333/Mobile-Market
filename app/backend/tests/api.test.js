import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';
import { connectDB, disconnectDB } from '../src/config/db.js';
import { User } from '../src/models/User.js';
import { Listing } from '../src/models/Listing.js';

describe('MobileMart Backend API Integration Tests', () => {
  let adminToken;
  let sellerToken;
  let buyerToken;
  let createdListingId;
  let testSellerId;
  let testBuyerId;

  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await disconnectDB();
  });

  describe('1. Health Check', () => {
    it('GET /api/v1/health returns ok status', async () => {
      const res = await request(app).get('/api/v1/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
    });
  });

  describe('2. Authentication & Authorization', () => {
    it('POST /api/v1/auth/login succeeds with valid seller credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'seller@mobilemart.com', password: 'SellerPass123!' });

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.user.email).toBe('seller@mobilemart.com');
      sellerToken = res.body.data.token;
      testSellerId = res.body.data.user._id;
    });

    it('POST /api/v1/auth/login succeeds with buyer credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'buyer@mobilemart.com', password: 'BuyerPass123!' });

      expect(res.status).toBe(200);
      buyerToken = res.body.data.token;
      testBuyerId = res.body.data.user._id;
    });

    it('POST /api/v1/auth/login succeeds with admin credentials', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'admin@mobilemart.com', password: 'AdminPass123!' });

      expect(res.status).toBe(200);
      expect(res.body.data.user.role).toBe('ADMIN');
      adminToken = res.body.data.token;
    });

    it('POST /api/v1/auth/login rejects invalid password', async () => {
      const res = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: 'seller@mobilemart.com', password: 'WrongPassword' });

      expect(res.status).toBe(401);
      expect(res.body.success).toBe(false);
    });

    it('GET /api/v1/auth/me returns profile for authenticated user', async () => {
      const res = await request(app)
        .get('/api/v1/auth/me')
        .set('Authorization', `Bearer ${sellerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.user.name).toBe('Alex Rivera');
    });
  });

  describe('3. Listings Workflow', () => {
    it('GET /api/v1/listings returns paginated active listings', async () => {
      const res = await request(app).get('/api/v1/listings?limit=5');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('POST /api/v1/listings creates a new listing when authenticated', async () => {
      const res = await request(app)
        .post('/api/v1/listings')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          title: 'Sony Xperia 1 VI - 256GB - Platinum Silver',
          brand: 'Sony',
          model: 'Xperia 1 VI',
          variant: '256GB / 12GB RAM',
          condition: 'NEW',
          price: 1050,
          city: 'Austin, TX',
          description: 'Brand new in box Sony Xperia 1 VI with Zeiss optics and headphone jack.'
        });

      expect(res.status).toBe(201);
      expect(res.body.data.listing.title).toContain('Sony Xperia');
      createdListingId = res.body.data.listing._id;
    });

    it('PATCH /api/v1/listings/:id/status updates status to RESERVED', async () => {
      const res = await request(app)
        .patch(`/api/v1/listings/${createdListingId}/status`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({ status: 'RESERVED' });

      expect(res.status).toBe(200);
      expect(res.body.data.listing.status).toBe('RESERVED');
    });

    it('PATCH /api/v1/listings/:id/status allows seller to confirm SOLD', async () => {
      const res = await request(app)
        .patch(`/api/v1/listings/${createdListingId}/status`)
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({ status: 'SOLD' });

      expect(res.status).toBe(200);
      expect(res.body.data.listing.status).toBe('SOLD');
    });

    it('Non-owner cannot modify another user\'s listing', async () => {
      const res = await request(app)
        .patch(`/api/v1/listings/${createdListingId}/status`)
        .set('Authorization', `Bearer ${buyerToken}`)
        .send({ status: 'ACTIVE' });

      expect(res.status).toBe(403);
    });
  });

  describe('4. Favorites Workflow', () => {
    it('POST /api/v1/favorites/:listingId adds listing to favorites', async () => {
      const res = await request(app)
        .post(`/api/v1/favorites/${createdListingId}`)
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(res.status).toBe(201);
    });

    it('GET /api/v1/favorites lists favorited items', async () => {
      const res = await request(app)
        .get('/api/v1/favorites')
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.some((l) => l._id === createdListingId)).toBe(true);
    });

    it('DELETE /api/v1/favorites/:listingId removes favorite', async () => {
      const res = await request(app)
        .delete(`/api/v1/favorites/${createdListingId}`)
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(res.status).toBe(200);
    });
  });

  describe('5. Inquiries & Direct Messaging', () => {
    it('Buyer cannot start inquiry on their own listing', async () => {
      const res = await request(app)
        .post('/api/v1/conversations')
        .set('Authorization', `Bearer ${sellerToken}`)
        .send({
          listingId: createdListingId,
          message: 'Inquiring to myself'
        });

      expect(res.status).toBe(400);
    });

    it('Buyer can initiate inquiry and send price proposal', async () => {
      const res = await request(app)
        .post('/api/v1/conversations')
        .set('Authorization', `Bearer ${buyerToken}`)
        .send({
          listingId: createdListingId,
          message: 'Is the price flexible for local meetup?',
          proposedPrice: 950
        });

      expect(res.status).toBe(201);
      expect(res.body.data.proposedPrice).toBe(950);
    });
  });

  describe('6. Administrative Oversight', () => {
    it('Regular user cannot access admin stats (Forbidden)', async () => {
      const res = await request(app)
        .get('/api/v1/admin/stats')
        .set('Authorization', `Bearer ${buyerToken}`);

      expect(res.status).toBe(403);
    });

    it('Admin can access marketplace overview stats', async () => {
      const res = await request(app)
        .get('/api/v1/admin/stats')
        .set('Authorization', `Bearer ${adminToken}`);

      expect(res.status).toBe(200);
      expect(res.body.data.totalUsers).toBeGreaterThanOrEqual(3);
    });
  });
});
