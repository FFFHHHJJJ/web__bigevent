$(function() {
    const form = layui.form
    const laypage = layui.laypage
    // 定义一个查询的参数对象，将来请求数据的时候
    const q = {
        pagenum	:1,
        pagesize:2,
        cate_id: '',
        state: ''
    }

    // 获取表格数据
    const initTable = () => {
        $.ajax({
            type:'GET',
            url: '/my/article/list',
            data: q,
            success: res => {
                // console.log(res);
                if(res.status !== 0) return layer.msg('获取文章列表失败！')
               const htmlStr = template('tpl-table',res)
               $('tbody').html(htmlStr)
               renderPage(res.total)
            }
        })
    }

    const initCate = () => {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: res => {
                // console.log(res);
                if(res.status !== 0) return layer.msg('获取文章分类失败！')
               const htmlStr = template('tpl-cate',res)
               $('[name=cate_id]').html(htmlStr)
               form.render()
            }
        })
    }

    // 筛选分类数据
    $('#form-search').submit((e) => {
        e.preventDefault()
        q.cate_id = $('[name=cate_id]').val()
        q.state = $('[name=state]').val()
        initTable()
    })

    // 分页
    const renderPage = (total) => {
        // 调用 laypage.render() 方法来渲染分页的结构
        laypage.render({
        elem: 'pageBox', // 分页容器的 Id
        count: total, // 总数据条数
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        limits: [2, 3, 5, 10],
        limit: q.pagesize, // 每页显示几条数据
        curr: q.pagenum, // 设置默认被选中的分页
        jump: (obj,first) => {
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            if(!first) {
                initTable()
            }
        }
        })
    }

    // 删除文章
    $('tbody').on('click','.btn-delete',function() {
        const len = $('.btn-delete').length
        const id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                    // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了,则让页码值 -1 之后,
                    // 再重新调用 initTable 方法
                    // 4
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    initTable()
                }
            })
            layer.close(index)
        })
    })

    initTable()
    initCate()

    // 定义美化时间的过滤器
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)

        var y = dt.getFullYear()
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    // 定义补零的函数
    function padZero(n) {
        return n > 9 ? n : '0' + n
    }
    
})