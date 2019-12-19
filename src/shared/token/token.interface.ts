
export interface Token {
  id: number;
  email: string;
}

export type TokenWithExpiration = Token & { iat: number; exp: number };
