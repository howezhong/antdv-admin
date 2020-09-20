import { get } from '@/utils/axios'

/**
 * 获取所有菜单
 */
export const getAllMenus = () => {
  return get('v1.0/menus')
}
