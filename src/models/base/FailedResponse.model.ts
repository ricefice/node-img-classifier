import {model, property} from '@loopback/repository';
import {BaseResponse} from '../index';

@model()
export class FailedResponse extends BaseResponse {

  @property() error: string;

  constructor(data?: Partial<FailedResponse>) {
    super(data);
  }
}
