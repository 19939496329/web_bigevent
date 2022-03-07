$(function() {
    // 点击去注册
    $('#link_reg').on('click', function() {
            $('.reg-box').show();
            $('.login-box').hide();
        })
        // 点击去登录
    $('#link_login').on('click', function() {
            $('.login-box').show();
            $('.reg-box').hide();
        })
        // 从layUI中获取form对象
    var form = layui.form
    var layer = layui.layer
        // 通过form.verify()函数自定义校验规则
    form.verify({
            // 自定义pwd校验规则
            pwd: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],
            // 校验两次密码是否一致
            repwd: function(value) {
                // 通过形参获取的是确认密码的值
                // 还需要拿到密码框的值
                // 两者进行比对，如果失败，return一个提示框
                var pwd = $('.reg-box [name=password]').val();
                if (pwd != value) return '两次密码不一致！'
            }
        })
        // 注册提交时间
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function(res) {
            if (res.status !== 0) return layer.msg(res.message);
            layer.msg(res.message);
            $('#link_login').click();
        })

    })
    $('#form_login').on('submit', function(e) {
        e.preventDefault();
        $.post('/api/login',
            // 快速获取表单数据    
            $(this).serialize(),
            function(res) {
                if (res.status !== 0) return layer.msg(res.message);
                layer.msg(res.message);
                // 将登陆成功的token值保存在localStorage中
                localStorage.setItem('token', res.token);
                location.href = '/index.html';
            })

    })
})