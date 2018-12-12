import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

export default class extends Component {
  handleDeleteHash = hash => this.props.onHashDelete(hash);

  handleClick = () => this.props.onHashAdd();

  render() {
    const txHashes = this.props.txHashes;
    if (!txHashes.length) return null;

    const hashList = txHashes.map(hash => (
      <ListItem key={hash}>
        <ListItemText primary={hash.substring(0, 64)} />
        <ListItemSecondaryAction>
          <IconButton
            onClick={() => this.handleDeleteHash(hash)}
            aria-label="Delete"
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    ));

    return (
      <div>
        <List dense={true}>{hashList}</List>
        <Button variant="contained" onClick={this.handleClick}>
          Add hash
        </Button>
      </div>
    );
  }
}
