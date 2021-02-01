const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
    id: {
        type: String,
        unique: true,
    },
    name: String,
    numberOfCredit: Number,
    schedule:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'learn',
    }],

});

module.exports = mongoose.model('subject',subjectSchema);


// {
//     _id: "INT1303",
//     tenMon: "	An toàn và bảo mật hệ thống thông tin",
//     soTinChi: 3,
//     maLop: "D18-106",
//     lichHoc: [
//       {
//         thu: 2,   // thứ bắt đầu từ 0
//         tietBatDau: 9,
//         soTiet: 4,
//         phong: "409-A3",
//         tuan: "-----------2",
//         thucHanh: true,
//       },
//       {
//         thu: 4,   // thứ bắt đầu từ 0
//         tietBatDau: 11,
//         soTiet: 2,
//         phong: "409-A3",
//         tuan: "-----------234567",
//         thucHanh: false,
//       },
//       {
//         thu: 4,   // thứ bắt đầu từ 0
//         tietBatDau: 9,
//         soTiet: 2,
//         phong: "409-A3",
//         tuan: "---456789012345678",
//         thucHanh: false,
//       },
//     ],
//   },