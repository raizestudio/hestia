export interface NotificationInterface {
  id: string
  title: string
  message: string
  type: 'error' | 'success' | 'warning' | 'info' | ''
  isRead: boolean
  timestamp: string
}