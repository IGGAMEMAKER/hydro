export default function (date) {
    //
            const options = {
    //          era: 'long',
              year: 'numeric',
    //          month: 'long',
    //          month: 'numeric',
    //          day: 'numeric',
    //          weekday: 'long',
              timezone: 'UTC',
    //          hour: 'numeric',
    //          minute: 'numeric',
    //          second: 'numeric'
            };

            const dt = new Date(date);

            return `${dt.getDate()}.${dt.getMonth()+1}.${dt.getFullYear()}`;
            return date.toLocaleString("RU", options);
    //        return JSON.stringify(date);
}