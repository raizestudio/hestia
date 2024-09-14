import type { UserInterface } from '~/interfaces/UserInterface';

export interface IndependentInterface {
  id: number;
  name: string;
  legal_status: string;
  siret: string;
  siren: string;
  slug: string;
  is_active: boolean;
  creation_date: Date | null;
  created_at: Date | null;
  updated_at: Date | null;
  author: UserInterface | null;
  updated_by: UserInterface | null;
  deleted_at: Date | null;
  restored_at: Date | null;

  phone_numbers: any;
  emails: any;
  members: any;
}