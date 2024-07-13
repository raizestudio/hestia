export interface ConnectionInterface {
  status: 'success' | 'error' | 'warning';
  latency: number;
}