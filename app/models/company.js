import mongoose from 'mongoose'
const company = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    tags: [String],
    desc: {
        type: String,
    },
    zizhi: [{certno: String, name: {type: String, index: true}, insert_time: Date, expired_time: Date, desc: String}],
    plist: [{name: String, sex: String, idcard: String, regno: String, level: String, innum: Number, ctime: {type: Date, default: Date.now}}]
})
export default mongoose.model('company', company);
