import { createContext, useEffect, useMemo, useState } from "react";

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

const getPersonalCurrencyArray = (personalCurrencyRate) => {
  return personalCurrencyRate.reduce((acc, currencyItem) => {
    const { ccy, base_ccy, buy, sale } = currencyItem;
    const obj_ccy = {
      from: ccy,
      to: base_ccy,
      rate: buy,
    };

    const obj_base_ccy = {
      from: base_ccy,
      to: ccy,
      rate: (1 / sale).toString(),
    };

    acc.push(obj_ccy, obj_base_ccy);
    return acc;
  }, []);
};

export const CurrencyRateContext = createContext({
  currencyRate: [],
  personalCurrencyRate: [],
  errorFetching: null,
  isLoading: false,
});

const CurrencyRateProvider = ({ children }) => {
  const [currencyRate, setCurrencyRate] = useState([]);
  const [personalCurrencyRate, setPersonalCurrencyRate] =
    useState(currencyRate);
  const [errorFetching, setErrorFetching] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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

  const personalCurrencyRateArray = useMemo(() => {
    return getPersonalCurrencyArray(personalCurrencyRate);
  }, [personalCurrencyRate]);

  useEffect(() => {
    setPersonalCurrencyRate(currencyRate);
  }, [currencyRate]);

  const value = {
    currencyRate,
    setCurrencyRate,
    getCurrencyRateItem,
    personalCurrencyRate,
    updatePersonalCurrencyRate,
    personalCurrencyRateArray,
    errorFetching,
    setErrorFetching,
    isLoading,
    setIsLoading,
  };

  return (
    <CurrencyRateContext.Provider value={value}>
      {children}
    </CurrencyRateContext.Provider>
  );
};

export default CurrencyRateProvider;
