const request = require('supertest');
const express = require('express');
const cors = require('cors');

// Import your app or recreate it here if not exported
// If your app is in App.js and exported as module.exports = app;
const app = require('./App'); // Adjust if your export is different

describe('API Endpoints', () => {
  let token = 'demo-token';
  let createdId;

  it('POST /login - valid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'password' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBe(token);
  });

  it('POST /login - invalid credentials', async () => {
    const res = await request(app)
      .post('/login')
      .send({ username: 'admin', password: 'wrong' });
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });

  it('GET /items - unauthorized', async () => {
    const res = await request(app).get('/items');
    expect(res.statusCode).toBe(401);
  });

  it('GET /items - authorized', async () => {
    const res = await request(app)
      .get('/items')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('POST /items - missing name', async () => {
    const res = await request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({});
    expect(res.statusCode).toBe(400);
  });

  it('POST /items - create item', async () => {
    const res = await request(app)
      .post('/items')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Test Item' });
    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Test Item');
    createdId = res.body.id;
  });

  it('PUT /items/:id - update item', async () => {
    const res = await request(app)
      .put(`/items/${createdId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Updated Item' });
    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Updated Item');
  });

  it('PUT /items/:id - not found', async () => {
    const res = await request(app)
      .put('/items/9999')
      .set('Authorization', `Bearer ${token}`)
      .send({ name: 'Nope' });
    expect(res.statusCode).toBe(404);
  });

  it('DELETE /items/:id - delete item', async () => {
    const res = await request(app)
      .delete(`/items/${createdId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
  });

  it('DELETE /items/:id - not found', async () => {
    const res = await request(app)
      .delete('/items/9999')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(404);
  });
});