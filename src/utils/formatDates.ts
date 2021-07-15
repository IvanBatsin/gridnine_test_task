import format from 'date-fns/format'; 
import ru from 'date-fns/locale/ru';


export const getHourseAndMinutes = (totalMinutes: number): string => {
  const hours = Math.floor(totalMinutes / 60); 
  const minutes = totalMinutes % 60;
  return `${hours}ч ${minutes}мин`;
}

export const getHours = (date: string): string => {
  return format(new Date(date), 'H:mm', {locale: ru});
}

export const getFullDate = (date: string): string => {
  return format(new Date(date), 'd MMM E', {locale: ru});
}