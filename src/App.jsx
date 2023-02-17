import { useContext } from "react";

import { CssBaseline, Container, Typography } from "@material-ui/core";

import CurrencyTable from "./components/currency-table/currency-table.component";
import Header from "./components/header/header.component";

import { CurrencyRateContext } from "./context/currency-rate.context";
import Calculator from "./components/calculator/calculator.component";

const App = () => {
  const { errorFetching } = useContext(CurrencyRateContext);

  return (
    <>
      <CssBaseline />
      <Header />
      <main className="main">
        <Container maxWidth="sm">
          {errorFetching ? (
            <Typography
              align="center"
              variant="h5"
              style={{ marginTop: "5rem" }}
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
      <div></div>
    </>
  );
};

export default App;
