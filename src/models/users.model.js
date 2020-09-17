require("dotenv").config();
const mongoose = require("mongoose");
const pick = require("lodash.pick");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

const config = require("../config/database");

// Create the schema
const schema = {
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    trim: true,
    minlength: 6,
  },
  username: {
    type: String,
    trim: true,
    required: [true, "Please enter your username"],
  },
  isAdmin: Boolean,
};

// Create the model
const userSchema = new mongoose.Schema(schema, { timestamps: true });

// Hash password before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    next();
  }
});

// Choose user data ta send back to client
userSchema.methods.toJSON = function () {
  let userObject = this.toObject();
  return pick(userObject, ["_id", "email", "isAdmin", "username"]);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      isAdmin: this.isAdmin,
    },
    process.env.JWT_SECRET
  );
  return token;
};

// Export the model
const User = mongoose.model("user", userSchema);

function validateUser(data) {
  const schema = Joi.object().keys({
    email: Joi.string().required().email().label("Not a valid email"),
    username: Joi.string().required().label("Username is required"),
    password: Joi.string()
      .required()
      .min(6)
      .label("Password must be at least 6 characters"),
  });
  return schema.validate(data);
}

const userModel = {
  async login(email, password) {
    try {
      // check if user exists
      const user = await User.findOne({ email: email });
      if (!user)
        return {
          loggedIn: false,
          message: "Invalid password or email",
        };
      // decode hashed password
      const passwordIsCorrect = await bcrypt.compare(password, user.password);
      if (!passwordIsCorrect)
        return {
          loggedIn: false,
          message: "Invalid password or email",
        };
      // create x-access-control token
      const token = user.generateAuthToken();
      return {
        loggedIn: true,
        token,
        user,
      };
    } catch (error) {
      console.log(error);
    }
  },

  async count() {
    try {
      return User.countDocuments();
    } catch (error) {
      console.log(error);
      return false;
    }
  },

  async getUsers() {
    try {
      return User.find();
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async getUser(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async createUser(user) {
    try {
      return await User.create(user);
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async updateUser(id, body) {
    try {
      return await User.findByIdAndUpdate(id, body, {
        new: true,
      });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  async deleteUser(id) {
    try {
      return await User.deleteOne({ _id: id });
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

module.exports = { User, userModel, validateUser };
