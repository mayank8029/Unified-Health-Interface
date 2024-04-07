const mongoose = require('mongoose');
const { Schema } = mongoose;

// Reusing the address schema defined earlier for consistency
const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true }
});

const clinicSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: addressSchema,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^[6789]\d{9}$/, 'Please fill a valid Indian phone number'], // Regex for Indian phone numbers
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  doctors: [{
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  // Additional fields like services offered, opening hours, etc., can be added here
});

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic;