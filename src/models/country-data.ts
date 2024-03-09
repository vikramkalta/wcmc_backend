import { model as _model, Schema } from 'mongoose';

import { ICountry } from '../interfaces';
import { auditSchema } from './common-schema';
import { COLLECTIONS } from '../utility/index';

const schema = new Schema<ICountry>({
  country: { type: String, required: true, unique: true },
  metrics: [],
  auditInfo: auditSchema,
});

schema.pre('save', function (next) {
  this.auditInfo = {
    active: true,
    createdTime: new Date(),
    updatedTime: new Date(),
    archived: false,
  };
  next();
});

schema.index({ country: 'text' });

schema.pre('updateOne', function () {
  this.set({ 'auditInfo.updatedTime': new Date() });
});

const name = COLLECTIONS.COUNTRY_DATA;
const model = _model(name, schema);

export {
  name,
  schema,
  model
}