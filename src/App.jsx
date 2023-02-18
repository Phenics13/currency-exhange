import { useContext, useEffect, useState } from "react";

import { CssBaseline, Container, Typography } from "@material-ui/core";

import { CurrencyRateContext } from "./context/currency-rate.context";

import Header from "./components/header/header.component";
import CurrencyTable from "./components/currency-table/currency-table.component";
import Calculator from "./components/calculator/calculator.component";
import Spinner from "./components/spinner/spinner.component";

const App = () => {
  const {
    errorFetching,
    setErrorFetching,
    isLoading,
    setIsLoading,
    setCurrencyRate,
  } = useContext(CurrencyRateContext);

  const counter = JSON.parse(localStorage.getItem("counter")) ?? 1;

  useEffect(() => {
    counter >= 4
      ? localStorage.setItem("counter", JSON.stringify(0))
      : localStorage.setItem("counter", JSON.stringify(counter + 1));
  }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://proxy.cors.sh/https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5"
    )
      .then((response) => response.json())
      .then((data) => {
        if (counter >= 4) {
          throw new Error("You have made 5 requests. I am throwing an error!");
        }
        setCurrencyRate(data);
      })
      .catch((err) => setErrorFetching(err))
      .finally(() => setIsLoading(false));
  }, [setCurrencyRate, setErrorFetching, setIsLoading]);

  return (
    <>
      <CssBaseline />
      <Header />
      {isLoading ? (
        <Spinner />
      ) : (
        <main className="main">
          <Container maxWidth="sm">
            {errorFetching ? (
              <Typography
                align="center"
                variant="h5"
                style={{ marginTop: "5rem" }}
                color="error"
              >
                {errorFetching.message}
              </Typography>
            ) : (
              <>
                <CurrencyTable />
                <Calculator />
              </>
            )}
          </Container>
        </main>
      )}
    </>
  );
};

export default App;
