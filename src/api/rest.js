import request from '@/utils/request'


export function getDetail() {
    return request({
      url: '/mkf/rest/projectInfo/getProjectList?userId=74e52e6d-3e94-43e4-93f4-5ae92c0b4aa7&areaId=128&showRange=1&_t=1638165424158',
      method: 'get',
      headers: {'token' : 'D52428C879AC5619D6CCC153A1089BC6'}
    })
}