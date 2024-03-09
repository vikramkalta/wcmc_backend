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
    * @api {get} /country-names Get track list.
    * @apiName Get track list.
    * @apiGroup Track
    * 
    * @apiSuccess {Boolean} success Determines the status of an API.
    * @apiSuccess {Object} data Data object holding main response data.
    * @apiSuccess {Boolean} data.success Determines operation's result.
    *
    * @apiSuccessExample {json} Success Response:
    *     HTTP/1.1 200 OK
    *     {
    *         "success": true,
    *         "data": [{
    *             "_id": "123",
    *             "trackUrl": "https://.soundcloud.com/dave_the_drummer"
    *         }]
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
    * @api {delete} /track Delete track.
    * @apiName Delete track.
    * @apiGroup Track
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
  // route.delete('/', middlewares.logger, async (req: Request, res: Response, next: NextFunction) => {
  //   try {
  //     const trackService = new TrackService();
  //     const result = await trackService.deleteTrack({ _id: req.body.id });
  //     return res.send(result);
  //   } catch (error) {
  //     log.error('Error in delete track route', error);
  //     return next(error);
  //   }
  // });

  route.post('/bulk-all', middlewares.logger, async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await CountryDataService.createCountryDataBulk(req.body);
      return res.send(result);
    } catch (error) {
      log.error('Error in create country data route', error);
      return next(error);
    }
  });
};