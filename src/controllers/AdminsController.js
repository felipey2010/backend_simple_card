const mongoose = require("mongoose");

const Admins = mongoose.model("admins");

module.exports = {
  async index(req, res) {
    const dadoAdmin = await Admins.find();
    return res.json(dadoAdmin);
  },
  async show(req, res) {
    const dadoAdmin = await Admins.findById(req.params.id);
    return res.json(dadoAdmin);
  },
  async store(req, res) {
    const dadoAdmin = await Admins.find({ email: req.body.email });

    if (dadoAdmin.length > 0) {
      return res.json({
        success: false,
        message: "E-mail Error",
      });
    } else {
      Admins.create(req.body)
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
    }
  },
  async update(req, res) {
    const dadoAdmin = await Admins.findByIdAndUpdate(req.params.id, req.body, {
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
    await Admins.findByIdAndDelete(req.params._id)
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
