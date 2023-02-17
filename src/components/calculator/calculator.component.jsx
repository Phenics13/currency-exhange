import {
  Button,
  MenuItem,
  Select,
  TextField,
  Toolbar,
} from "@material-ui/core";
import { SwapHoriz } from "@material-ui/icons";

const style = {
  border: "none",
};

const Calculator = () => {
  return (
    <Toolbar style={{ marginTop: "5rem" }}>
      <form style={{ display: "flex", gap: "0.75rem" }}>
        <TextField label="Change" />
        <Select defaultValue="UAN">
          <MenuItem value="UAN">UAN</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
        <Button>
          <SwapHoriz />
        </Button>
        <TextField label="Get" />
        <Select defaultValue="USD">
          <MenuItem value="UAN">UAN</MenuItem>
          <MenuItem value="USD">USD</MenuItem>
        </Select>
      </form>
    </Toolbar>
  );
};

export default Calculator;
