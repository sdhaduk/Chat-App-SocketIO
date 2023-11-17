import { userModel } from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  try {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({ _id }, jwtkey, { expiresIn: "3d" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email });

    if (user)
      return res
        .status(400)
        .send({ message: "User already registered with this email" });
    if (!name || !email || !password)
      return res.status(400).send({ message: "Send all registered fields" });
    if (!validator.isEmail(email))
      return res.status(400).send({ message: "Email is not valid" });
    if (!validator.isStrongPassword(password))
      return res
        .status(400)
        .send({ message: "Password needs to be more complex" });

    user = new userModel({ name, email, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await userModel.findOne({ email });
    if (!user)
      return res.status(400).send({ message: "Invalid email or password" });

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword)
      return res.status(400).send({ message: "Invalid email or password" });

    const token = createToken(user._id);
    res.status(200).json({ _id: user._id, name: user.name, email, token });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const findUser = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await userModel.findById(userId);
    res.status(200).json(user); 
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
    try {
      const users = await userModel.find({});
      res.status(200).json(users); 
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
};

