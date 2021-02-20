const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Admin = mongoose.model("admins");

const secret = "XXX";

module.exports = {
  async authenticate(req, res) {
    const { email, password } = req.body;
    await Admin.findOne({ email: email }, async function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          error: "Internal error please try again",
        });
      } else if (!user) {
        res.status(401).json({
          success: false,
          error: "E-mail Error",
        });
      } else {
        if (password === user.password) {
          user.isLoggedIn = true;
          user.lastLoggedIn = Date.now();

          await Admin.findByIdAndUpdate(user._id, user, {
            new: true,
          })
            .then(result => {
              const userDetails = {
                isLoggedIn: user.isLoggedIn,
                dateCreated: user.dateCreated,
                id: user._id,
                name: user.name,
                email: user.email,
                lastLoggedIn: user.lastLoggedIn,
                lastLoggedOut: user.lastLoggedOut,
              };

              // Issue token
              const payload = { email };
              const token = jwt.sign(payload, secret);

              return res
                .cookie("token", token, { httpOnly: true })
                .status(200)
                .json({
                  success: true,
                  message: "Valid login",
                  token: token,
                  user: userDetails,
                });
            })
            .catch(err => ({
              success: false,
              message: err,
            }));
        } else {
          return res.json({
            success: false,
            message: "Not Authorized",
          });
        }
      }
    });
  },
  async checkToken(req, res) {
    jwt.verify(req.params.token, secret, function (err, decoded) {
      if (err) {
        res.json({
          success: false,
          message: "invalid",
        });
      } else {
        //console.log(decoded);
        Admin.findOne({ email: decoded.email }, function (err, user) {
          if (err) {
            console.error(err);
            res.json({
              success: false,
              message: "internal",
            });
          } else if (!user) {
            res.json({
              success: false,
              message: "incorrect",
            });
          } else {
            const userDetails = {
              isLoggedIn: user.isLoggedIn,
              dateCreated: user.dateCreated,
              id: user._id,
              name: user.name,
              email: user.email,
              lastLoggedIn: user.lastLoggedIn,
              lastLoggedOut: user.lastLoggedOut,
            };
            return res.status(200).json({
              success: true,
              message: "valid",
              user: userDetails,
            });
          }
        });
      }
    });

    //res.sendStatus(200);
  },
  async logout(req, res) {
    await Admin.findById(req.params.id, async function (err, user) {
      if (err) {
        res.status(500).json({
          success: false,
          erro: "Erro: interno",
        });
      } else if (!user) {
        res.status(401).json({
          success: false,
          error: "User not found",
        });
      } else {
        user.isLoggedIn = false;
        user.lastLoggedOut = Date.now();

        await Admin.findByIdAndUpdate(user._id, user, {
          new: true,
        })
          .then(result => {
            return res.status(200).json({
              success: true,
              message: "Logged out",
            });
          })
          .catch(err => ({
            success: false,
            message: err,
          }));
      }
    });
  },
};
