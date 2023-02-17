import { Box, Modal, TextField, Typography } from "@material-ui/core";

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

const CurrencyModal = ({ currencyRateItem, method, handleClose }) => {
  const { ccy, base_ccy } = currencyRateItem;
  const price = currencyRateItem[method];

  const methodText = method[0].toUpperCase() + method.slice(1);

  return (
    <Modal open={true} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" component="h2">
          {`${methodText} price:`}
        </Typography>
        <form>
          <TextField
            label="New price"
            type="number"
            defaultValue={parseFloat(price).toFixed(2)}
            helperText="value should be +10%/-10% from initial"
          />
        </form>
      </Box>
    </Modal>
  );
};

export default CurrencyModal;
