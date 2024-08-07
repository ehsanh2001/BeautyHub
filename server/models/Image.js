const { Schema, model } = require('mongoose');

const imageSchema = new Schema({
    businessId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    filename: {
        type: String,
        required: true,
    },
    mimetype: {
        type: String,
        required: true
    },
    buffer: {
        type: Buffer,
        required: true
    }
})

const Image = model('Image', imageSchema)

module.exports = Image