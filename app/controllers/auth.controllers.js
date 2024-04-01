const config = require("../config/auth.config");
const db = require("../models/index.model");
const User = db.user;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const upload = require('../middlewares/multer');
exports.signup=(req,res)=>{
const user = new User({
  username: req.body.username,
  email: req.body.email,
  mobileNo: req.body.mobileNo,
  password: bcrypt.hashSync(req.body.password, 8),
  role: req.body.role
});
user.save()
  .then(() => {
    res.status(200).send({ message: "User signed up successfully" });
  })
  .catch(err => {
    res.status(500).send({ error: err.message });
  });
}


exports.signin = async (req, res) => {
  try {
    const user = await User.findOne({
      $or: [{ email: req.body.email }, { mobileNo: req.body.email }]
    })

    if (!user) {
      return res.status(400).send({ message: "User not found." });
    }

    const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid password!"
      });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      roles: user.role,
      token: token
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
exports.verifyedsignup = async(req,res) =>{
  try {
    await new Promise((resolve, reject) => {
        upload(req, null, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
    const newUser = new VerifiedUser({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        idProof: {
            data: req.file.buffer,
            contentType: req.file.mimetype
        },
        taxIdentificationNumber: req.body.taxIdentificationNumber,
        panNumber: req.body.panNumber,
        role: req.body.role || 'user',
        dateOfBirth: req.body.dateOfBirth,
        address: req.body.address,
        phoneNumber: req.body.phoneNumber
    });

    const savedUser = await newUser.save();
    return savedUser;
} catch (error) {
    console.error('Error saving user:', error);
    throw error;
}
}
exports.signout = async (req, res) => {
  try {
    req.session = null;
    return res.status(200).send({ message: "You've been signed out!" });
  } catch (err) {
    this.next(err);
  }
};
