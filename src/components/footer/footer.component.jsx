import { Typography, Container, Box } from "@material-ui/core";
import { getDate } from "../../utils/date.utils";

const Footer = () => {
  const year = getDate().split(".").pop();
  return (
    <footer>
      <Container maxWidth="lg">
        <Box display="flex" justifyContent="center">
          <Typography>&#169; {year} All rights reserved</Typography>
        </Box>
      </Container>
    </footer>
  );
};

export default Footer;
