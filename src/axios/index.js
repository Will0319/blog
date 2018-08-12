import JsonP from 'jsonp';

export default class Axios {
    // 跨域请求
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: ''
            }, function (err, response) {
                if (response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
                }
            })
        })
    }
}