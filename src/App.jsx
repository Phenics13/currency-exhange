import { useContext, useEffect, useState } from "react";

import { CssBaseline, Container, Typography, Box } from "@material-ui/core";

import { CurrencyRateContext } from "./context/currency-rate.context";

import Header from "./components/header/header.component";
import CurrencyTable from "./components/currency-table/currency-table.component";
import Calculator from "./components/calculator/calculator.component";
import Spinner from "./components/spinner/spinner.component";
import Footer from "./components/footer/footer.component";

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
      "https://proxy.cors.sh/https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5",
      {
        headers: {
          "x-cors-api-key": "temp_574ea9c8f1a79cbb5aef5272fce0a09c",
        },
      }
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
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <Box>
            <Container maxWidth="sm">
              {errorFetching ? (
                <Typography align="center" variant="h5" color="error">
                  {errorFetching.message}
                </Typography>
              ) : (
                <>
                  <CurrencyTable />
                  <Calculator />
                </>
              )}
            </Container>
          </Box>
        )}
      </main>
      <Footer />
    </>
  );
};

export default App;
