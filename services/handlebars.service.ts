const Handlebars = require('react-native-handlebars');

export default class HandlebarsService {
    static registerHelpers(): void {
        Handlebars.registerHelper('formatDate', (date: Date) => {
            const safeDate = new Date(date).toDateString();
            return new Handlebars.SafeString(safeDate);
        });

        Handlebars.registerHelper('formatCurrency', (amount: number) => {
            if (!amount) {
                amount = 0;
            }
            const currency = amount.toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
            return new Handlebars.SafeString(currency);
        });

        Handlebars.registerHelper('totalAsCurrency', (rate: number, duration: number) => {
            if (!rate) {
                rate = 0;
            }
            if (!duration) {
                duration = 0;
            }

            const currency = (duration * rate).toLocaleString('en-ZA', { style: 'currency', currency: 'ZAR' });
            return new Handlebars.SafeString(currency);
        });
    }
}
