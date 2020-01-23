import fetch from '@/api/fetch'

export const uploadImage = (file: File) => {
  const formData = new FormData()
  formData.append('image', file)
  return fetch('image-upload', {
    body: formData,
    method: 'POST'
  })
}
