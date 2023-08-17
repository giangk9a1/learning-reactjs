export function validateFormData(key, value) {
  if (key === 'price') return ''

  let error = ''
  const isValueEmpty = !value.trim()
  const transformValue = value.replace(',', '.')

  if (key === 'name' && isValueEmpty) {
    error = 'Tên không hợp lệ'
  }

  // if (key === 'price') {
    
  //   if (isValueEmpty) {
  //     error = 'Giá sản phẩm là trường dữ liệu bắt buộc'
  //   } else if (isNaN(Number(transformValue))) {
  //     error = 'Giá sản phẩm không hợp lệ'
  //   } else if (Number(transformValue) <= 0) {
  //     error = 'Giá sản phẩm phải lớn hơn 0'
  //   }
  // }

  if (key === 'discount' && !isValueEmpty) {
    if (isNaN(Number(transformValue))) {
      error = 'Phần trăm giảm giá sản phẩm không hợp lệ'
    } else if (Number(transformValue) < 0 || Number(transformValue) > 100) {
      error = 'Phần trăm giảm giá phải nằm trong khoảng 0 -> 100'
    }
  }

  return error
}

export function transformFormValue(key, value, error) {
  if (error) {
    return value
  }

  if (['discount'].includes(key)) {
    if (value.includes(',')) {
      return Number(value.replace(',', '.'))
    }
    return Number(value)
  }

  // Defaul la string. Khong bien doi gi ca
  return value
}