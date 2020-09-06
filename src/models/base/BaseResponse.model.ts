import {Model, model, property} from '@loopback/repository';

@model()
export class BaseResponse extends Model {

  @property() success: boolean;

  @property() code: number;

  constructor(data?: Partial<BaseResponse>) {
    super(data);
  }
}
