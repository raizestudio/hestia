export interface AgencyInterface {
  id: number;
  name: string;
  legal_status: string;
  siret: string;
  siren: string;
  creation_date: string;
  slug: string;

  phone_numbers: any;
  emails: any;
  group_pro: string;
  members: any;
}