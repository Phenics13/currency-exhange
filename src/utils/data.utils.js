export const CURRENCY_EXCHANGE_RATE = [
  { ccy: "EUR", base_ccy: "UAH", buy: "41.15000", sale: "42.15000" },
  { ccy: "USD", base_ccy: "UAH", buy: "39.10000", sale: "39.60000" },
];

export const getData = async (url, additionalInformation = {}) => {
  return await fetch(url, additionalInformation)
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
