const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt_secret = process.env.JWT_SECRET

exports.signup = async (req, res) => {
    try {
        const {name, email, password, pic} = req.body;
        const find_user = await User.findOne({ email });

        if(find_user) {
            return res.status(401).json({ error : "Email already used"})
        }
        let pict = pic;
        if(!pic) {
            pict = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const user = new User({name, email, password : hash, pic : pict});
        user.save()
        const token = jwt.sign({ id : user._id }, jwt_secret, { expiresIn: '12h' } )
        res.status(200).json({message : 'Registration Successful', _id : user._id, name: user.name, email: user.email, isAdmin: user.isAdmin, pic: user.pic, token})
    } catch (error) {
        res.status(500).json({ error: "Registration failed" });
    }
}

exports.allUsers = async (req, res) => {
    try {
      const keyword = req.query.search
        ? {
            name: { $regex: `^${req.query.search}`, $options: "i" },
          }
        : {};
        
      const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
      res.send(users);
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  };
  