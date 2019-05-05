import Numeral from "numeral";
Numeral.register('locale', 'kzt', {
    delimiters: {
        thousands: ' ',
        decimal: ','
    }
});
// switch between locales
Numeral.locale('kzt');

const _format = (value, format) => {
    let ret = Numeral(value).format(format);
    return value > 0 ? `+${ret}` : ret; 
}

export { _format };