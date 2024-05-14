export function validateFormField(key, value, callback) {
  let error = ''

  if (key === 'name' && !value.trim()) {
    error = 'Tên không hợp lệ'
    // ten bi trung??
  }

  if (key === 'price') {
    if (typeof value === 'string' && !value.trim()) {
      error = 'Giá sản phẩm là trường dữ liệu bắt buộc'
    } else if (value <= 0) {
      error = 'Giá sản phẩm phải lớn hơn 0'
    }
  }

  return callback ? callback(error) : error
}

export function validateFullField(formData) {
  const formError = {}

  const listKeysField = Object.keys(formData) // ['name', 'price', 'discount']

  listKeysField.forEach((key, index) => {
    const value = formData[key]
    formError[key] = validateFormField(key, value)
  })
  console.log('formError', formError)
  return formError
}

export const priceFormatter = ((value, { userTyping = false, input } = {}) => {
  console.log(value, userTyping, input) // '' - false - ''
  if (userTyping) {
    return input;
  }

  if (!value) {
    return ''
  }

  const formattedValue = String(value).replace('.',',').split(',').map((num, idx) => {
    if (idx === 0) {
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num).replace(' ₫', '')
    }

    return num
  }).join(',')

  return formattedValue
})

export const priceParser = formattedValue => {
  // 3.123.124,934
  // replaceAll '.' -> '' 3123124,934
  // replace ',' -> '.' 3123124.934
  return formattedValue.replace(/\./g, '').replace(',', '.')
}

export const isExistError = (formError) => {
  return Object.keys(formError).find(key => formError[key])
}

// export function onChange(event, key, setData, setError) {
//   const value = event.target.value;
//   const error = validateFormField(key, value)

//   setData((data) => ({ ...data, [key]: value }))
//   setError((dataError) => {
//     return { ...dataError, [key]: error }
//   })
// }

export function onChangeCreator(setData, setError) {
  return (event, key) => {
    const value = event.target.value;
    const error = validateFormField(key, value)

    setData((data) => ({ ...data, [key]: value }))
    setError((dataError) => {
      return { ...dataError, [key]: error }
    })
  }
}