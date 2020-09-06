import {createCanvas, loadImage} from 'canvas';
import {isValidHttpUrl} from './url.util';

export const getCanvasedImgFromUri = async (urlOrBuffer: string, isFromBuffer = false): Promise<HTMLCanvasElement> => {
  if (!urlOrBuffer) {
    throw new Error(`must include ${isFromBuffer ? 'buffer' : 'remote url'} param`)
  }
  if (!isFromBuffer) {
    try {
      isValidHttpUrl(urlOrBuffer)
    } catch (err) {
      throw err
    }
  }
  console.log(`loading image from ${isFromBuffer ? 'buffer' : `url: ${urlOrBuffer}`}`)
  //@ts-ignore
  return loadImage(urlOrBuffer).then((loadedImg: any) => {
    console.log(`img successfully loaded. width: ${loadedImg.width} height:${loadedImg.height}`)
    const canvas = createCanvas(loadedImg.width, loadedImg.height)
    console.log(`canvas created: ${canvas}`)
    const ctx = canvas.getContext('2d')
    console.log(`context gotten: ${ctx}`)
    ctx.drawImage(loadedImg, 0, 0)
    return canvas
  }).catch((err: Error) => {
    throw new Error(`err while loading img into canvas: ${err.message}`)
  })
}

