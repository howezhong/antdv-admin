import qs from 'qs'

const USER_INFO = {
  admin: {
    id: '1',
    name: 'admin',
    token: 'admin',
    avator: ''
  }
}

export const login = req => {
  req = qs.parse(req.body)
  return {
    status: 200,
    data: USER_INFO[req.username],
    msg: '登录成功'
  }
}

export const logout = () => {
  return null
}
