import React from "react";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";
import Flashcard from "./Flashcard";
import Rating from "./Rating";
import SetList from "./SetList";
import axios from "axios";
import NewCardForm from "./NewCardForm";
import Grid from "@material-ui/core/Grid";
const nextCard = require("./helpers").nextCard;
const staticData = require("./staticdata");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: null,
      cards: staticData.data,
      currentCard: {},
      front: true,
      setList: []
    };
    this.flipCard = this.flipCard.bind(this);
    this.changeSet = this.changeSet.bind(this);
    this.getCards = this.getCards.bind(this);
    this.getSetList = this.getSetList.bind(this);
    this.changeFrequency = this.changeFrequency.bind(this);
  }

  flipCard() {
    if (this.state.front === true) {
      this.setState({ front: false });
    } else {
      this.setState({ front: true, currentCard: nextCard(this.state.cards) });
    }
  }

  changeSet(setName) {
    this.getCards(setName)
      .then(() =>
        this.setState({ set: setName, currentCard: nextCard(this.state.cards) })
      )
      .catch(err => {
        console.log(err);
      });
  }

  getCards(setName) {
    setName = setName || "Vocab";
    return axios
      .get(`/cards/${setName}`)
      .then(data => {
        console.log("GET CARDS DATA: ", data);
        return this.setState({
          cards: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSetList() {
    console.log("getting setList");
    axios
      .get(`/sets`)
      .then(data => {
        console.log(data.data);
        this.setState({
          setList: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeFrequency(cardId, frequency) {
    axios
      .put(`/cards/${cardId}`, { frequency: frequency })
      .then(() => {
        console.log("changed frequency of card ", cardId);
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    this.getSetList();
  }

  render() {
    console.log("rendering... index.js");
    return (
      <div>
        <Typography variant="h3" gutterBottom color="primary">
          FlashcardHub
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <SetList
              selectHandler={this.changeSet}
              setList={this.state.setList}
            />
          </Grid>
          <Grid item>
            <NewCardForm
              getCards={this.getCards}
              getSetList={this.getSetList}
            />
          </Grid>
        </Grid>
        {!!this.state.set && (
          <Flashcard
            card={this.state.currentCard}
            displayFront={this.state.front}
            clickHandler={this.flipCard}
          />
        )}

        {!this.state.front && (
          <div>
            <Typography variant="h6">Rate your understanding:</Typography>
            <Rating
              changeFrequency={this.changeFrequency}
              cardId={this.state.currentCard._id}
              flipCard={this.flipCard}
            />
          </div>
        )}
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
