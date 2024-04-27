const mongoose = require("mongoose");
const Joi = require("joi");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Doctor = require("../models/Doctor"); // Ensure the path and exports are correct

// Environment variables for configurable settings
const { SECRET} = process.env;

const doctorSchemaValidation = Joi.object({
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  dob: Joi.date().required(),
  phoneNumber: Joi.string().regex(/^[6-9]\d{9}$/).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  specialization: Joi.array().items(Joi.string()).required(),
  hospital: Joi.string().optional(),
  clinic: Joi.string().optional(),
  address: Joi.object({
    street: Joi.string().required(),
    city: Joi.string().required(),
    state: Joi.string().required(),
    postalCode: Joi.string().required()
  }),
  qualifications: Joi.array().items(Joi.object({
    degree: Joi.string().required(),
    institution: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear())
  })),
  experiences: Joi.array().items(Joi.object({
    position: Joi.string().required(),
    workplace: Joi.string().required(),
    from: Joi.date(),
    to: Joi.date()
  })),
  bio: Joi.string().max(255),
  about: Joi.string()
});

const loginDoctorSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const doctorUpdateSchema = Joi.object({
    bio: Joi.string().max(255),
    profilePicture: Joi.string(),
    phoneNumber: Joi.string().regex(/^[6-9]\d{9}$/), // Indian mobile number format
    email: Joi.string().email(),
    consultationFee: Joi.number(),
    timeSlots: Joi.array().items(Joi.object({
        day: Joi.string().required(),
        start: Joi.string().required(),
        end: Joi.string().required()
    })),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        state: Joi.string(),
        postalCode: Joi.string(),
        country: Joi.string()
    })
}).min(1); // Ensure at least one field is provided for update

const registerDoctor = async (req, res) => {
  try {
    const { error } = doctorSchemaValidation.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = req.body;
    const doctorExists = await Doctor.findOne({ email });
    if (doctorExists) {
      return res.status(409).json({ message: "Doctor already exists" });
    }

    const saltRounds =  10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newDoctor = new Doctor({ ...req.body, password: hashedPassword });
    await newDoctor.save();

    // Optional: Issue a JWT token for the doctor
    const token = jwt.sign({ doctorId: newDoctor._id }, SECRET, { expiresIn: '1d' });

    res.status(201).json({ 
      message: "Doctor registered successfully", 
      doctorId: newDoctor._id,
    });
  } catch (err) {
    console.error("Error occurred:", err.message);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
  }
};


const loginDoctor = async (req, res) => {
    try {
      // Validate request body
      const { error } = loginDoctorSchema.validate(req.body);
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      const { email, password } = req.body;
      // Find the doctor by email
      const doctor = await Doctor.findOne({ email });
      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }
  
      // Compare the provided password with the hashed password in the database
      const isValidPassword = await bcrypt.compare(password, doctor.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      // Generate a token if login is successful
      const token = jwt.sign({ doctorId: doctor._id }, SECRET, { expiresIn: '1d' });
  
      res.json({
        message: "Login successful",
        token,
        doctorId: doctor._id
      });
    } catch (err) {
      console.error("Error occurred:", err.message);
      res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
  };

//create the controller logic for approveAppointmentRequests  ,  updateDoctorAvailability ,doctorDashboard , getDoctorAppointments: 


const editDoctorDetails = async (req, res) => {
    try {
        // Verify doctor ID from JWT matches the doctor ID in the parameter
        if (req.doctorId !== req.params.doctorId) {
            return res.status(403).json({ message: "Unauthorized: You can only update your own profile." });
        }

        const { error, value } = doctorUpdateSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: "Validation error: " + error.details[0].message });
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.doctorId, { $set: value }, { new: true, runValidators: true });
        if (!updatedDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json({ message: "Doctor profile updated successfully", doctor: updatedDoctor });
    } catch (err) {
        console.error("Error occurred:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};


const getDoctorProfile = async (req, res) => {
    const { doctorId } = req.params; // Assuming doctorId is passed as a URL parameter

    try {
        const doctor = await Doctor.findById(doctorId)
            .populate('specializations')  // Example of populating related documents, if applicable
            .populate('hospital')        // Assuming 'hospital' is a referenced document
            .populate('clinic');         // Assuming 'clinic' is a referenced document

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        res.status(200).json(doctor);
    } catch (err) {
        console.error("Failed to retrieve doctor:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

const getDoctorList = async(req , res)=>{

}

module.exports = { registerDoctor , loginDoctor , editDoctorDetails , getDoctorProfile , getDoctorList};