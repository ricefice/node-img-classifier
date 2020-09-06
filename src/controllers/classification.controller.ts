import {inject} from '@loopback/core';
import {get, param, post, Request, requestBody, Response, RestBindings} from '@loopback/rest';
import multer from 'multer';
import {getMobileNetPredictions} from '../mobilenet/MobileNetModel';
import {FailedResponse} from '../models';
import {ClassifyImgResponse} from '../models/classifyImg/classifyImgResponse.model';
import {Prediction} from '../models/classifyImg/prediction.model';
import {getCanvasedImgFromUri} from '../utils/image.util';

// TODO: add strict typing
export class MobilenetController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) {}

  @get('/classify')
  async classifyWebImage(
    @param.query.string('url') url?: string,
    @param.query.string('model') model = 'mobilenet',
    @param.query.string('version') version = 1
  ): Promise<ClassifyImgResponse | FailedResponse> {
    try {
      const htmlCanvasedImg = await getCanvasedImgFromUri(`${url}`)
      const options = {model, version}
      const predictions = await getMobileNetPredictions(htmlCanvasedImg, options)
      return new ClassifyImgResponse({
        success: true,
        code: 200,
        predictions: predictions as Prediction[],
      })
    } catch (err) {
      return new FailedResponse({
        success: false,
        code: 500,
        error: err.message
      })
    }
  }

  @post('/classify')
  async classifyUploadedImage(
    @requestBody({
      description: 'multipart/form-data',
      required: true,
      content: {
        'multipart/form-data': {
          'x-parser': 'stream',
          schema: {type: 'object'},
        },
      },
    })
    request: Request,
    @inject(RestBindings.Http.RESPONSE) response: Response,
  ): Promise<ClassifyImgResponse | FailedResponse> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});
    return new Promise((resolve, reject) => {
      try {
        console.log('getting uploaded file...')
        //@ts-ignore
        return upload.any()(request, response, async (err: any) => {
          if (err) {
            reject(new FailedResponse({
              success: false,
              code: 500,
              error: err.message
            }))
          }
          //@ts-ignore
          console.log('request.files ', request.files)
          //@ts-ignore
          const uploadedImg = request.files[0]
          const {fieldname, originalname, mimetype, buffer, size} = uploadedImg
          const htmlCanvasedImg = await getCanvasedImgFromUri(buffer, true)
          const predictions = await getMobileNetPredictions(htmlCanvasedImg, {model: 'mobilenet', version: 1})
          console.log(`predictions: ${JSON.stringify(predictions)}`)

          resolve(new ClassifyImgResponse({
            success: true,
            code: 200,
            predictions: predictions
          }))
        });
      } catch (err) {
        reject(new FailedResponse({
          success: false,
          code: 500,
          error: err.message
        }))
      }
    })
  }


}
