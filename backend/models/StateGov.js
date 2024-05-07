const mongoose = require("mongoose")

const stateGovernmentSchema = new mongoose.Schema({
    initiativeName: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    launchDate: {
        type: Date
    },
    documents: [{
        title: String,
        url: String
    }],
    images: [{
        url: String
    }],
    videos: [{
        url: String
    }]
});

const stateGovernmentModel = mongoose.model('stateGovernment', stateGovernmentSchema);

module.exports = {stateGovernmentModel}