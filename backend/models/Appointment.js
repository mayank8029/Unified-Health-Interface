const mongoose = require("mongoose") ; 

const appointmentSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'doctor',
        required: true
    },
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hospital',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    appointmentType: {
        type: String,
        enum: ['inPerson', 'online'],
        default: 'inPerson'
    },
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
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'cancelled'],
        default: 'pending'
    },

})

const appointmentModel = mongoose.model("appointmentModel" , appointmentSchema) ; 

module.exports = {appointmentModel , appointmentSchema}