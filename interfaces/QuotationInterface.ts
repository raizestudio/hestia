export interface QuotationReferenceInterface {
  id: number,
  label: string,
  description: string
  service: number,
  place: number
}

export interface QuotationInterface {
  id: number,
  label : string,
  description: string,
  quotation_references: QuotationReferenceInterface[],
}