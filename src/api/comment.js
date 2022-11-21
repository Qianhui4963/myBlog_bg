import request from '@/utils/request'

// 分页获取评论
export function getComments(params) {
    return request({
        url: '/api/comment',
        method: 'get',
        params,
    })
}

// 删除评论
export function deleteComment(id) {
    return request({
        url: '/api/comment/' + id,
        method: 'delete',
    })
}