import { useContext, useState } from "react";

import {
  Box,
  Button,
  Modal,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { Done, Close } from "@material-ui/icons";
import { CurrencyRateContext } from "../../context/currency-rate.context";

const isPriceOptimal = (price, newPrice) => {
  return Math.abs(price - newPrice) <= price * 0.1;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "2rem",
  boxShadow: 24,
  p: 4,
};

const CurrencyModal = ({ personalCurrencyRateItem, method, handleClose }) => {
  const { ccy, base_ccy } = personalCurrencyRateItem;
  const price = personalCurrencyRateItem[method];

  const { getCurrencyRateItem, updatePersonalCurrencyRate } =
    useContext(CurrencyRateContext);
  const initialPrice = getCurrencyRateItem(ccy, base_ccy)[method];

  const [newPrice, setNewPrice] = useState(parseFloat(price).toFixed(2));
  const [error, setError] = useState(false);

  const handleOnPriceChange = (event) => {
    setNewPrice(event.target.value);

    const newPrice = parseFloat(event.target.value);
    setError(!isPriceOptimal(initialPrice, newPrice || 0));
  };

  const handleUpdatePersonalCurrencyRate = () => {
    updatePersonalCurrencyRate(personalCurrencyRateItem, method, newPrice);
    handleClose();
  };

  const methodText = method[0].toUpperCase() + method.slice(1);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {`${methodText} price:`}
        </Typography>
        <form style={{ marginTop: "1rem" }}>
          <TextField
            value={newPrice}
            onChange={handleOnPriceChange}
            error={error}
            label="New price"
            type="number"
            helperText="value should be +10%/-10% from initial"
          />
        </form>
        <Toolbar style={{ padding: "0" }}>
          <Button
            onClick={handleUpdatePersonalCurrencyRate}
            disabled={error}
            color="primary"
          >
            <Done />
          </Button>
          <Button onClick={handleClose}>
            <Close />
          </Button>
        </Toolbar>
      </Box>
    </Modal>
  );
};

export default CurrencyModal;
