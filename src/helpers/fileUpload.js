export const fileUpload = async file => {
  // if (!file) throw new Error('no existe  archivo adjunto ')
  if (!file) return null
  const cloudUrl = 'https://api.cloudinary.com/v1_1/drcdnhdrf/upload'
  const formData = new FormData()
  formData.append('upload_preset', 'react-journal')
  formData.append('file', file)
  try {
    const resp = await fetch(cloudUrl, {
      method: 'POST',
      body: formData
    })

    if (!resp.ok) throw new Error('no se subio la  imagen')
    const cloudResp = await resp.json()

    return cloudResp.secure_url
  } catch (error) {
    // throw new Error('error.message')
    return null
  }
}
