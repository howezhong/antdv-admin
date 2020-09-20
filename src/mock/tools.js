export const pagination = (data, arrs) => {
  const page = data.page || 1
  const pageSize = data.pageSize || 15
  const offset = (page - 1) * pageSize
  return offset + pageSize >= arrs.length
    ? arrs.slice(offset, arrs.length)
    : arrs.slice(offset, offset + pageSize)
}
