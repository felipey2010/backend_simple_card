const mongoose = require("mongoose");

const Cards = mongoose.model("cards");

module.exports = {
  async index(req, res) {
    const dadoCard = await Cards.find();
    return res.json(dadoCard);
  },
  async showOne(req, res) {
    const dadoCard = await Cards.find({
      isPosted: true,
    });
    if (dadoCard) {
      return res.json(dadoCard);
    } else {
      return res.json({
        success: false,
        message: "Not found",
      });
    }
  },
  async show(req, res) {
    const dadoCard = await Cards.findById(req.params.id);
    return res.json(dadoCard);
  },
  async store(req, res) {
    Cards.create(req.body)
      .then(result => {
        return res.json({
          success: true,
          message: result,
        });
      })
      .catch(err => {
        console.log(err);
        return res.json({
          success: false,
          message: err,
        });
      });
  },
  async update(req, res) {
    const dadoCard = await Cards.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then(result => {
        return res.json({
          success: true,
          message: result,
        });
      })
      .catch(err => ({
        success: false,
        message: err,
      }));
  },
  async destroy(req, res) {
    await Cards.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: result,
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err,
        });
      });
  },
};
