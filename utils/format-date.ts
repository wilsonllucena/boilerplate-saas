import { addHours, parseISO, set } from 'date-fns';

type DateHour = {
  date_start: string;
  hour: string;
};
export function formatDate({ date_start, hour }: DateHour) {
  const dateFormat = set(parseISO(date_start), {
    hours: Number(hour.split(':')[0]),
    minutes: Number(hour.split(':')[1])
  });
  return addHours(dateFormat, -3);
}
