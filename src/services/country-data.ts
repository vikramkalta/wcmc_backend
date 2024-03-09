import { CountryData } from '../models';
import { ICountry } from '../interfaces/country';
import { IMetric } from '../interfaces/metric';

export default class CountryDataService {
  public static async createCountryDataBulk(
    data: ICountry[],
  ): Promise<{ success: boolean }> {
    await CountryData.model.create(data);
    return { success: true };
  }

  public static async getCountryNames(searchStr: string): Promise<string[]> {
    const result = await CountryData.model
      .find({
        country: { $regex: new RegExp(searchStr), $options: 'i' },
        'auditInfo.active': true,
      })
      .lean();
    return result.map((el: ICountry) => el.country);
  }

  public static async getMetrics(country: string): Promise<IMetric[]> {
    const result = await CountryData.model
      .findOne({
        country: country,
        'auditInfo.active': true,
      })
      .lean();
    return result.metrics;
  }
}
