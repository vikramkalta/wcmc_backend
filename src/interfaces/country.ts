import { IAuditInfo } from './audit-info';
import { IMetric } from './metric';

export interface ICountry {
  _id?: string;
  country: string;
  metrics: IMetric[];
  auditInfo?: IAuditInfo;
}