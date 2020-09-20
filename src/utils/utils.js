/**
 * @param {Array} routes 通过路由列表得到菜单列表
 * @returns {Array}
 */
export function getMenuByRouter (routes) {
  let arrs = []
  for (let i = 0, len = routes.length; i < len; i++) {
    const item = routes[i]
    if (item.path === '*' || (item.meta && item.meta.hidden)) continue
    if (item.path === '/' && hasChild(item)) {
      arrs = getMenuByRouter(item.children)
    } else {
      arrs.push({
        path: item.path,
        name: item.name,
        meta: item.meta,
        children: hasChild(item) ? getMenuByRouter(item.children) : []
      })
    }
  }
  return arrs
}

export const hasChild = (item) => {
  return item.children && item.children.length !== 0
}
