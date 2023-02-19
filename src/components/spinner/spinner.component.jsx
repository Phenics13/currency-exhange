import { Box, CircularProgress } from "@material-ui/core";

const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Spinner;
