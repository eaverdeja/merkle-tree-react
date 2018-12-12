import React, { Component } from "react";
import Controls from "./controls";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import MerkleTree from "./merkleTree";
import { hash } from "./merkle";
import uuid from "uuid";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      txHashes: [
        "8956b200abfa0aa0b874d42a803dd6fbcec8421ba832b2e2a5f67df5be85e1d5",
        "c3385e20c33875a76b86f231403639abcf912cdb3692caaf0e69174a34755ddc",
        "9966b200abfa0aa0b874d42a803dd6fbcec8355ba832b2e2a5f67df5be85e1d5",
        "39407f016e54f1fa09f5f74e3abcb309d9cdb0a635f3026d419e50d416f81355"
      ]
    };
  }

  handleHashDelete = deletedHash =>
    this.setState({
      txHashes: this.state.txHashes.filter(hash => hash !== deletedHash)
    });

  handleHashAdd = () =>
    this.setState({
      txHashes: [...this.state.txHashes, hash(uuid())]
    });

  render() {
    return (
      <div>
        <Typography variant="h3" gutterBottom>
          Naivecoin Merkle Tree
        </Typography>
        <Paper>
          <Controls
            txHashes={this.state.txHashes}
            onHashDelete={this.handleHashDelete}
            onHashAdd={this.handleHashAdd}
          />
          <MerkleTree txHashes={this.state.txHashes} />
        </Paper>
      </div>
    );
  }
}
