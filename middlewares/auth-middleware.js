const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies; // 쿠키 정보 받기 (Bearer awer.ewrwawr.weraer)
  const [authType, authToken] = (Authorization ?? "").split(" "); // authorization 쿠기가 존재하지 않았을 때를 대비해서 에러를 주지 않고, ""로 대체 (authtype에 bearer, authtoken에 뒷부분 할당)

  // authType이 Bearer값인지 확인하고 authToken 검증
  if (!authToken || authType !== "Bearer") { 
    res.status(403).send({
      errorMessage: "로그인이 필요한 기능입니다.",
    });
    return;
  }

  try {
    const { nickname } = jwt.verify(authToken, "mysecretkey"); // authToken 만료 여부, 발급 토큰 여부 확인
    const user = await User.findOne({ nickname }); // 실제 db에 사용자 존재 여부 확인
    res.locals.user = user;
    next(); // 다음 미들웨어로
  } catch (err) {
    console.error(err);
    res.status(403).send({
      errorMessage: "전달된 쿠키에서 오류가 발생하였습니다.",
    });
    return;
  }
};
