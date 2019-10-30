import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import axios from "axios";
const getDefinition = require("./helpers.js").getDefinition;
const arrayToDefinition = require("./helpers.js").arrayToDefinition;

export default function NewCardForm(props) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState({
    set: "",
    front: "",
    back: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    setOpen(false);
    if (form.back === "") {
      getDefinition(form.front)
        .then(data => {
          form.back = arrayToDefinition(data.data[0].shortdef);
          axios
            .post(`/cards/${form.set}`, {
              front: form.front,
              back: form.back
            })
            .then(() => {
              setForm({ ...form, set: "", front: "", back: "" });
              props
                .getCards()
                .then(() => props.getSetList())
                .catch(err => {
                  console.log("getCards issue");
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      axios
        .post(`/cards/${form.set}`, { front: form.front, back: form.back })
        .then(() => {
          setForm({ ...form, set: "", front: "", back: "" });
          props
            .getCards()
            .then(() => props.getSetList())
            .catch(err => {
              console.log("getCards issue");
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  const handleChange = e => {
    console.log("handling change");
    console.log("val: ", e.target.value, " name: ", e.target.name);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add A Card
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add A Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If no back of card is provided, the defintion will be auto-generated
            from Merriam-Webster Dictionary.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Set"
            type="text"
            fullWidth
            name="set"
            onChange={handleChange.bind(this)}
            value={form.set}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Front of Card"
            type="text"
            fullWidth
            name="front"
            onChange={handleChange.bind(this)}
            value={form.front}
          />
          <TextField
            autoFocus
            margin="dense"
            id="back"
            label="Back of Card"
            type="text"
            fullWidth
            name="back"
            value={form.back}
            onChange={handleChange.bind(this)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
