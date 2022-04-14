module.exports = {
  get(req, res) {
    res.status(404).send("<h1>Woops o existe esta pagina!</h1>");
  },
};
