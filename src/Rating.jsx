import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const Rating = props => {
  return (
    <div>
      <ButtonGroup
        variant="contained"
        size="large"
        aria-label="small contained button group"
      >
        <Button>😭</Button>
        <Button>😦</Button>
        <Button>😕</Button>
        <Button>😌</Button>
        <Button>😎</Button>
      </ButtonGroup>
    </div>
  );
};

export default Rating;
