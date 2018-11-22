const assert = require('assert');
const request = require('supertest');
const app = require('../../app');

describe('Drivers controller', () => {
  it('Post to /api/drivers create a new driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({"email": "test@test.com"}) // here .send() is to send data with the POST request. it doesn't mean send the request
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, response) => {
        assert(response.body.created === 'driver')
        done();
      });
  })
})