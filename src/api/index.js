import { message } from "ant-design-vue";

const api = window.$vueApp.$http.create({
  baseURL: "http://127.0.0.1:4523/m1/1379808-0-default/",
  timeout: 3000,
});

// 请求相关处理 请求拦截 在请求拦截中可以补充请求相关的配置
// interceptors axios的拦截器对象
api.interceptors.request.use(
  (config) => {
    // config 请求的所有信息
    // console.log(config);
    return config; // 将配置完成的config对象返回出去 如果不返回 请求讲不会进行
  },
  (err) => {
    // 请求发生错误时的相关处理 抛出错误
    Promise.reject(err);
  }
);

api.interceptors.response.use(
  (res) => {
    if (res.status >= 200 && res.status < 300) {
      return Promise.resolve(res);
    }

    return Promise.reject(res);
  },
  (err) => {
    console.log(err);
    if (err.response && err.response.data.status) {
      // 服务端处理错误
      message.error("请求错误：" + err.response.data.message);
    } else if (err.response && err.response.statusText) {
      message.error("请求失败：" + err.response.statusText);
    } else {
      message.error("网络错误：" + err.message + "(" + err.config.url + ")");
    }

    // 服务器响应发生错误时的处理
    Promise.reject(err);
  }
);

export default api;
