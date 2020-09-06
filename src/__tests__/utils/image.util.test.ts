import {expect} from '@loopback/testlab'
import {getCanvasedImgFromUri} from '../../utils/image.util'

describe('Image Utils (unit)', () => {


  describe('getCanvasedImgFromUri()', () => {

    it('throws error when no remote url given', async () => {
      try {
        //@ts-ignore
        await getCanvasedImgFromUri(null)
      } catch (err) {
        expect(err).to.eql(Error('must include remote url param'))
      }
    })

    it('throws error when invalid url given and isBuffer param not set', async () => {
      const invalidUrl = 'htp:invalid-url'
      try {
        await getCanvasedImgFromUri(invalidUrl, false)
      } catch (err) {
        expect(err).to.eql(Error('encoded url protocol must be http(s)'))
      }
    })

    it('throws error when no buffer param given and isBuffer param set', async () => {
      try {
        //@ts-ignore
        await getCanvasedImgFromUri(null, true)
      } catch (err) {
        expect(err).to.eql(Error('must include buffer param'))
      }
    })

    // beforeEach(() => getCanvasedImgFromUri = sinon.stub)
    // afterEach(() => getCanvasedImgFromUri.reset())

    // it('gives HTMLCanvasElement given remote url for image', () => {
    //   const validMockRemoteImageUrl = 'https://valid-mock-remote-image.jepg'
    //   // const canvasImg = getCanvasedImgFromUri(validRemoteImageUrl)
    //   // const stub = sinon.stub(getCanvasedImgFromUri(validMockRemoteImageUrl))
    // })
  })

})

