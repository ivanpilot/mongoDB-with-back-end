const Driver = require('../models/driver');

module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there'});
  },

  index(req, res, next) {
    const {lng, lat} = req.query;
    //http://google.com?lng=80&lat=60
    const point = {
      type: 'Point',
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };

    Driver.aggregate([
      {
        $geoNear: {
          near: point,
          spherical: true,
          maxDistance: 200000,
          distanceField: 'dist.calculated'
        }
      }
    ])
      .then((drivers) => res.send(drivers))
      .catch(next);
  },

  create(req, res, next) {
    // console.log('req body is: ', req.body);
    //res.send({ created: 'driver'});
    const driverProps = req.body;
    Driver.create(driverProps)
      .then(driver => res.send(driver))
      .catch(next);
  },

  edit(req, res, next) {
    const driverId = req.params.id;
    const driverProps = req.body;

    Driver.findByIdAndUpdate({ _id: driverId }, driverProps)
      .then(() => Driver.findById({ _id: driverId }))
      .then((driver) => {
        res.send(driver)
      })
      .catch(next)
  },

  delete(req, res, next) {
    const driverId = req.params.id;

    Driver.findOneAndDelete({ _id: driverId })
      .then((driver) => res.status(204).send(driver))
      .catch(next)
  },
}
