import { post } from '@/utils/axios'

export const uploadFile = data => {
  return post('upload', data, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// 调用
// uploadFile (e) {
//   const formdata = new FormData()
//   formdata.append('oss', e.oss)
//   formdata.append('file', formdata.get('file'))
//   uploadFile(formdata)
// }
