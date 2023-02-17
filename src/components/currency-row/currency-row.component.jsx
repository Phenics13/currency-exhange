import { useState } from "react";
import { Button, Grid, Toolbar, Typography } from "@material-ui/core";

import CurrencyModal from "../modal/modal.component";

import { CurrencyButton } from "../currency-button/currency-button.component";

const CURRENCY_METHOD = {
  buy: "buy",
  sell: "sale",
};

const CurrencyRow = ({ currencyRateItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencyMethod, setCurrencyMethod] = useState(CURRENCY_METHOD.sell);

  const handleButtonClick = (method) => {
    setCurrencyMethod(method);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleBuy = () => handleButtonClick(CURRENCY_METHOD.buy);
  const handleSell = () => handleButtonClick(CURRENCY_METHOD.sell);

  const { ccy, base_ccy, buy, sale } = currencyRateItem;
  return (
    <>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <Typography align="center">{`${ccy}\\${base_ccy}`}</Typography>
        </Grid>
        <Grid item xs={4}>
          <CurrencyButton handleOnClick={handleBuy} price={buy} />
        </Grid>
        <Grid item xs={4}>
          <CurrencyButton handleOnClick={handleSell} price={sale} />
        </Grid>
      </Grid>
      {isModalOpen && (
        <CurrencyModal
          currencyRateItem={currencyRateItem}
          method={currencyMethod}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default CurrencyRow;
