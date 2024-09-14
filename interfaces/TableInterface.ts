export interface TableHeaderInterface {
  label: string;
  field: string;
}

export interface TableColumnInterface {
  avatarKey?: string;
  labelKey: string;
  type: string;
  textClass?: string;
  dateType?: string;
  currencyKey?: string;
  fieldKey?: string;
}