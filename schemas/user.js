const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true, //필수
    unique: true, //중복방지
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);


// UserSchema.virtual("userId").get(function () { //가상의 userId 값을 할당
//   return this._id.toHexString(); //_id는 기본 키
// });

// UserSchema.set("toJSON", { // user 정보를 Json으로 형변화할때 userId의 virtual값이 출력
//   virtuals: true,
// });