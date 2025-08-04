import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * 날짜를 한국어 형식으로 포맷팅합니다.
 * @param date - 포맷팅할 날짜 (Date 객체, 타임스탬프 또는 날짜 문자열)
 * @param formatStr - 포맷 문자열 (기본값: 'PPP')
 * @returns 포맷팅된 날짜 문자열
 */
export function formatDateToKorean(
  date: Date | number | string,
  formatStr: string = 'PPP'
): string {
  return format(new Date(date), formatStr, { locale: ko });
}
