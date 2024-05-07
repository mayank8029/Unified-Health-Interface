const mongoose = require("mongoose")

const centralGovernmentSchema = new mongoose.Schema({
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

const CentralGovernment = mongoose.model('CentralGovernment', centralGovernmentSchema);

module.exports = {CentralGovernment}

