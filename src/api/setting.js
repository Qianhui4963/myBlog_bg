import request from '@/utils/request'

// 获取网站全局设置信息
export function getSettingInfo() {
  return request({
    url: '/api/setting',
    method: 'get',
  })
}

// 获取网站全局设置信息
export function setSettingInfo(data) {
  return request({
    url: '/api/setting',
    method: 'put',
    data,
  })
}
