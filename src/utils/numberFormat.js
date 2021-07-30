const LOCALES = {
  enUS: 'en-US',
  deDE: 'de-DE'
};

const MAX_DIGIT = 20;

const makeNumberFormat = (minimumFractionDigits = 0, maximumFractionDigits = 0, locale = LOCALES.enUS) => {
  let min = Number(minimumFractionDigits) || 0;
  let max = Number(maximumFractionDigits) || 0;

  max = Math.min(Math.max(min, max), MAX_DIGIT);
  min = Math.min(Math.min(min, max), MAX_DIGIT);

  const numberFormat = new Intl.NumberFormat(
    locale, {
    style: 'decimal',
    minimumFractionDigits: min,
    maximumFractionDigits: max
  });

  return (number) => numberFormat.format(number);
};

const numberDecimal = (number, decimal = 2) => parseFloat(number).toFixed(Math.min(decimal, 100));

export default {
  LOCALES,
  makeNumberFormat,
  numberDecimal
};

export {
  LOCALES,
  makeNumberFormat,
  numberDecimal
};