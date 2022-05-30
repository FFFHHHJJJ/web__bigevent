// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: 'GET',
        url: '/my/userinfo',
        // headers:{
        //     Authorization: localStorage.getItem('token')
        // },
        success: res => {
            // console.log(res);
            if(res.status !== 0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            renderAvatar(res.data)
        }
    })
}

// 渲染用户信息
const renderAvatar = (user) => {
    // console.log(user);
    let uname = user.nickname || user.username
    // console.log(uname);
    $('#welcome').html(`欢迎${uname}`)
    if(user.user_pic !== null) {
        $('.layui-nav-img').attr('src',user.user_pic)
        $('.text-avatar').hide()
    }else {
        $('.layui-nav-img').hide()
        // console.log(user.username[0]);
        $('.text-avatar').html(user.username[0].toUpperCase())
    }
}


// 退出登录
$('#btnclose').click(() => {
    layer.confirm('是否退出登录?', {icon: 3, title:'提示'}, function(){
        localStorage.removeItem('token')
        location.href = '/login.html'
      });
})

getUserInfo()