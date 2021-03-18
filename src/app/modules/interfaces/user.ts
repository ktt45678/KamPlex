export interface IUser {
  _id: number;
  username: string;
  email: string;
  displayName?: string;
  dateOfBirth: string;
  role: string;
  new: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStorage {
  uri?: string;
}

export interface IToken {
  accessToken: string;
  refreshToken: string;
}
