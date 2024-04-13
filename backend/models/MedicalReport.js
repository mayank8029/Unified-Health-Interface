const mongoose = require("mongoose");

const medicalReportSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor',
    required: true
  },
  hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hospital',
    required: false // Not all reports may be associated with a hospital
  },
  date: {
    type: Date,
    default: Date.now
  },
  reportType: {
    type: String,
    enum: ['Diagnostic', 'Treatment', 'Follow-up', 'Other'],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  files: [{
    fileName: { type: String },
    fileUrl: { type: String },
    fileType: { type: String } // e.g., image, pdf, etc.
  }],
  confidentiality: {
    type: String,
    enum: ['Public', 'Private', 'Confidential'],
    default: 'Confidential'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

medicalReportSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const MedicalReportModel = mongoose.model("MedicalReport", medicalReportSchema);

module.exports = { MedicalReportModel, medicalReportSchema };