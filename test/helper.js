const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/muber_test', {useNewUrlParser: true});
  mongoose.connection
    .once('open', () => {
      done()
    })
    .on('error', (e) => {
      console.log('error connecting to mongodb: ', e)
    })
})

beforeEach((done) => {
  const {drivers} = mongoose.connection.collections;
  drivers.drop()
    .then(() => drivers.ensureIndex({ 'geometry.coordinates': '2dsphere' })) // so each time we drop a collection, then immediately recreate this index
    .then(() => done())
    .catch(() => done()) // this catch statement with done() is for the very first time we run our tests, we can't drop sthg that doesn"t even exist!!!
})

// A key thing to know is that when a test suits is about to run, the schema are loaded with the indices that are created but then before running each test, we drop the driver collection which drops the indices that was built the first and only time. So, the indices are never naturally rebuild. To ensure, indices are rebuild before running each test, we must enforce it as we do above
