const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getAllUsers = async (req, res) => {
    try {
        const allUsers = await User.find({});
        return res.json({ users: allUsers })
    } catch (err) {
        res.status(500).json({
            message: "something went wrong"
        })
    }
}

const getSingleUser = async (req, res) => {
    const {id} = req.params;
    if(!id) {
        return res.status(400).json({
            message: "Please provide id"
        })
    }
    try{
        const user = await User.findById(id);
        if(!user) {
            return res.status(404).json({
                message: "user could not be found"
            })
        }
        return res.status(200).json({
            user: user
        })
    } catch(err) {
        console.log(err)
    }
}

const signup = async (req, res) => {
    const { name, email, password, cPassword } = req.body;
  
    if (!name || !email || !password || !cPassword ) {
      return res.status(400).json({
        message: "all fields are necessary",
      });
    }
    if (password !== cPassword) {
      return res.status(400).json({
        message: "password Mismatch",
      });
    }
    try {
        const findUser = await User.findOne({ email: email });
        if (findUser) {
            return res.status(400).json({
                message: "Email already taken!",
            });
        }
        
        const user = new User({
        name: name,
        email: email,
        password: password,
    });
    
    console.log("got here")
      const createdUser = await user.save();
  
      return res.status(200).json({
        user: createdUser,
        message: "User Created Successfully",
      });
    } catch (err) {
      return res.status(500).json({
        error: err,
      });
      console.log(err);
    }
  };
  
  const signin = async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password ) {
      return res.status(400).json({
        message: "Fields can not be empty",
      });
    }
  
    try {
      const data = await User.findOne({ email: email });
      if (!data) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      console.log(data);
      const login = await bcrypt.compare(password, data.password);
      if (login) {
        const token = jwt.sign(
          {
            _id: data._id,
          },
          process.env.JWT_SECRET
        );
        // const encode = jwt.verify(token, process.env.JWT_SECRET);

        return res.status(200).json({
          token: token,
          user: { id: data._id, name: data.name },
        });
      }
      return res.status(400).json({
        message: "Password Mismatch",
      });
    } catch (err) {
      console.log(err);
    }
  };

const updateUser = async (req, res) => {
    const {id} = req.params;
    // can only update name
    const {name} = req.body
    if(!id) {
        return res.status(400).json({
            message: "Please provide an id"
        })
    }
    try{
        const updatedUser = await User.findByIdAndUpdate(id, {
            name
        }, {new : true});
        if(!updatedUser) {
            return res.status(404).json({
                message: "User not found "
            })
        }
        return res.status(200).json({
            user: updatedUser,
            message: "User updated successfully"
        })

    } catch(err) {
        console.log(err)
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if(!id) {
        return res.status(400).json({
            message: "Please provide an id"
        })
    }
    try{
        const deletedUser = await User.findByIdAndDelete(id)
        if(!deletedUser) {
            return res.status(400).json({
                message: "NO such user exists"
            })
        }
        return res.status(204).json({
            message: "User deleted successfully"
        })
    } catch(err){
        console.log(err)
    }
}

const changePassword = async (req, res) => {

    const {password, cPassword} = req.body;
    const {id} = req.params;
    if(!id) {
        return res.status(404).json({
            message: "provide an id"
        })
    }

    if (!password || !cPassword) {
        return res.status(400).json({
            message: "all fields are necessary"
        })
    }
    if (password !== cPassword) {
        return res.status(400).json({
            message: "password Mismatch"
        })
    }
    try{
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({
                message: "No such User Exists"
            })
        }
        user.password = password;
        const updatedUser = await user.save()
        return res.status(200).json({
            user: updatedUser,
            message: "Password Changed Successfully"
        })

    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getAllUsers,
    getSingleUser,
    // addUser,
    updateUser,
    deleteUser,
    changePassword,
    signin,signup
}