import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    maxWidth: 500,
    height: 250
  },
  title: {
    padding: "10px"
  }
});

const Flashcard = props => {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card} onClick={props.clickHandler}>
        <Typography variant="h5" className={classes.title}>
          {props.displayFront ? props.card.front : props.card.back}
        </Typography>
      </Card>
    </div>
  );
};

export default Flashcard;
