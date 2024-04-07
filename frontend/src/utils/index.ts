export const randomId = () => {
  return Math.random().toString(36).substr(2, 14)
}

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(value)
}
