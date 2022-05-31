$(function() {
    // 校验规则
    const form = layui.form
    form.verify({
        nickname:(val) => {
            if(val.length>6) return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    })

    // 获取用户信息
    const initUserInfo = () => {
        $.ajax({
            type: 'GET',
            url : '/my/userinfo',
            data:{},
            success: res => {
                if(res.status !== 0) return layer.mag('获取用户信息失败！')
                // console.log(res);
                // 用form.val()快速给表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    // 重置按钮
    $('#btnReset').on('click',(e) => {
        e.preventDefault()
        initUserInfo()
    })

    // 提交修改内容
    $('.layui-form').submit(function(e) {
        e.preventDefault()
        $.ajax({
            type :'POST',
            url: '/my/userinfo',
            data : $(this).serialize(),
            success: res => {
                // console.log(res);
                if(res.status !==0) return layer.msg('修改用户信息失败！')
                layer.msg('修改用户信息成功！')
                window.parent.getUserInfo()
            }
        })
    })

    initUserInfo()
})