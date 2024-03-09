export interface ILandCover {
  area_km2: number;
  data: IData;
}

interface IData {
  forest: number;
  shrubland: number;
  sparse_vegetation: number;
  grassland: number;
  wetland: number;
  water: number;
  permanent_snow_and_ice: number;
  bare: number;
  agriculture: number;
  settlements: number;
  no_data: number;
}
