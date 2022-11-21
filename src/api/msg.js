import request from '@/utils/request'

// 分页获取留言
export function getMsgs(params) {
    return request({
        url: "/api/message",
        method: 'get',
        params,
    })
}

// 删除留言
export function deleteMsg(id) {
    return request({
        url: "/api/message/" + id,
        method: 'delete',
    })
}