$(function() {
        // 调用函数获取用户基本信息
        getUserInfo()
        var layer = layui.layer;
        // 退出登录
        $('#btnLogout').on('click', function() {
            layer.confirm('确定要退出登录吗？', {
                title: '提示',
                icon: 3
            }, function(index) {
                //按钮【确定】的回调
                // 清空存储
                localStorage.removeItem('token');
                // 重新跳转至登录页
                location.href = '/login.html';
                // 关闭弹出层
                layer.close(index)
            });

        })
    })
    // 获取用户基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 获取请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取个人信息失败！')
            } else {
                console.log(res);
                renderAvatar(res.data)
            }
        },
        // 无论成功和失败都会被调用
        // complete: function(res) {
        //     console.log(res)
        //         // complete可以使用res.responseJSON拿到服务器响应的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //             // 强制跳转至登录
        //         location.href = "/login.html";
        //     }
        // }
    })
}
// 渲染头像
function renderAvatar(user) {
    // 如果有昵称显示昵称，没有昵称显示用户名
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎  " + name);
    if (user.user_pic !== null) {
        $('.layui-nav-img').attr('src', user.pic).show();
        $('.text-avatar').hide();
    } else {
        $('.layui-nav-img').hide();
        // 获取字符串第一个字符name[0]
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}