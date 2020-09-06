import * as mobilenet from '@tensorflow-models/mobilenet';
import {Prediction} from '../models/classifyImg/prediction.model';


export default class MobileNetModel {

  private static model: mobilenet.MobileNet

  private constructor() {}

  static async getModel() {
    if (MobileNetModel.model) {
      console.log('model already loaded')
      return this.model
    }
    return mobilenet.load().then((model) => {
      this.model = model
      console.log(`mobilenet model loaded successfully`)
      return this.model
    }).catch((err) => {
      const errMsg = `err while loading mobilenet model: ${err.message}`
      console.error(errMsg)
      throw errMsg
    })
  }
}

export async function getMobileNetPredictions(
  img: HTMLCanvasElement,
  options: {model: string, version: number}) {
  const {model, version} = options
  console.log(`loading model: ${model} version: ${version}...`)
  try {
    const model: void | mobilenet.MobileNet = await MobileNetModel.getModel()
    if (!model) throw new Error('failed to load model')
    console.log(`classifying img ...`)
    const predictions = await model.classify(img)
    console.log(`img classified successfully: ${JSON.stringify(predictions)}`)
    return predictions as Prediction[]
  } catch (err) {
    console.error(err)
    throw new Error(err)
  }
}

