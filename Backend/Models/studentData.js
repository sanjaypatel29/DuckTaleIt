const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const StudentDataSchema = new Schema({
    "id": {
        type: Number,
        required: true,
        unique: true
    },
    "firstName": {
        type: String,
        required: true
    },
    "lastName": {
        type: String,
        required: true
    },
    "stuClass": {
        type: String,
        required: true
    },

    "subject": {
        type: Array,
        default: [
            {
                "subName": {
                    type: String,
                    required: true
                },
                "marks": {
                    type: Number,
                    required: true
                },
            }
        ]
    },
});

module.exports = mongoose.model('studentData', StudentDataSchema)