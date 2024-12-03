import { ICategory } from "./ICategory"
import { ILocation } from "./ILocations"

export interface IEvents {
     approved: boolean;
     eventId: number,
     name: string,
     description: string,
     date: string,
     price: number,
     currency: string,
     imageUrl?: string,
     location_id: ILocation,
     category_id: ICategory,
}

export interface IEventsCreate {
     name: string;
     description: string;
     date: string | Date;  // Usaremos el tipo string, aunque puedes manejarlo como Date si lo prefieres
     price: number;
     category_id: number;
     location_id: number;
     currency: string;
     image: string | File;  // El valor será una cadena de base64 o una URL de imagen
     quantityAvailable: number;
   }