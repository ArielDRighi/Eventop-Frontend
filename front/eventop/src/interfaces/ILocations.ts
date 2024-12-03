export interface ILocation {
  locationId: number;
  city: string;
  state: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface ILocationCreate {
  city: string;
  state: string;
  country: string;
  address: string;
  latitude: number;
  longitude: number;
}
