import moment from 'moment';
import 'moment/dist/locale/pl';

export const formatDate = (date: string, format?: string) => {
    return moment(date)
        .locale('pl')
        .format(format || 'DD.MM.YYYY HH:mm');
};

export const timeStringToMinutes = (timeString: string): number => {
    if (!timeString) return 0;

    const regex = /^(?:(\d+)w\s*)?(?:(\d+)d\s*)?(?:(\d+)h\s*)?(?:(\d+)m\s*)?$/;
    const matches = timeString.trim().toLowerCase().match(regex);

    if (!matches) return 0;

    const weeks = parseInt(matches[1] || '0');
    const days = parseInt(matches[2] || '0');
    const hours = parseInt(matches[3] || '0');
    const minutes = parseInt(matches[4] || '0');

    return weeks * 5 * 8 * 60 + days * 8 * 60 + hours * 60 + minutes;
};

export const minutesToTimeString = (minutes: number): string => {
    if (!minutes) return '0m';

    const weeks = Math.floor(minutes / (5 * 8 * 60));
    const remainingAfterWeeks = minutes % (5 * 8 * 60);

    const days = Math.floor(remainingAfterWeeks / (8 * 60));
    const remainingAfterDays = remainingAfterWeeks % (8 * 60);

    const hours = Math.floor(remainingAfterDays / 60);
    const remainingMinutes = remainingAfterDays % 60;

    const parts = [];
    if (weeks) parts.push(`${weeks}w`);
    if (days) parts.push(`${days}d`);
    if (hours) parts.push(`${hours}h`);
    if (remainingMinutes) parts.push(`${remainingMinutes}m`);

    return parts.join(' ') || '0m';
};

export const isValidTimeFormat = (value: string): boolean => {
    const regex = /^(?:\d+w\s*)?(?:\d+d\s*)?(?:\d+h\s*)?(?:\d+m\s*)?$/;
    return regex.test(value.trim().toLowerCase()) && value.trim() !== '';
};
