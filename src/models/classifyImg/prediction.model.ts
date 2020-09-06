import {Model, model, property} from '@loopback/repository';

@model()
export class Prediction extends Model {

  @property() className: string;

  @property() probability: number;

  constructor(data?: Partial<Prediction>) {
    super(data);
  }
}
