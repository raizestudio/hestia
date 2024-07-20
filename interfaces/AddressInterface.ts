import type { CountryInterface, RegionInterface, DepartmentInterface, CityInterface, StreetInterface } from './GeoInterfaces';

export interface AddressTypeInterface {
  id: number;
  name: string;
}

export interface AddressInterface {
  id: number;
  name: string;
  label: string;

  country: CountryInterface;
  department: DepartmentInterface;
  region: RegionInterface;
  city: CityInterface;
  street: StreetInterface;

  address_type: AddressInterface;
}