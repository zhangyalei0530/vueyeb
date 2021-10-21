import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'

// 响应拦截器
axios.interceptors.response.use(sussess => {
    //业务逻辑错误
    if (sussess.status && sussess.status == 200) {
        if (sussess.data.code == 500 || sussess.data.code == 401 || sussess.data.code == 403) {
            Message.error({ message: sussess.data.message });
            return;
        }
        if (sussess.data.message) {
            Message.success({ message: sussess.data.message });

        }
    }
    return sussess.data;
}, error => {
    if (error.response.code == 504 || error.response.code == 404) {
        Message.error({ message: '服务器被吃了，囧' });
    } else if (error.response.code == 403) {
        Message.error({ message: '权限不足，请联系管理员' });
    } else if (error.response.code == 401) {
        Message.error({ message: '尚未登录，请先登录' });
        router.replace('/');
    } else {
        if (error.response.data.message) {
            Message.error({ message: error.response.data.message });
        } else {
            Message.error({message: '未知错误！'})
        }
    }
    return;
})
// https://www.fastmock.site/mock/193583abb772ed7a66234f6fdfe6fcf3/yeb/captcha
let base = 'https://www.fastmock.site/mock/193583abb772ed7a66234f6fdfe6fcf3/yeb';
// 传送json格式的post请求
export const postRequest = (url, params) => {
    return axios({
        method: 'post',
        url: '${base}${url}',
        data: params
    })
}