import { type UserInterface } from "@/interfaces/UserInterface";
export interface AuthenticateResponse {
  id: number;
  session: string;
  created_at: string;
  updated_at: string;
  user: UserInterface;
  token: string;
  refresh: string;
}