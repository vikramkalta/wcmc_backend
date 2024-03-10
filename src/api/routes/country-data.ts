import { Router, Request, Response, NextFunction } from 'express';
import { celebrate, Joi } from 'celebrate';

import { createBunyanLogger } from '../../loaders/logger';
import middlewares from '../middlewares/index';
import CountryDataService from '../../services/country-data';

const route = Router();
const log = createBunyanLogger('User routes');

export default (app: Router): void => {
  app.use('/country-data', route);

  /**
    * @api {get} /countries Get countries list.
    * @apiName Get countries list.
    * @apiGroup CountryData
    * 
    * @apiSuccess {Boolean} success Determines the status of an API.
    * @apiSuccess {Object} data Data object holding main response data.
    * @apiSuccess {Boolean} data.success Determines operation's result.
    *
    * @apiSuccessExample {json} Success Response:
    *     HTTP/1.1 200 OK
    *     {
    *         "success": true,
    *         "data": ['United Kingdom', 'United States of America', 'Estonia']
    *     }
   */
  route.get('/countries', middlewares.logger, middlewares.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CountryDataService.getCountryNames(req.query.prefix as string);
      return res.send(result);
    } catch (error) {
      log.error('Error in get tracks route', error);
      return next(error);
    }
  });

  /**
    * @api {get} /metrics Get metrics.
    * @apiName Get metrics.
    * @apiGroup CountryData
    * 
    * @apiSuccess {Boolean} success Determines the status of an API.
    * @apiSuccess {Object} data Data object holding main response data.
    * @apiSuccess {Boolean} data.success Determines operation's result.
    *
    * @apiSuccessExample {json} Success Response:
    *     HTTP/1.1 200 OK
    *     {
    *         "success": true,
    *         "data": [{}]
    *     }
   */
  route.get('/metrics', middlewares.logger, middlewares.authMiddleware, celebrate({
    query: Joi.object({
      country: Joi.string().required(),
    }).options({ allowUnknown: true }),
  }), async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CountryDataService.getMetrics(req.query.country as string);
      return res.send(result);
    } catch (error) {
      log.error('Error in get tracks route', error);
      return next(error);
    }
  });

  /**
    * @api {post} /bulk-all Create country data in bulk
    * @apiName Create country data in bulk
    * @apiGroup CountryData
    * 
    * @apiSuccess {Boolean} success Determines the status of an API.
    * @apiSuccess {Object} data Data object holding main response data.
    * @apiSuccess {Boolean} data.success Determines operation's result.
    *
    * @apiSuccessExample {json} Success Response:
    *     HTTP/1.1 200 OK
    *     {
    *         "success": true,
    *         "data": {
    *             "success": true
    *         }
    *     }
   */
  route.post('/bulk-all', middlewares.logger, middlewares.authMiddleware, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CountryDataService.createCountryDataBulk(req.body);
      return res.send(result);
    } catch (error) {
      log.error('Error in create country data route', error);
      return next(error);
    }
  });
};