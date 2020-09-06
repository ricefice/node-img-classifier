import {model, property} from '@loopback/repository';
import {BaseResponse} from '../base/BaseResponse.model';
import {Prediction} from './prediction.model';

@model()
export class ClassifyImgResponse extends BaseResponse {

  @property.array(Prediction, {
    name: 'predictions',
    required: true
  })
  predictions: Prediction[]

  constructor(data?: Partial<ClassifyImgResponse>) {
    super(data);
  }
}
