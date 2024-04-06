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

    const email = req.body.email.toLowerCase();

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

    const {password , ...userWithoutPassword} = savedUser.toObject() ; 

    console.log(userWithoutPassword);

    return res
      .status(200)
      .json({ message: "user Created Successfully", newUser: userWithoutPassword });
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
            password: joi.string().required(),
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


 const  userProfile = async (req , res)=>{

  try {
    const userId = req.userId
    console.log(userId) ; 
  
    const thisUser = await user.findById(userId).select("-password"); 
  
    if(!thisUser) return res.status(401).json({msg:"user not found"}) ; 
    
    return res.status(200).json(thisUser)

  } catch (error) {
    console.log(error.message);
    return res.status(500).send('Server Error');  
  }

 }
const editUserProfile = async (req , res)=>{
  try {
    // Find the user by ID and ensure they exist
    let User = await user.findById(req.userId);
    console.log(req.userId)
    if (!User) {
        return res.status(404).json({ msg: 'User not found' });
    }

    // Updateable fields
    const { firstName, lastName, phoneNumber, gender, dob } = req.body;

    // Construct a new object based on provided fields
    let userFields = {};
    if (firstName) userFields.firstName = firstName;
    if (lastName) userFields.lastName = lastName;
    if (phoneNumber) userFields.phoneNumber = phoneNumber;
    if (gender) userFields.gender = gender;
    if (dob) userFields.dob = dob;

    // Update the user in the database
     User = await user.findByIdAndUpdate(
        req.userId,
        { $set: userFields },
        { new: true } // Return the updated user
    ).select('-password'); // Exclude password from the result

    res.json(User);
} catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
}
};


module.exports = { UserRegister, userLogin , userProfile , editUserProfile };
