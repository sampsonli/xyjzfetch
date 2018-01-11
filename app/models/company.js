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


    basic: {
        regArea: String, detailAddr: String, post: String, netAddr: String, email: String, gsdjNo: String, dsdjNo: String
    },
    zzjgdmz: {
        zjjgdmzNo: String, validendTime: String
    },
    qyfddbrzs: {
        fddbr: String, idcard: String, zhiwu: String, zhichen: String, phoneNo: String
    },
    qyjbzh: {
        khbank: String, baseNo: String
    },
    lxrxx: {
        lxPerson: String, mphone: String, phone: String
    },
    yyzz: {
        regNo: String, regMoney: String, compType: String, jyScope: String, createDate: String, njDate: String, yyqx: String
    },
    qyzzzs: {
        certNo: String, validDate: String, qyfzr: String, qyfzrzw: String, qyfzrzc: String, jsfzr: String, jsfzrzw: String, jsfzrzc: String, beizhu: String
    },
    anquanxk: {
        ifyllh: String, bianhao: String, xukerange: String, fzjg: String, fzdate: String, enddate: String
    },
    wsjginfo: {
        zjxfgsdz: String, zjxfgsfzr: String, zjxfgsph: String, zjxfgsmph: String, ifbeian: String, xxshzt: String

    },


    zizhi: [{certno: String, name: {type: String, index: true}, insert_time: Date, expired_time: Date, desc: String}],
    plist: [{name: String, sex: String, idcard: String, regno: String, level: String, innum: Number, ctime: {type: Date, default: Date.now}}]
})
export default mongoose.model('company', company);
