const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
//const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const multer = require("multer")
const User = require("../models/user");
const { jwtSecret } = require("../config");

//const saltRounds = 10;

//hash password encryprion
/*
async function encrypt(password) {
  return await bcrypt.hash(password, saltRounds);
}

async function decrypt(encrypted, hash) {
  return await bcrypt.compare(encrypted, hash);
} */
// @endpoint   POST /api/users/register
// @desc       Register users
// @access     public
// @endpoint   POST /api/users/login
// @desc       Login the user
// @access     public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // Find the user
  const user = await User.findOne({ email  });
//console.log(errors)
  if (!user) {
     err.email = "Admin not found!";
    return res.status(404).json({err : err});
  }
  // Generate token
  //console.log(errors)
  const { id, name, email: userEmail, role } = user;
  // In jwt.sign set the data that you want to get
  const token = await jwt.sign({ id, name, userEmail, role }, jwtSecret, {
    expiresIn: 3600,
  });
  const bearerToken = `Bearer ${token}`;
  res.json({ token: bearerToken });
});

// @endpoint   POST /api/users/current
// @desc       Return current user
// @access     private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.send(req.user);
  }
);

//Reset Password

router.post("/resetpassword", async (req, res) => {
  var password = await encrypt(req.body.password);
  
  var decoded = null;
  if (req.headers.token) {
    decoded = jwt.verify(req.headers.token, key);
   console.log(req.headers.token)
  }
  var email = decoded ? decoded.email : req.body.email;
  console.log(req.body.email)
  console.log(decoded)
  User.findOneAndUpdate(
    { email: email },
    { $set: { password: password } },
    { upsert: true },
    (err, User) => {
      if (err) {
        console.log(err)
        res.json({
          status: false,
          statusCode: 404,
          message: "User not verify email successfully",
          error: err
        });
      } else {
        res.json({
          status: true,
          statusCode: 200,
          message: "Password Changed successfully"
        });
      }
    }
  );
  })

module.exports = router;
