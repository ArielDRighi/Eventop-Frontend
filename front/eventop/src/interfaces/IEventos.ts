export interface IEvent {
  eventId: number;
  name: string;
  date: string;
  description: string;
  imageUrl: string;
  category_id: {
    categoryId: number;
    name: string;
  };
  location_id: {
    locationId: number;
    city: string;
    state: string;
    country: string;
    address: string;
  };
  price: string;
  quantityAvailable: number;
  quantitySold: number;
  quantityTotal: number;
  approved: boolean;
  currency: string;
  user: {
    userId: number;
    name: string;
    email: string;
    password: string;
    authProvider: string;
    role: string;
    preferredLanguage: string;
    preferredCurrency: string;
    imageUrl: string;
    createdAt: string,
    isBanned: boolean,
    banReason: null,
    banUntil: null
  }
}

export interface IEventsCreate {
  name: string;
  description: string;
  date: string | Date; // Usaremos el tipo string, aunque puedes manejarlo como Date si lo prefieres
  price: number;
  category_id: number;
  location_id: number;
  currency: string;
  image: string | File; // El valor será una cadena de base64 o una URL de imagen
  quantityAvailable: number;
}
