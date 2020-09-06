import {expect} from '@loopback/testlab'
import {isValidHttpUrl} from '../../utils/url.util'

describe('Url Utils (unit)', () => {


  describe('isValidHttpUrl()', () => {

    it('throws error when no url given', async () => {
      try {
        //@ts-ignore
        isValidHttpUrl(null)
      } catch (err) {
        expect(err).to.eql(Error('must include url param'))
      }
    })

    it('throws error when non http url given', async () => {
      const nonHttpUrl = 'ftp:non-http-url'
      try {
        isValidHttpUrl(nonHttpUrl)
      } catch (err) {
        expect(err).to.eql(Error('encoded url protocol must be http(s)'))
      }
    })

    it('throws error when invalid url given', async () => {
      const invalidUrl = 'invalid-url.fail'
      try {
        isValidHttpUrl(invalidUrl)
      } catch (err) {
        expect(err.message).to.eql(`Invalid URL: ${invalidUrl}`)
      }
    })

    it('returns true when valid http url given', async () => {
      const invalidUrl = 'http:valid-http-url'
      try {
        const isValid = isValidHttpUrl(invalidUrl)
        expect(isValid).to.equal(true)
      } catch (err) {
        throw err
      }
    })

    it('returns true when valid https url given', async () => {
      const invalidUrl = 'https:valid-http-url'
      try {
        const isValid = isValidHttpUrl(invalidUrl)
        expect(isValid).to.equal(true)
      } catch (err) {
        throw err
      }
    })

  })

})
