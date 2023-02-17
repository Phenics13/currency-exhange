import { Grid, Toolbar, Typography } from "@material-ui/core";
import { CalendarToday } from "@material-ui/icons";

import { getDate } from "../../utils/date.utils";

const CurrencyHeader = () => {
  const currentDate = getDate();

  return (
    <Grid container spacing={0} alignItems="center" justifyContent="center">
      <Grid item xs={4}>
        <Toolbar style={{ flexWrap: "wrap", justifyContent: "center" }}>
          <CalendarToday />
          <Typography align="center">{currentDate}</Typography>
        </Toolbar>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center">Buy</Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography align="center">Sell</Typography>
      </Grid>
    </Grid>
  );
};

export default CurrencyHeader;
