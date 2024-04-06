const mongoose = require("mongoose") ; 

const MedicalReportSchema = mongoose.Schema({
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
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    // Appointment type (e.g., in-person, online)
    appointmentType: {
        type: String,
        enum: ['inPerson', 'online'],
        default: 'inPerson'
    },
    // Online meeting details (optional, applicable for online appointments)
    onlineMeeting: {
        platform: {
            type: String,
            enum: ['Zoom', 'Google Meet', 'Microsoft Teams', 'Other'],
            required: function () {
                return this.appointmentType === 'online';
            }
        },
        meetingUrl: {
            type: String,
            required: function () {
                return this.appointmentType === 'online';
            }
        }
    },

})

const MedicalReportModel = mongoose.model("MediacalReportModal" , MedicalReportSchema)


module.exports = {MedicalReportModel , MedicalReportSchema}