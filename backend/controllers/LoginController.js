const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwt_secret = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "User dosenot exist !!!" });
    }
    if (!bcrypt.compare(password, user.password)) {
      return res.status(401).json({ error: "Incorrect Password" });
    }
    const token = jwt.sign({ id: user._id }, jwt_secret, { expiresIn: '12h' });
    res
      .status(200)
      .json({
        message: "Login Successful",
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        pic: user.pic,
        token,
      });
  } catch (error) {
    res.status(500).json({ error: "Login Failed !!!" });
  }
};
