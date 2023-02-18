import { TextField, Select, MenuItem } from "@material-ui/core";

const CalculatorRow = ({
  currencyLabel,
  currencyOptions,
  selectedCurrency,
  onChangeCurrency,
  amount,
  onChangeAmount,
}) => {
  return (
    <>
      <TextField
        label={currencyLabel}
        value={amount}
        type="number"
        onChange={onChangeAmount}
      />
      <Select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((currencyOption) => (
          <MenuItem value={currencyOption} key={currencyOption}>
            {currencyOption}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default CalculatorRow;
