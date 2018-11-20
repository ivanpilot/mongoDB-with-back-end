const assert = require('assert');
const request = require('supertest');
const app = ('../../app');
const Driver = require('../../models/driver');

describe('Drivers controller', () => {
  it('Post to /api/drivers create a new driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({email: 'test@test.com'}) // here .send() is to send data with the POST request. it doesn't mean send the request
      .set('Accept', 'application/json')
      .end(() => {
        done();
      });
  })
})