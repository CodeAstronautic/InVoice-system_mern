const express = require("express");
const router = express.Router();
const User = require("../../server/models/user");
const multer = require("multer");
const passport = require("passport");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const myPlaintextPassword = "s0//P4$$w0rD";
//const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function (err, salt) {
  bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
    // Store hash in your password DB.
  });
});
const hash = bcrypt.hashSync(myPlaintextPassword, saltRounds);
/*
@req: post
@description: create a new user
@access: private
*/
const storage = multer.diskStorage({
  destination: "./upload",
  filename: function (req, file, cb) {
    //console.log(file)
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(png)$/)) {
      return cb(new Error("Only images files are allowed!"));
    }
    cb(null, true);
  },
});
router.post("/create", upload.single("file"), (req, res) => {
  //console.log(userData)
  const userData = {};
  userData.name = req.body.name;
  userData.phone = req.body.phone;
  userData.email = req.body.email;
  userData.password = hash;
  userData.profile = req.file.filename;
  userData.address = req.body.address;
  userData.role = req.body.role;

  //  console.log(userData)
  const user = new User(userData);
  user
    .save()
    .then(() => res.status(201).json(user))
    .catch((err) => res.status(400).json(err));
});

/*
@req: post
@route: /api/users/search
@description: search form for users
@access: private
*/

router.post(
  "/search",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const filteredSearchInput = FilterSearch(req.body);

    Student.find(filteredSearchInput)
      .then((result) => {
        if (result.length > 0) {
          return res.status(200).json(result);
        } else {
          return res.status(404).json({ notFound: "couldn't find any users" });
        }
      })
      .catch(() =>
        res.status(404).json({ notFound: "couldn't find any users" })
      );
  }
);

/*
@req: get
@route: /api/users/:user_id
@description: find user by id
@access: private
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    //console.log(result)
    User.find()
      .then((result) => res.status(200).json(result))
      .catch((err) => res.status(404).json({ notFound: "user doesn't exist" }));
    // console.log(err)
  }
);

/*
@req: put
@route: /api/user/:user_id
@description: update user by id
@access: private
*/
router.put(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const userData = {};
    userData.name = req.body.name;
    userData.phone = req.body.phone;
    userData.email = req.body.email;
    userData.password = req.body.password;
    User.findOneAndUpdate(
      { _id: req.params.user_id },
      { $set: userData },
      { new: true, useFindAndModify: false }
    )
      .then((result) => {
        if (result) {
          return res.status(200).json(result);
        } else {
          return res.status(404).json({ notFound: "user not found" });
        }
      })
      .catch((err) => res.status(400).json(err));
  }
);

//https://dev.to/shajahan/enospc-system-limit-for-number-of-file-watchers-reached-ubuntu-emberjs-5347
/*
@req: delete
@route: /api/users/:user_id
@description: delete user by id
@access: private
*/

router.delete(
  "/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    User.findByIdAndDelete(req.params.user_id)
      .then(() => res.status(200).json({ msg: "user deleted successfully" }))
      .catch((err) => res.status(400).json(err));
  }
);
module.exports = router;
