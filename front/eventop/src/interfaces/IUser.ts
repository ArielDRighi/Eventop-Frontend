export interface IUser {
  userId: number;
  name: srting;
  email: string;
  password: string;
  authProvider: string;
  role: string;
  isBanned: boolean; 
  preferredLanguage: string;
  preferredCurrency: string;
  imageUrl: null;
  createdAt: string;
}
