import moment from 'moment';
import 'moment/dist/locale/pl';

export const formatDate = (date: string, format?: string) => {
    return moment(date)
        .locale('pl')
        .format(format || 'DD.MM.YYYY HH:mm');
};
