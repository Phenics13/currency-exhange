import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AttachMoney } from "@material-ui/icons";

const Header = () => {
  return (
    <AppBar position="relative">
      <Toolbar>
        <AttachMoney />
        <Typography variant="h6">Currency exchange</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
