import mongoose from 'mongoose'
const jianzaoshi = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    idcard: {
        type: String,
    },
    type: {
        type: String,
        required: true,
    },
    regcode: {
        type: String,
        required: true,
    },
    regspec: {
        type: String,
    },
})
export default mongoose.model('jianzaoshi', jianzaoshi);
