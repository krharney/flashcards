import React from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";

const faces = ["😭", "😦", "😕", "😌", "😎"];

const Rating = props => {
  return (
    <div>
      <ButtonGroup
        variant="contained"
        size="large"
        aria-label="small contained button group"
      >
        {faces.map((face, idx) => {
          return (
            <Button
              style={{ fontSize: "30px" }}
              key={idx}
              onClick={() => {
                props.changeFrequency(props.cardId, 5 - idx);
                props.flipCard();
              }}
            >
              {face}
            </Button>
          );
        })}
      </ButtonGroup>
    </div>
  );
};

export default Rating;
