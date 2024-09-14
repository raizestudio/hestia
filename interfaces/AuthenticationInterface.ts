import type { UserInterface } from './UserInterface';

export interface TokenInterface {
  token: string;
  user: UserInterface;
  created_at: string;
  updated_at: string;
}

export interface RefreshInterface {
  refresh: string;
  user: UserInterface;
  created_at: string;
  updated_at: string;
}