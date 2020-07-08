const rootUrl = 'http://127.0.0.1:8000/api';
// const rootUrl = 'https://www.chunmin.xyz/api';
module.exports = {
  // 登录
  Login: rootUrl + "/login/",
  // 获取订单信息
  Order:rootUrl + "/order/",
  // 获取订单对应的模具列表
  Mould_list: rootUrl + "/mould_list/",
  Mould_detail: rootUrl + "/mould_detail/"
}