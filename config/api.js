// const rootUrl = 'http://127.0.0.1:8000/api';
const rootUrl = 'https://www.chunmin.xyz/api';
module.exports = {
  // 注册
  Register: rootUrl + "/register/",
  // 验证码
  Code: rootUrl + "/code/",
  // 登录
  Login: rootUrl + "/login/",
  // 获取模具列表
  Mould_list:rootUrl + "/mould_list/",
  // 获取模具制造信息
  Mould_info: rootUrl + "/mould_info/",
  // 获取模具维修信息
  Mould_ser: rootUrl + "/mould_ser/",
  // 修改密码
  Change: rootUrl + '/change/',
  // Credential: rootUrl + "/oss/credential/",
  // News: rootUrl + "/news/",
  // NewsDetail: rootUrl + "/news/", // 后面加ID
  // Comment:rootUrl + '/comment/',
  
}