export const isValidHttpUrl = (url: string): boolean => {
  if (!url) {
    throw new Error('must include url param')
  }
  try {
    const encodedUrl = new URL(url)
    if (['http:', 'https:'].includes(encodedUrl.protocol) === false) {
      throw new Error('encoded url protocol must be http(s)')
    }
    return true
  } catch (e) {
    throw e
  }
}
