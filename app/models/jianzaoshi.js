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
    company: {
        type: mongoose.Schema.Types.ObjectId,
        refs: 'company'
    }
})
export default mongoose.model('jianzaoshi', jianzaoshi);
