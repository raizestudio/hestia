/*
 * This file is used to define the structure of the data that is returned from the Django REST Framework API.
 *
 */
export interface DRFInterface {
  count: number;
  next: string | null;
  previous: string | null;
  results: any[];
}