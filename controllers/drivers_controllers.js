module.exports = {
  greeting(req, res) {
    res.send({ hi: 'there'});
  },

  create(req, res) {
    console.log(req.body);
    console.log('hello here I am');

    res.send({ hi: 'there'});
  }
}