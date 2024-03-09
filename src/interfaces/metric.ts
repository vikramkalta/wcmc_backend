import { ILandCover } from './land-cover';
import { IProtectedAreas } from './protected-areas';

export interface IMetric {
  _id?: string;
  name: string;
  results: ILandCover | IProtectedAreas;
}
