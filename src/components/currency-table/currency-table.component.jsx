import { useContext, useEffect } from "react";

import CurrencyHeader from "../currency-header/currency-header.component";
import CurrencyRow from "../currency-row/currency-row.component";

import { CURRENCY_EXCHANGE_RATE } from "../../utils/data.utils";
import { CurrencyRateContext } from "../../context/currency-rate.context";

import { useCurrencyTableStyles } from "./currency-table.styles";

const CurrencyTable = () => {
  const classes = useCurrencyTableStyles();

  const counter = JSON.parse(localStorage.getItem("counter")) ?? 1;

  const { currencyRate, setCurrencyRate, setErrorFetching } =
    useContext(CurrencyRateContext);

  useEffect(() => {
    const fetchCurrencyRate = async () => {
      try {
        if (counter >= 4) {
          localStorage.setItem("counter", JSON.stringify(0));
          throw new Error("You have made 5 requests. I am throwing error!");
        } else {
          localStorage.setItem("counter", JSON.stringify(counter + 1));
        }

        const data = CURRENCY_EXCHANGE_RATE;
        setCurrencyRate(data);

        // const data = await getData(
        //   "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
        // );
      } catch (err) {
        setErrorFetching(err);
      }
    };

    fetchCurrencyRate();
  }, []);

  return (
    <div className={classes.currencyTable}>
      <CurrencyHeader />
      {currencyRate.map((currencyRateItem) => (
        <CurrencyRow
          currencyRateItem={currencyRateItem}
          key={currencyRateItem.ccy}
        />
      ))}
    </div>
  );
};

export default CurrencyTable;
