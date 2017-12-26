import mongoose from 'mongoose'
const zhizhi = new mongoose.Schema({
    certno: {
        type: String,
        required: true,
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'company'
    },
    zhizhi: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'zhizhidic'
    },
    lasttime: {
        type: Date
    },
    createtime: {
        type: Date
    }
})
export default mongoose.model('zhizhi', zhizhi);
