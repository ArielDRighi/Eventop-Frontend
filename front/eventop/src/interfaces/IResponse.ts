import { ICategory } from "./ICategory";
import { IEvent } from "./IEventos";
import { ILocation } from "./ILocations";

export interface ResponseTypeEvent {
  result: IEvent[] | any;
  loading: boolean;
  error: string;
}

export interface ResponseTypeLocation {
  result: ILocation[] | any;
  loading: boolean;
  error: string;
}

export interface ResponseTypeCategory {
  result: ICategory[] | any;
  loading: boolean;
  error: string;
}
