const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true }
});

const hospitalSchema = new Schema({
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
    match: [/^[6789]\d{9}$/, 'Please fill a valid Indian phone number'],
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  departments: [{
    type: String,
    required: true
  }],
  servicesOffered: [{
    type: String
  }],
  emergencyService: {
    type: Boolean,
    default: false
  },
  doctors: [{
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  // Additional fields such as capacity, ratings, etc., can be added here
});

const Hospital = mongoose.model('Hospital', hospitalSchema);

module.exports = Hospital;
