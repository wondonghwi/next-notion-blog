import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

export function formatDateToKorean(
  date: Date | number | string,
  formatStr: string = 'yyyy년 MM월 dd일'
): string {
  return format(new Date(date), formatStr, { locale: ko });
}
