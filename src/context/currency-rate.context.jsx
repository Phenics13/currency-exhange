import { createContext, useEffect, useState } from "react";

const getCurrencyItem = (currencyRate, ccy, base_ccy) => {
  return currencyRate.find(
    (currencyRateItem) =>
      currencyRateItem.ccy === ccy && currencyRateItem.base_ccy === base_ccy
  );
};

const updatePersonalCurrency = (
  personalCurrencyRate,
  personalCurrencyRateItem,
  method,
  newPrice
) => {
  return personalCurrencyRate.map((currencyRateItem) => {
    const { ccy, base_ccy } = currencyRateItem;
    if (
      ccy === personalCurrencyRateItem.ccy &&
      base_ccy === personalCurrencyRateItem.base_ccy
    ) {
      return { ...personalCurrencyRateItem, [method]: newPrice };
    } else {
      return currencyRateItem;
    }
  });
};

export const CurrencyRateContext = createContext({
  currencyRate: [],
  personalCurrencyRate: [],
  errorFetching: null,
});

const CurrencyRateProvider = ({ children }) => {
  const [currencyRate, setCurrencyRate] = useState([]);
  const [personalCurrencyRate, setPersonalCurrencyRate] =
    useState(currencyRate);
  const [errorFetching, setErrorFetching] = useState(null);

  const getCurrencyRateItem = (ccy, base_ccy) =>
    getCurrencyItem(currencyRate, ccy, base_ccy);

  const updatePersonalCurrencyRate = (
    personalCurrencyRateItem,
    method,
    newPrice
  ) => {
    const newPersonalCurrencyRate = updatePersonalCurrency(
      personalCurrencyRate,
      personalCurrencyRateItem,
      method,
      newPrice
    );
    setPersonalCurrencyRate(newPersonalCurrencyRate);
  };

  useEffect(() => {
    setPersonalCurrencyRate(currencyRate);
  }, [currencyRate]);

  const value = {
    currencyRate,
    setCurrencyRate,
    getCurrencyRateItem,
    personalCurrencyRate,
    updatePersonalCurrencyRate,
    errorFetching,
    setErrorFetching,
  };

  return (
    <CurrencyRateContext.Provider value={value}>
      {children}
    </CurrencyRateContext.Provider>
  );
};

export default CurrencyRateProvider;
