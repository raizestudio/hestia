import type { CountryInterface } from "~/interfaces/GeoInterfaces";

export interface PhoneNumberTypeInterface {
  id: number;
  name: string;
}

export interface PhoneNumberInterface {
  id: number;
  country_code: string;
  number: string;
  label: string;
  type: PhoneNumberTypeInterface[];
  country: CountryInterface;
}