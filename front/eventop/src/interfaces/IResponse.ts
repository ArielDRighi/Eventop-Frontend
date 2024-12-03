import { ICategory } from "./ICategory.ts";
import { IEvents } from "./IEventos";
import { ILocation } from "./ILocations";


export interface ResponseTypeEvent {
    result: IEvents[] | any,
    loading: boolean,
    error: string
}

export interface ResponseTypeLocation {
    result: ILocation[] | any,
    loading: boolean,
    error: string
}

export interface ResponseTypeCategory {
    result: ICategory[] | any,
    loading: boolean,
    error: string
}