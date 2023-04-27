const express = require("express");
const router = express.Router();
const User = require("../schemas/user");
const jwt = require("jsonwebtoken");

// 로그인 api
router.post("/login", async (req, res) => {
    try {
      const { nickname, password } = req.body; // 바디에서 닉네임과 비번을 받아온다

      // pw와 pw확인 + 닉네임 존재 확인
      const user = await User.findOne({ nickname }); // 닉네임 일치 유저 찾기
      if (!user || password !== user.password) {
        res.status(412).json({errorMessage: "닉네임 또는 패스워드를 확인해주세요."});
        return; // 걸리면 더이상의 코드 진행 멈추기 위함
      }
  
      const token = jwt.sign(
        { nickname: user.nickname }, "mysecretkey"
      );
  
      res.cookie("Authorization", `Bearer ${token}`); // JWT를 Cookie로 할당
      res.status(200).json({ token }); // JWT를 Body로 할당
    } catch (err) {
      res.status(400).json({
        errorMessage: "로그인에 실패하였습니다.",
      });
    }
  });

//   const user = await User.findOne({ 
//     $or: [{nickname}, {email}], // 이메일 또는 닉네임이 일치할 때 조회한다
// });

// const user = new userSchema({email, nickname, password});
// await user.save(); // db에 저장


// -------------------------------------------------------------------------------
// 회원가입 api
router.post("/signup", async (req, res) => {
  const { nickname, password, confirm } = req.body;
  try {
    if (password !== confirm) {
      res.status(412).json({errorMessage: "패스워드가 일치하지 않습니다."});
      return;
    }

    // nickname 중복
    const existsUsers = await User.findOne({ nickname });
    if (existsUsers) {
      res.status(412).json({errorMessage: "중복된 닉네임입니다."});
      return;
    }

    //닉네임 조건
    const nicknameFilter = /^[A-Za-z0-9]{3,}$/.test(nickname);
    if (!nicknameFilter) {
      res.status(412).json({errorMessage: "닉네임의 형식이 일치하지 않습니다."});
      return;
    }

    //패스워드 길이조건
    if (password.length < 4) {
      res.status(412).json({errorMessage: "패스워드 형식이 일치하지 않습니다."});
      return;
    }

    //패스워드 형식조건
    if (password.includes(nickname)) {
      res.status(412).json({errorMessage: "패스워드에 닉네임이 포함되어 있습니다."});
      return;
    }

    const user = new User({ nickname, password });
    await user.save();
    res.status(201).json({ message: "회원 가입에 성공하였습니다." });
  } catch (err) {
    res.status(400).json({errorMessage: "요청한 데이터 형식이 올바르지 않습니다."});
  }
});


module.exports = router;