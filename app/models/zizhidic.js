import mongoose from 'mongoose'
const zhizhidic = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    }
})
export default mongoose.model('zhizhidic', zhizhidic);
