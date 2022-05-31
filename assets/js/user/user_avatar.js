$(function() {
// 1.1 获取裁剪区域的 DOM 元素
const $image = $('#image')
// 1.2 配置选项
const options = {
  // 纵横比
  aspectRatio: 1,
  // 指定预览区域
  preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

// 模拟点击上传
$('#btnChooseImage').click(function() {
    $('#file').click()
})

// 上传文件触发change事件
$('#file').change((e) => {
    // console.log(e);
    const fileLength = e.target.files.length
    if(fileLength == 0) return

    const file = e.target.files[0]
    const imgURL = URL.createObjectURL(file)
    $image
        .cropper("destroy") // 销毁旧的裁剪区域
        .attr("src", imgURL) // 重新设置图片路径
        .cropper(options); // 重新初始化裁剪区域
})

// 上传头像
$('#btnUpload').click(() => {
// 1、拿到用户裁切之后的头像
    // 直接复制代码即可
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png")

    $.ajax({
        type: 'POST',
        url:'/my/update/avatar',
        data:{
            avatar:dataURL
        },
        success: res => {
            if(res.status !==0 ) return layer.msg('上传图片失败!')
            // layer.msg('上传图片成功!')
            window.parent.getUserInfo()
        }
    })

})





})