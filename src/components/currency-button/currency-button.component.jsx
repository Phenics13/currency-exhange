import { useState } from "react";

import { Button, Toolbar } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export const CurrencyButton = ({ handleOnClick, price }) => {
  const [showIcon, setShowIcon] = useState(false);

  const handleShowIcon = () => {
    setShowIcon((prev) => !prev);
  };

  return (
    <Button
      align="center"
      onClick={handleOnClick}
      onMouseOver={handleShowIcon}
      onMouseOut={handleShowIcon}
      style={{ width: "100%", height: "100%" }}
    >
      <Toolbar position="relative">
        {parseFloat(price).toFixed(2)}
        {showIcon && (
          <Edit
            fontSize="small"
            style={{ position: "absolute", top: "0.5rem", right: "0" }}
          />
        )}
      </Toolbar>
    </Button>
  );
};
