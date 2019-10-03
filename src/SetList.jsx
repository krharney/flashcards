import React from "react";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

export default function SetList(props) {
  console.log(props);
  const [anchorEl, setAnchorEl] = React.useState(null);

  function handleClick(event) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(set) {
    setAnchorEl(null);
    props.selectHandler(set);
  }

  function getSetList() {}

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Select Card Set
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.setList.map(set => {
          return (
            <MenuItem
              key={set}
              onClick={() => {
                handleClose(set);
              }}
            >
              {set}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
}
