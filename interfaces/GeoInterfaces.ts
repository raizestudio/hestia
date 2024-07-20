export interface CountryInterface {
  iso_name: string;
  name: string;
  short_name: string;
  numeric_code: string;
  alpha_3_code: string;
  alpha_2_code: string;
  subdivision_code: string;
  tld: string;
  is_independent: boolean;
  continent: string;
  owner_countries: string;
}

export interface RegionInterface {
  id: number;
  name: string;
  abbreviation: string;
  alpha_3_code: string;
  alpha_2_code: string;
  iso_3166_2_code: string;
  insee_code: string;
  slug: string;
  country: string;
}

export interface DepartmentInterface {
  id: number;
  name: string;
  abbreviation: string;
  alpha_3_code: string;
  alpha_2_code: string;
  iso_3166_2_code: string;
  insee_code: string;
  slug: string;
  region: number;
}

export interface CityInterface {
  id: number;
  name: string;
  zip_code: string;
  postal_code: string;
  city_type: string;
  slug: string;

  region: number;
  department: number;
}

export interface StreetLabelInterface {
  id: number;
  name: string;
  slug: string;
}

export interface StreetInterface {
  id: number;
  number: string;
  label: StreetLabelInterface;
  name: string;
  slug: string;
  alt_name: string;
  alt_slug: string;

  city: number;
}