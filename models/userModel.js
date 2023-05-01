const mongoose = require("mongoose");
const { hashPassword } = require('../utils/functions')

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: { unique: true },
      match: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
    },
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog'
      }
    ]
  },
  { timestamps: true }
);

userSchema.pre('save', function(next) {

    // check if password is present and is modified.
    if ( this.password && this.isModified('password') ) {
  
      // call your hashPassword method here which will return the hashed password.
      this.password = hashPassword(this.password);
  
    }
  
    // everything is done, so let's call the next callback.
    next();
  
  });

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
