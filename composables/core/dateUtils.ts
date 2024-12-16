// dateUtils.ts
import moment from 'moment';

export function formatDate(date: Date | string, format: string = 'YYYY-MM-DD'): string {
  return moment(date).format(format);
}
export function formatDateTime(date: Date | string, format: string = 'YYYY-MM-DD HH:mm:ss'): string {
  return moment(date).format(format);
}
