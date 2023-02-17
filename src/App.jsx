import {
  CssBaseline,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext } from "react";

import CurrencyTable from "./components/currency-table/currency-table.component";
import Header from "./components/header/header.component";
import { CurrencyRateContext } from "./context/currency-rate.context";

const App = () => {
  const { errorFetching } = useContext(CurrencyRateContext);

  return (
    <>
      <CssBaseline />
      <Header />
      <main className="main">
        <Container maxWidth="sm">
          {errorFetching ? (
            <Typography align="center" variant="h5">
              {errorFetching.message}
            </Typography>
          ) : (
            <CurrencyTable />
          )}
        </Container>
      </main>
      <div></div>
    </>
  );
};

export default App;
