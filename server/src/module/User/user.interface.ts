export interface IUser {
    name: string;
    photo: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    isBlocked: boolean;
  };
  