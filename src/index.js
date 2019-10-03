import React from "react";
import ReactDOM from "react-dom";
import { Typography } from "@material-ui/core";
import Flashcard from "./Flashcard";
import Rating from "./Rating";
import SetList from "./SetList";
import axios from "axios";
const staticData = require("./staticdata");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      set: null,
      cards: staticData.data,
      currentCard: 0,
      front: true,
      setList: ["set1", "set2", "set3"]
    };
    this.flipCard = this.flipCard.bind(this);
    this.changeSet = this.changeSet.bind(this);
  }

  flipCard() {
    if (this.state.front === true) {
      this.setState({ front: false });
    } else {
      this.setState({ front: true });
      // proceed to next card
    }
  }

  changeSet(setName) {
    console.log("Change set to ", setName);
    this.setState(
      {
        set: setName
      },
      () => {
        this.getCards(setName);
      }
    );
  }

  getCards(setName) {
    console.log("getting cards from ", setName);
    axios
      .get(`/cards/${setName}`)
      .then(data => {
        this.setState({
          set: data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  getSetList() {
    console.log("getting setList");
    axios.get(`/sets`).then(data => {
      console.log(data.data);
      this.setState({
        setList: data.data
      }).catch(err => {
        console.log(err);
      });
    });
  }

  componentDidMount() {
    this.getSetList();
    console.log("set list", this.state.SetList);
  }

  chooseNextCard(){
    
  }

  render() {
    console.log("rendering... index.js");
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          FlashcardHub
        </Typography>
        <SetList selectHandler={this.changeSet} setList={this.state.setList} />
        {!!this.state.set && (
          <Flashcard
            card={this.state.cards[this.state.currentCard]}
            displayFront={this.state.front}
            clickHandler={this.flipCard}
          />
        )}

        {!this.state.front && (
          <div>
            <Typography variant="h6">Rate your understanding:</Typography>
            <Rating />
          </div>
        )}
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);
