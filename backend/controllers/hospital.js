const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital'); // Make sure to adjust the path to your Hospital model

// Joi Schemas
const registerHospitalSchema = Joi.object({
    name: Joi.string().required().trim(),
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().min(6).required(),
    address: Joi.object({
        street: Joi.string().required().trim(),
        city: Joi.string().required().trim(),
        state: Joi.string().required().trim(),
        postalCode: Joi.string().required().trim().regex(/^[0-9]+$/)
    }).required(),
    phoneNumber: Joi.string().required().trim().pattern(new RegExp('^[6789]\\d{9}$')),
    departments: Joi.array().items(Joi.string().required()),
    servicesOffered: Joi.array().items(Joi.string()),
    emergencyService: Joi.boolean()
}).with('email', 'password');


const loginHospitalSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required()
}).with('email', 'password');

// Validation Schema
const editHospitalSchema = Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email().lowercase().trim(),
    address: Joi.object({
        street: Joi.string().trim(),
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        postalCode: Joi.string().trim().regex(/^[0-9]+$/)
    }),
    phoneNumber: Joi.string().trim().pattern(new RegExp('^[6789]\\d{9}$')),
    departments: Joi.array().items(Joi.string()),
    servicesOffered: Joi.array().items(Joi.string()),
    emergencyService: Joi.boolean()
});



// Controller for registering a hospital
const registerHospital = async (req, res) => {
    try {
        const { value, error } = registerHospitalSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const existingHospital = await Hospital.findOne({ email: value.email });
        if (existingHospital) {
            return res.status(400).json({ message: "Hospital already registered with this email." });
        }

        const hashedPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(value.password, salt));
        const newHospital = new Hospital({
            ...value,
            password: hashedPassword
        });

        await newHospital.save();
        const token = jwt.sign({ hospitalId: newHospital._id }, process.env.JWT_SECRET);

        res.status(201).json({ message: "Hospital registered successfully", token });
    } catch (error) {
        console.error("Registration Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

// Controller for hospital login
const loginHospital = async (req, res) => {
    try {
        const { value, error } = loginHospitalSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const hospital = await Hospital.findOne({ email: value.email });
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }

        const isMatch = await bcrypt.compare(value.password, hospital.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        const token = jwt.sign({ hospitalId: hospital._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};



const getHospitalDetails = async (req, res) => {
    const hospitalId = req.params.id;

    try {
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }
        res.json(hospital);
    } catch (error) {
        console.error("Error fetching hospital details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const editHospitalDetails = async (req, res) => {
    const hospitalId = req.params.id;
    const updateData = req.body;

    // Validate incoming data
    const { value, error } = editHospitalSchema.validate(updateData);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updatedHospital = await Hospital.findByIdAndUpdate(hospitalId, { $set: value }, { new: true });
        if (!updatedHospital) {
            return res.status(404).json({ message: "Hospital not found." });
        }
        res.json({ message: "Hospital updated successfully", updatedHospital });
    } catch (error) {
        console.error("Error updating hospital details:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getHospitalList = async(req , res)=>{

}


module.exports = { registerHospital, loginHospital , getHospitalDetails , editHospitalDetails , getHospitalList };
