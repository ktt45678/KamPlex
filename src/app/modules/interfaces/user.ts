export interface User {
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

export interface Storage {
  uri?: string;
}

export interface Token {
  accessToken: string;
  refreshToken: string;
}
