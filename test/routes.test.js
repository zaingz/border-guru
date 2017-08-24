import request from 'supertest'
import app from '../src/app.js'

describe('GET /orders', () => {
  it('should return json list of orders', async () => {
    await request(app).get('/orders').expect(200).expect('Content-Type', /json/).then(res => {
      expect(res.body.data).toBeInstanceOf(Array)
    })
  })
})

describe('POST /orders', () => {
  it('should create new orders', async () => {
    await request(app)
      .post('/orders')
      .send({'orderID': 52})
      .then(res => {
        expect(res.body.data.orderID).toEqual(52)
      })
  })
})

describe('GET /orders/search', () => {
  it('should search orders by company', async () => {
    await request(app)
      .get('/orders/search/company/SuperTrader')
      .expect(200)
      .then(res => {
        expect(res.body.data.length).toBeGreaterThan(1)
      })
  })
  it('should search orders by address', async () => {
    await request(app)
      .get('/orders/search/address/Reeperbahn%20153')
      .expect(200)
      .then(res => {
        expect(res.body.data.length).toBeGreaterThan(1)
      })
  })
})

describe('GET /orders/count', () => {
  it('should give count for orders', async () => {
    await request(app)
      .get('/orders/count')
      .expect(200)
      .then(res => {
        expect(res.body.data[0].total).toBe(2)
      })
  })
})

describe('GET /404', () => {
  it('should return 404 for non-existent URLs', async () => {
    await request(app).get('/404').expect(404)
    await request(app).get('/notfound').expect(404)
  })
})
