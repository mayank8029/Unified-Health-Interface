const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const { Schema } = mongoose;

const addressSchema = new Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true }
});
const locationSchema = new Schema({
  type: { type: String, default: 'Point' },
  coordinates: { type: [Number], index: '2dsphere' } // [longitude, latitude]
});

locationSchema.index({ coordinates: '2dsphere' });

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
  location:locationSchema,
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
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  doctors: [{
    type: Schema.Types.ObjectId,
    ref: 'Doctor'
  }],
  
});



// Adding the pagination plugin to the clinic schema
clinicSchema.plugin(mongoosePaginate);

const Clinic = mongoose.model('Clinic', clinicSchema);

module.exports = Clinic
