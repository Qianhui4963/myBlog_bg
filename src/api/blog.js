import request from '@/utils/request'

// 分页获取文章
export function getBlog(params) {
  return request({
    url: '/api/blog',
    method: 'get',
    params,
  })
}

// 添加文章
export function addBlog(data) {
  return request({
    url: '/api/blog',
    method: 'post',
    data
  })
}

// 编辑文章
export function editBlog(id,data) {
  return request({
    url: '/api/blog/' + id,
    method: 'put',
    data,
  })
}

// 删除文章
export function deleteBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'delete'
  })
}

// 根据id 查找一篇文章
export function findOneBlog(id) {
  return request({
    url: '/api/blog/' + id,
    method: 'get'
  })
}

