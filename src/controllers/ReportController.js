const mongoose = require("mongoose");

const Reports = mongoose.model("reports");

module.exports = {
  async index(req, res) {
    const dadoCard = await Reports.find();
    return res.json(dadoCard);
  },
  async show(req, res) {
    const dadoCard = await Reports.findById(req.params.id);
    return res.json(dadoCard);
  },
  async store(req, res) {
    Reports.create(req.body)
      .then(result => {
        return res.json({
          success: true,
          message: "Report Created",
        });
      })
      .catch(err => {
        return res.json({
          success: false,
          message: err,
        });
      });
  },
  async update(req, res) {
    const dadoCard = await Reports.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .then(result => {
        return res.json({
          success: true,
          message: "Report updated",
        });
      })
      .catch(err => ({
        success: false,
        message: err,
      }));
  },
  async destroy(req, res) {
    await Reports.findByIdAndDelete(req.params.id)
      .then(result => {
        return res.json({
          success: true,
          message: "Report Deleted",
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
