import request from '@/utils/request'
import qs from 'qs'

export function getDetail() {
    return request({
      url: '/mkf/rest/projectInfo/getProjectList?userId=74e52e6d-3e94-43e4-93f4-5ae92c0b4aa7&areaId=128&showRange=1&_t=1638165424158',
      method: 'get',
      headers: {'token' : '9D2F6E7DE6A9506C3B139870797FAB1E'}
    })
}
export function getServersByLevel() {
    return request({
      url: '/servertypes/getServersByLevel',
      method: 'post',
      headers: {}
    })
}
export function getServerLastLevel(data) {
    return request({
      url: '/servertypes/getServerLastLevel',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function getAllServersByName(data) {
    return request({
      url: '/servertypes/getAllServersByName',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function getServersByParams(data) {
    return request({
      url: '/servertypes/getServersByParams',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function getOrder(data) {
    return request({
      url: '/ordernumber/getOrder',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function update(data) {
    return request({
      url: '/ordernumber/update',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function login(data) {
    return request({
      url: '/usertab/login',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function list(data={}) {
    return request({
      url: '/ordernumber/list',
      method: 'post',
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}
export function save(data) {
    return request({
      url: '/ordernumber/save',
      method: 'post',
      data,
    })
}
export function exportExcel(data) {
    return request({
      url: '/ordernumber/exportExcel',
      method: 'post',
      responseType: "blob",
      data: qs.stringify(data),
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
}