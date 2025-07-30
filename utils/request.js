//request封装
module.exports = (vm) => {
    uni.$u.http.setConfig((config) => {
		// #ifndef H5
			config.baseURL = 'http://uat.banlu.xuexiluxian.cn'; /* 根域名 */
		// #endif
        return config
    })
	
	// 请求
	uni.$u.http.interceptors.request.use((config) => {
	    return config 
	}, config => {
	    return Promise.reject(config)
	})	
	
	// 响应
	uni.$u.http.interceptors.response.use((response) => {
		const data = response.data
		return data === undefined ? {} : data
	}, (response) => { 
		// 响应错误（statusCode !== 200）
		return Promise.reject(response)
	})
}