import { useContext } from "react";

import CurrencyHeader from "../currency-header/currency-header.component";
import CurrencyRow from "../currency-row/currency-row.component";

import { CurrencyRateContext } from "../../context/currency-rate.context";

import { useCurrencyTableStyles } from "./currency-table.styles";

const CurrencyTable = () => {
  const classes = useCurrencyTableStyles();

  const { personalCurrencyRate } = useContext(CurrencyRateContext);

  return (
    <div className={classes.currencyTable}>
      <CurrencyHeader />
      {personalCurrencyRate.map((currencyRateItem) => (
        <CurrencyRow
          currencyRateItem={currencyRateItem}
          key={currencyRateItem.ccy}
        />
      ))}
    </div>
  );
};

export default CurrencyTable;
