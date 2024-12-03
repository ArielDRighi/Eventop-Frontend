export interface IUser {
  userId: number;
  name: string;
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

export interface IUserProfile {
  userId: number;
  name: string;
  email: string;
  authProvider: string;
  role: number;
  password: string;
  isBanned: boolean; 
  preferredLanguage: string;
  preferredCurrency: string;
  imageUrl?: string;
  createdAt: string;
}

  export interface IUserEdit {}