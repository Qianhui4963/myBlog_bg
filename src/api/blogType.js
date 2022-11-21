import request from '@/utils/request'


// 获取博客分类
export function getBlogType() {
    return request({
        url: '/api/blogtype',
        method: 'get'
    })
}

// 添加博客分类
export function addBlogType(data) {
    return request({
        url: '/api/blogtype',
        method: 'post',
        data,
    })
}

// 删除博客分类
export function deleteBlogType(id) {
    return request({
        url: '/api/blogtype/' + id,
        method: 'delete'
    })
}

// 修改博客分类
export function setBlogType(id, data) {
    return request({
        url: '/api/blogtype/' + id,
        method: 'put',
        data,
    })
}
