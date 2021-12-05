import currency from 'currency.js';

export const formatCurrency = (value: number) => {
  return currency(value, {
    symbol: 'R$ ',
    separator: '.',
    decimal: ',',
  }).format();
};
