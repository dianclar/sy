const http = uni.$u.http
//微信登录
export const loginByWechat = (data) => http.get('/u/loginByWechat', {params:data})
//注册
export const register = (data) => http.post('/u/wechat/register', data)
//请求验证码
export const sendRegisterOrLoginCaptcha = (data) => http.get('/captcha/sendRegisterOrLoginCaptcha', {params:data})
//验证码登录
export const loginByMobile = (data) => http.post('/u/loginByMobile', data)
