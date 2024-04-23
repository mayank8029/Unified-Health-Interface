const mongoose = require('mongoose');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, default: 'India' } // Added default country if specific to a region
});

const qualificationSchema = new Schema({
  degree: { type: String, required: true },
  institution: { type: String, required: true },
  year: { type: Number, min: 1900, max: new Date().getFullYear() } // Added validation for year
});

const experienceSchema = new Schema({
  position: { type: String, required: true },
  workplace: { type: String, required: true },
  from: { type: Date, required: true },
  to: { type: Date },
  isCurrent: { type: Boolean, default: false }
});

const specializationSchema = new Schema({
  name: { type: String, required: true, unique: true }, // Ensure uniqueness across specializations
  description: { type: String }
});

const reviewSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, trim: true },
  reviewer: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  createdOn: { type: Date, default: Date.now } // Track when a review was created
});

const doctorSchema = new Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  dob: { type: Date, required: true },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^[6789]\d{9}$/, 'Please fill a valid Indian phone number']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: { type: String, required: true },
  specializations: [specializationSchema], // Embedded subdocument
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
  registrationNumber: { type: String, unique: true, required: true },
  profilePicture: { type: String, default: 'default-profile.jpg' }, // Default image path
  consultationFee: { type: Number, required: true }, // Made required
  timeSlots: [{
    day: { type: String, required: true },
    start: { type: String, required: true },
    end: { type: String, required: true }
  }],
  reviews: [reviewSchema],
  averageRating: { type: Number, default: 0, min: 0, max: 5 },
  totalRating: { type: Number, default: 0 },
  isApproved: {
    type: String,
    enum: ['pending', 'approved', 'cancelled'],
    default: 'pending'
  },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  address: addressSchema
});

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;