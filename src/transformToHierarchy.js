/**
 * Taken from https://github.com/bkrem/react-d3-tree/blob/0c43298ffe8f12d5a261daff69c767a1c8e8c2e9/src/util/index.js
 */
import uuid from "uuid";

/**
 * transformToHierarchy - Transforms a flat array of parent-child links
 * into a hierarchy.
 * @private
 * @param {array<object>} links           Set of parent-child link objects
 * @param {array<string>|undefined} attributeFields Set of `link` fields to be used as attributes
 *
 * @return {array<object>} Single-element array containing the root node object.
 */
export default function(links, attributeFields) {
  const nodesByName = {};

  const assignNode = name => {
    if (!nodesByName[name]) {
      nodesByName[name] = { name };
    }
    return nodesByName[name];
  };

  const assignNodeWithAttributes = (name, attributes) => {
    if (!nodesByName[name]) {
      nodesByName[name] = {
        name,
        attributes
      };
    }
    return nodesByName[name];
  };

  // Create nodes for each unique source and target.
  links.forEach(link => {
    // if `attributeFields` is defined, create/overwrite current `link.attributes`
    if (attributeFields) {
      const customAttributes = {};
      attributeFields.forEach(field => {
        customAttributes[field] = link[field];
      });
      link.attributes = customAttributes;
    }

    link.source = assignNode(link.parent);
    link.target = assignNodeWithAttributes(link.child, link.attributes);
    const parent = link.source;
    const child = link.target;

    parent.id = uuid.v4();
    child.id = uuid.v4();
    child.parent = parent.name || null;

    parent._collapsed = child._collapsed = false; // eslint-disable-line
    // NOTE We assign to a custom `_children` field instead of D3's reserved
    // `children` to avoid update anomalies when collapsing/re-expanding nodes.
    parent._children
      ? parent._children.push(child)
      : (parent._children = [child]);
  });

  // Extract & return the root node
  const rootLinks = links.filter(link => !link.source.parent);
  return [rootLinks[0].source];
}
