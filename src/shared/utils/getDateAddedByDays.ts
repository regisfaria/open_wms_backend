import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

/**
 * Returns one current date added by given days
 */
function getDateAddedByDays(days: number): Date {
  const date = dayjs().add(days, 'days').toDate();

  return date;
}

export { getDateAddedByDays };
