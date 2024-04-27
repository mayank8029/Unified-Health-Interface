const Joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Clinic = require('../models/Clinic'); // Adjust the path to your Clinic model

// Joi Schemas
const registerClinicSchema = Joi.object({
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
}).with('email', 'password');

const loginClinicSchema = Joi.object({
    email: Joi.string().email().required().lowercase().trim(),
    password: Joi.string().required()
}).with('email', 'password');

const editClinicSchema = Joi.object({
    name: Joi.string().trim(),
    email: Joi.string().email().lowercase().trim(),
    address: Joi.object({
        street: Joi.string().trim(),
        city: Joi.string().trim(),
        state: Joi.string().trim(),
        postalCode: Joi.string().trim().regex(/^[0-9]+$/)
    }),
    phoneNumber: Joi.string().trim().pattern(new RegExp('^[6789]\\d{9}$')),
});


// Controller for registering a clinic
const registerClinic = async (req, res) => {
    const { value, error } = registerClinicSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const existingClinic = await Clinic.findOne({ email: value.email });
    if (existingClinic) {
        return res.status(400).json({ message: "Clinic already registered with this email." });
    }

    const hashedPassword = await bcrypt.genSalt(10).then(salt => bcrypt.hash(value.password, salt));
    const newClinic = new Clinic({
        ...value,
        password: hashedPassword
    });

    await newClinic.save();
    const token = jwt.sign({ clinicId: newClinic._id }, process.env.JWT_SECRET);

    res.status(201).json({ message: "Clinic registered successfully", token });
};

// Controller for clinic login
const loginClinic = async (req, res) => {
    const { value, error } = loginClinicSchema.validate(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    const clinic = await Clinic.findOne({ email: value.email });
    if (!clinic) {
        return res.status(404).json({ message: "Clinic not found." });
    }

    const isMatch = await bcrypt.compare(value.password, clinic.password);
    if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = jwt.sign({ clinicId: clinic._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: "Login successful", token });
};

const getClinicDetails = async (req, res) => {
    const clinicId = req.params.id;

    try {
        const clinic = await Clinic.findById(clinicId);
        if (!clinic) {
            return res.status(404).json({ message: "Clinic not found." });
        }
        res.json(clinic);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const editClinicDetails = async (req, res) => {
    const clinicId = req.params.clinicId;
    const updateData = req.body;
    if (req.clinic !== req.params.clinicId) {
        return res.status(403).json({ message: "Unauthorized: You can only update your own profile." });
    }


    const { value, error } = editClinicSchema.validate(updateData);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const updatedClinic = await Clinic.findByIdAndUpdate(clinicId, { $set: value }, { new: true });
        if (!updatedClinic) {
            return res.status(404).json({ message: "Clinic not found." });
        }
        res.json({ message: "Clinic updated successfully", updatedClinic });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

const getClinicList = async(req , res)=>{
    const { longitude, latitude, city, state, page = 1, limit = 10 } = req.query;
    const options = {
        page: parseInt(page, 10), // Convert page number to integer
        limit: parseInt(limit, 10), // Convert limit to integer
    };

    try {
        let query = {};
        // Check if longitude and latitude are provided for geospatial search
        if (longitude && latitude) {
            const maxDistance = 10000; // Define the search radius (10 kilometers)
            query.location = {
                $near: { // MongoDB's $near operator for location-based queries
                    $geometry: {
                        type: "Point",
                        coordinates: [parseFloat(longitude), parseFloat(latitude)]
                    },
                    $maxDistance: maxDistance
                }
            };
        }

        // Check if city or state is provided for attribute-based search
        if (city || state) {
            if (city) query['address.city'] = city;
            if (state) query['address.state'] = state;
        }

        // Execute the query with pagination
        const result = await Clinic.paginate(query, options);
        res.json(result); // Send the result back to the client
    } catch (error) {
        res.status(500).send(error.toString()); // Handle any errors
    }
}

module.exports = { registerClinic, loginClinic, getClinicDetails, editClinicDetails , getClinicList };
