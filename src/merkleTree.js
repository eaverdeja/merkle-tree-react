import React, { Component } from "react";
import Tree from "react-d3-tree";
import { generateMerkleRoot, buildMerkleTree } from "./merkle";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tree: []
    };
  }

  getTree(txHashes = null) {
    if (!txHashes) {
      txHashes = this.props.txHashes;
    }
    const flatTree = generateMerkleRoot(txHashes, txHashes.length, [
      ...txHashes
    ]);
    return buildMerkleTree(flatTree);
  }

  componentDidMount() {
    const dimensions = this.treeContainer.getBoundingClientRect();
    const tree = this.getTree();
    this.setState({
      ...this.state,
      tree,
      translate: {
        x: dimensions.width / 2,
        y: dimensions.height / 6
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.txHashes.length === this.props.txHashes.length &&
      nextProps.txHashes.every(h => this.props.txHashes.includes(h))
    ) {
      return null;
    }

    const tree = this.getTree(nextProps.txHashes);
    this.setState({
      ...this.state,
      tree
    });
  }

  render() {
    const containerStyles = {
      width: "100%",
      height: "70vh"
    };

    return (
      <div
        id="treeWrapper"
        style={containerStyles}
        ref={tc => (this.treeContainer = tc)}
      >
        {this.state.tree.length && (
          <Tree
            data={this.state.tree}
            orientation="vertical"
            translate={this.state.translate}
            separation={{
              siblings: 2,
              nonSiblings: 2
            }}
          />
        )}
      </div>
    );
  }
}
