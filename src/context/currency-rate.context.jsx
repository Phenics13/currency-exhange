import { createContext, useState } from "react";

export const CurrencyRateContext = createContext({
  currencyRate: [],
  errorFetching: null,
});

const CurrencyRateProvider = ({ children }) => {
  const [currencyRate, setCurrencyRate] = useState([]);
  const [errorFetching, setErrorFetching] = useState(null);

  const value = {
    currencyRate,
    setCurrencyRate,
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
