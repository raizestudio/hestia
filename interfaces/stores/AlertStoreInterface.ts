export interface AlertInterface {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timeout: number;
}