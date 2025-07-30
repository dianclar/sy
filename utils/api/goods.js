const http = uni.$u.http
//微信登录
export const page = (data) => http.get('/mall/goods/page', {params:data})
