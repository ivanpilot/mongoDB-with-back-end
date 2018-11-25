const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Driver = mongoose.model('driver');

describe('Drivers controller', () => {

  it('Post to /api/drivers create a new driver', (done) => {
    Driver.count().then((count) => {

      request(app)
        .post('/api/drivers')
        .send({email: 'test@test.com'}) // here .send() is to send data with the POST request. it doesn't mean send the request
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, response) => {
          Driver.count().then((newCount) => {
            assert(count + 1 === newCount);
            done();
          })

        });
    })
  })

  it('PUT to /api/driver/:id updates an existing driver', (done) => {
    const driver = new Driver({email: 't@t.com', driving: false });
    driver.save().then(() => {
      request(app)
        .put('/api/drivers/' + driver._id)
        .send({driving: true})
        .set('Accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          Driver.findById({ _id: driver.id }).then((driver) => {
            //Driver.findOne({ email: 't@t.com' }).then((driver) => {
            assert(driver.driving === true)
            done()
          })
        })
    })
  })

  it('DELETE to /api/drivers/:id deletes an existing driver', (done) => {
    const driver = new Driver({email: 'driver@gmail.com', driving: false})
    driver.save().then(() => {
      request(app)
        .delete('/api/drivers/' + driver._id)
        .set('Accept', 'application/json')
        .expect(204)
        .end((err, res) => {
          Driver.findOne({email: 'driver@gmail.com'}).then((driver) => {
            assert(driver === null)
            done()
          })
        })
    })
  })

  it('GET to /api/drivers finds the drivers in a location', (done) => {
    const seattleDriver  = new Driver({
      email: 'seattle@gmail.com',
      geometry: {type: 'Point', coordinates: [-122.4759902, 47.6147628]}
    })

    const miamiDriver  = new Driver({
      email: 'miami@gmail.com',
      geometry: {type: 'Point', coordinates: [-80.253, 25.791]}
    })

    Promise.all([seattleDriver.save(), miamiDriver.save()])
      .then(() => {
        request(app)
          .get('/api/drivers?lng=-80&lat=25')
          .set('Accept', 'application/json')
          .end((err, res) => {
            console.log(res)
            assert(res.body.length === 1)
            assert(res.body[0].email === 'miami@gmail.com')
            done();
          })
      })
  })
})
