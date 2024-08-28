
import asyncHandler from "express-async-handler";
import bcrypt from 'bcrypt'
import User from "../Modal/user.js";
import {generateToken} from "../utils/genarateToken.js";






export const userRegisterController = asyncHandler(
  async (req, res) => {
    const {name, email, password} = req.body
    
    const userEmail = await User.findOne({email})

    if(userEmail) {
      res.status(404).json({message: "Email already exist"})
      return
    }
 
  
   
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
  
    res.status(200).json({ message: " user created " ,status:"success" });
  }
)


  export const loginUserController = asyncHandler(
    async (req, res) => {
      const { email, password } = req.body;
  
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
          message: "Login Successful",
          status:"success",
          userId: user._id,
          user: user.name,
          
          token: generateToken(user.id),
        });
      } else {
        res.status(400);
        throw new Error("Invalid Credentials");
      }
    }
  );































