// 每次调用$.get() $.post() $.ajax()都会先调用ajaxPrefilter函数
$.ajaxPrefilter(function(options) {
    // 在发起ajax请求之前，统一拼接请求的根路径
    options.url = 'http://www.liulongbin.top:3007' + options.url;
    // 只有包含/my的路径才需要添加请求头
    if (options.url.indexOf('/my') !== -1) {
        // 统一为有权限的接口，设置headers请求头
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    // 无论成功和失败都会被调用
    options.complete = function(res) {
        // console.log(res)
        // complete可以使用res.responseJSON拿到服务器响应的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 强制清空token
            localStorage.removeItem('token')
                // 强制跳转至登录
            location.href = "/login.html";
        }
    }
})