import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import User from "../Modal/user.js";
import { generateToken } from "../utils/genarateToken.js";
import Account from "../Modal/account.js";

export const loginAdminController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password)) && user.isAdmin) {
    res.json({
      message: "Login Successful",
      status: "success",
      userId: user._id,
      user: user.name,

      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
});

export const disableUser= asyncHandler(async (req, res) => {
  const { id } = req.body;

  const user = await User.findById(id);

  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  if (!user.disabled) {

    await User.findByIdAndUpdate(id, { disabled: true });
    res.json({ status: "success", message: "User disabled succesfully" });

  } else {


    await User.findByIdAndUpdate(id, { disabled: false });
    res.json({ status: "success", message: "User enabled succesfully" });

}});

export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({isAdmin:false});

  res.json({ status: "success", message: "get all user", data: users });
});

export const getUserById= asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await Account.findOne({ user: id }).populate('user');

  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  res.json({ status: "success", message: "get  user details", data: user });
});
