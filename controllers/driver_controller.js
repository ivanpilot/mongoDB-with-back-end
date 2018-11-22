module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there'});
  },

  create(req, res) {
    // console.log('req body is: ', req.body);
    res.send({ created: 'driver'});
  },
}