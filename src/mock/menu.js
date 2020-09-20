import Mock from 'mockjs'

export const getAllMenus = () => {
  const arrs = Mock.mock({
    'list|12': [
      {
        'id|+1': 1,
        nickname: '@cname()',
        'status|1': [0, 1]
      }
    ]
  })
  return {
    status: 200,
    msg: 'success',
    data: [...arrs.list]
  }
}
