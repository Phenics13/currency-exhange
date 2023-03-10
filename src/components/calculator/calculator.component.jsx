import { useContext, useEffect, useState } from "react";

import { Button, Toolbar } from "@material-ui/core";
import { SwapHoriz } from "@material-ui/icons";

import { CurrencyRateContext } from "../../context/currency-rate.context";

import CalculatorRow from "../calculator-row/calculator-row.component";

const Calculator = () => {
  const { personalCurrencyRateArray } = useContext(CurrencyRateContext);

  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();

  const [exchangeRate, setExchangeRate] = useState();

  const [changeOptions, setChangeOptions] = useState([]);
  const [getOptions, setGetOptions] = useState([]);

  const [amount, setAmount] = useState("");
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount ? parseFloat(amount * exchangeRate).toFixed(2) : "";
  } else {
    toAmount = amount;
    fromAmount = amount ? parseFloat(amount / exchangeRate).toFixed(2) : "";
  }

  useEffect(() => {
    if (!personalCurrencyRateArray.length || fromCurrency || toCurrency) return;
    const initialSelectedCurrency = personalCurrencyRateArray[0];
    const { from, to, rate } = initialSelectedCurrency;
    setFromCurrency(from);
    setToCurrency(to);
    setExchangeRate(rate);
  }, [fromCurrency, toCurrency, personalCurrencyRateArray]);

  useEffect(() => {
    if (!personalCurrencyRateArray.length || !fromCurrency || !toCurrency)
      return;
    const newExchangeRate = personalCurrencyRateArray.find(
      (currencyArrayItem) =>
        currencyArrayItem.from === fromCurrency &&
        currencyArrayItem.to === toCurrency
    ).rate;

    setExchangeRate(newExchangeRate);
  }, [fromCurrency, toCurrency, personalCurrencyRateArray]);

  useEffect(() => {
    const newChangeOptions = personalCurrencyRateArray
      .filter((currencyArrayItem) => currencyArrayItem.to === toCurrency)
      .map((filteredCurrencyItem) => filteredCurrencyItem.from);

    const newGetOptions = personalCurrencyRateArray
      .filter((currencyArrayItem) => currencyArrayItem.from === fromCurrency)
      .map((filteredCurrencyItem) => filteredCurrencyItem.to);

    setChangeOptions(newChangeOptions);
    setGetOptions(newGetOptions);
  }, [fromCurrency, toCurrency, personalCurrencyRateArray]);

  const handleFromAmountChange = (event) => {
    const input = event.target.value;
    const res = input.match(/^\d*\.?[\d]?[\d{1}]?$/g);
    console.log(res);
    if (!res) return;

    setAmount(res.join(""));
    setAmountInFromCurrency(true);
  };

  const handleToAmountChange = (event) => {
    const input = event.target.value;
    const res = input.match(/^\d*\.?[\d]?[\d{1}]?$/g);
    console.log(res);
    if (!res) return;

    setAmount(res.join(""));
    setAmountInFromCurrency(false);
  };

  const handleCurrencySwap = () => {
    setChangeOptions([]);
    setGetOptions([]);

    const toCur = toCurrency;
    const fromCur = fromCurrency;
    setFromCurrency(toCur);
    setToCurrency(fromCur);
    setAmount(toAmount);
    setAmountInFromCurrency(true);
  };

  return (
    <Toolbar style={{ marginTop: "5rem" }}>
      {personalCurrencyRateArray && !!personalCurrencyRateArray.length && (
        <form style={{ display: "flex", gap: "0.75rem" }}>
          {fromCurrency && changeOptions.length && (
            <CalculatorRow
              currencyLabel="Change"
              currencyOptions={changeOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(e) => setFromCurrency(e.target.value)}
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
            />
          )}
          <Button onClick={handleCurrencySwap}>
            <SwapHoriz />
          </Button>
          {toCurrency && getOptions.length && (
            <CalculatorRow
              currencyLabel="Get"
              currencyOptions={getOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(e) => setToCurrency(e.target.value)}
              amount={toAmount}
              onChangeAmount={handleToAmountChange}
            />
          )}
        </form>
      )}
    </Toolbar>
  );
};

export default Calculator;
