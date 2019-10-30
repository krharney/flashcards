import React from "react";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
  card: {
    width: 500,
    height: 300
  },
  title: {
    padding: "0px 10px 0px 10px",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    height: "300px",
    position: "relative",
    cursor: "default"
  }
});

const Flashcard = props => {
  const classes = useStyles();
  return (
    <div>
      <Card
        className={classes.card}
        onClick={props.clickHandler}
        elevation={10}
      >
        <Typography variant="h5" className={classes.title} align="center">
          {props.displayFront ? props.card.front : props.card.back}
        </Typography>
      </Card>
    </div>
  );
};

export default Flashcard;
