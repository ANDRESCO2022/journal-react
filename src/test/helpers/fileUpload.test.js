import { v2 as cloudinary } from 'cloudinary'
import { fileUpload } from '../../helpers/fileUpload'
// cloudinary.v2.api
//   .delete_derived_resources(derived_resource_ids, options)
//   .then(callback)

cloudinary.config({
  cloud_name: 'drcdnhdrf',
  api_key: '869165154276855',
  api_secret: 'VpdZKCWFzl8RfLgeb2E2Yo1ALiE',
  secure: true
})

describe('pruebas en fileUpload', () => {
  test('debe de  subir elarchivo correstamente a cloudinary ', async () => {
    const imageUrl =
      'https://miro.medium.com/v2/resize:fit:1200/1*WwnOTbEXlCusYV1Zfcoi_Q.jpeg'
    const resp = await fetch(imageUrl)
    const blob = await resp.blob()
    const file = new File([blob], 'foto.jpg')
    const url = await fileUpload(file)
    expect(typeof url).toBe('string')
    // console.log(`url ${url}`)
    const segments = url.split('/')
    const imageId = segments[segments.length - 1].replace('.jpg', '')
    await cloudinary.api.delete_resources(['journal/' + imageId], {
      resource_type: 'image'
    })
  })
  test('debe  de  retornar null', async () => {
    const file = new File([], 'foto.jpg')
    const url = await fileUpload(file)
    expect(url).toBe(null)
  })
})
