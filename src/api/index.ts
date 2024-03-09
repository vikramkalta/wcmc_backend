import { IRouter, Router } from 'express';
import countryData from './routes/country-data';

// guaranteed to get dependencies
export default (): IRouter => {
  const app = Router();
  countryData(app);
  return app;
}