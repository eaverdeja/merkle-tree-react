import crypto from "crypto";
import transformToHierarchy from "./transformToHierarchy";

export const generateMerkleRoot = (txHashes, txLength, flatTree) => {
  if (txHashes.length === 1 && txLength !== 1) {
    //Base case - txHashes list is already
    //reduced by the recursive algorithm
    return flatTree;
  } else {
    let tree = toPairs(txHashes).reduce(
      (tree, pair) => [
        //Spread existing pairs
        ...tree,
        //Add new pair
        hashPair(...pair)
      ],
      []
    );
    flatTree.push(...tree);

    return generateMerkleRoot(tree, -1, flatTree);
  }
};

export const hash = s =>
  crypto
    .createHash("sha256")
    .update(s)
    .digest("hex");

//Default for using the first paramater as
//the second one if none is given, still giving
//us a pair {a,b} to hash over
const hashPair = (a, b = a) => {
  return hash(`${a}${b}`);
};

const toPairs = arr => {
  const pairsNeeded = Array(Math.ceil(arr.length / 2));
  const makePairs = (_, i) => arr.slice(i * 2, i * 2 + 2);

  return Array.from(pairsNeeded, makePairs);
};

export const buildMerkleTree = flatTree => {
  const tree = [];
  const subhash = 16;

  flatTree
    //We reverse so the parent nodes come first
    .reverse()
    //we map on each hash, pushing nodes
    //to the tree with the parent/child
    //structure expected by react-d3-tree
    .map((hash, index) => {
      //Check existence of children
      const leftChild = flatTree[2 * index + 1];
      let rightChild = flatTree[2 * index + 2];
      if (!leftChild && !rightChild) return null;

      if (!rightChild) {
        rightChild = leftChild
          .split("")
          .reverse()
          .join("");
      }

      tree.push(
        {
          parent: hash.substring(0, subhash),
          child: leftChild.substring(0, subhash)
        },
        {
          parent: hash.substring(0, subhash),
          child: rightChild.substring(0, subhash)
        }
      );
      return hash;
    });

  return transformToHierarchy(tree);
};
