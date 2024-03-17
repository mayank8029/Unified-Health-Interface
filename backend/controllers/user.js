const mongoose = require("mongoose");
const joi = require("joi");
const { user } = require("../models/user");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserRegister = async (req, res) => {
  try {
    const schema = joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      password: joi.string().required().min(3),
      phoneNumber: joi.string()
      .regex(/^[6-9]\d{9}$/)  // Indian mobile number format: Starts with 6, 7, 8, or 9 followed by 9 digits
      .required()
      .messages({
          'string.pattern.base': 'Mobile number must be a valid Indian mobile number'
      }),
      gender:joi.string(),
      dob: joi.date(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const email = req.body.email;

    const userExist = await user.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: "user already exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      gender: req.body.gender,
      dob: req.body.dob,
    });

    const savedUser = await newUser.save();

    console.log(savedUser);

    return res
      .status(200)
      .json({ message: "user Created Successfully", newUser: savedUser });
  } catch (error) {
    console.error("Error occurred:", error.message);

    if (error) {
      return res.status(error.status).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const userLogin = async (req, res) => {

    try {
        const schema = joi.object({
            email: joi.string().email().required() ,
            password: joi.string().required().min(3), 
        })

        const {error} = schema.validate(req.body) ; 

        if(error){
            return res.status(400).json({
                error:error.details[0].message
            })
        }
        
        const body = req.body;
        const email = body.email;
        const password = body.password;
      
        const userExist = await user.findOne({email});
      
        if (!userExist) {
          return res.status(404).json({
            message: "Invalid credentials",
          });
        }

        const passwordMatch = await bcrypt.compare(password , userExist.password)

        if(!passwordMatch){
            return res.status(401).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({userId:userExist._id} , process.env.SECRET)
      
        return res.status(200).json({
          message: "login Successfull",
          token
        });
    } catch (error) {
        console.error("Error occurred:", error.message);
        return res.status(500).json({ error: "Internal Server Error" }); 
    }
};

module.exports = { UserRegister, userLogin };
