const assert = require('assert');
const request = require('supertest');
const app = ('../../app');
//const Driver = require('../../models/driver');

describe('Drivers controller', () => {
  it.only('Post to /api/drivers create a new driver', (done) => {
    request(app)
      .post('/api/drivers')
      .send({email: 'test@test.com'}) // here .send() is to send data with the POST request. it doesn't mean send the request
      .set('Accept', 'application/json')
      .expect(200)
      .end((err, response) => {
        console.log('res is ', response)
        //assert(response.body.driver === "created")
        if(err) return done(err)
        done();
      });
  })
})
