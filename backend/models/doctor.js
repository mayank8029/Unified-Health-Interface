const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true }
});

const qualificationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: Number }
});

const experienceSchema = new Schema({
  position: { type: String, required: true },
  workplace: { type: String, required: true },
  from: { type: Date },
  to: { type: Date }
});

const doctorSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6789]\d{9}$/, 'Please fill a valid Indian phone number'] // Regex for Indian phone numbers
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true },
  specialization: [{ type: String, required: true }],
  hospital: {
    type: Schema.Types.ObjectId,
    ref: 'Hospital',
    required: function() { return !this.clinic; }
  },
  clinic: {
    type: Schema.Types.ObjectId,
    ref: 'Clinic',
    required: function() { return !this.hospital; }
  },
  qualifications: [qualificationSchema],
  experiences: [experienceSchema],
  bio: { type: String, maxLength: 255 },
  about: { type: String },
  timeSlots: [{ day: String, start: String, end: String }],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  averageRating: { type: Number, default: 0 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ["pending", "approved", "cancelled"],
    default: "pending"
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  address: { type: addressSchema, required: true }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;