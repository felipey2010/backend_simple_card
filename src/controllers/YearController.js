const mongoose = require("mongoose");

const Years = mongoose.model("years");

module.exports = {
  async index(req, res) {
    const dado = await Years.find();
    return res.json(dado);
  },
  async show(req, res) {
    const dado = await Years.findById(req.params.id);
    return res.json(dado);
  },
  async store(req, res) {
    const dado = await Years.find({ year: req.body.year });

    if (dado.length > 0) {
      return res.json({
        success: false,
        message: "Year Already Exist",
      });
    } else {
      Years.create(req.body)
        .then(result => {
          return res.json({
            success: true,
            message: "Year Created",
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
    const dado = await Years.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then(result => {
        return res.json({
          success: true,
          message: "Year updated",
        });
      })
      .catch(err => ({
        success: false,
        message: err,
      }));
  },
  async destroy(req, res) {
    await Years.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "Year Deleted",
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
