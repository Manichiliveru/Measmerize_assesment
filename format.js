const data = [
  {
    nodeId: "4",
    name: "Four",
    parentId: "2",
    previousSiblingId: "6",
  },
  {
    nodeId: "8",
    name: "Eight",
    parentId: "7",
    previousSiblingId: null,
  },
  {
    nodeId: "2",
    name: "Two",
    parentId: "1",
    previousSiblingId: null,
  },
  {
    nodeId: "6",
    name: "Six",
    parentId: "2",
    previousSiblingId: null,
  },
  {
    nodeId: "3",
    name: "Three",
    parentId: null,
    previousSiblingId: null,
  },
  {
    nodeId: "5",
    name: "Five",
    parentId: "4",
    previousSiblingId: null,
  },
  {
    nodeId: "7",
    name: "Seven",
    parentId: null,
    previousSiblingId: "1",
  },
  {
    nodeId: "1",
    name: "One",
    parentId: null,
    previousSiblingId: "3",
  },
];

const sortBySiblings = (toFormatArray = []) => {
  // Arranging according to the previousSbilingId 
  const temp = toFormatArray.reduce((acc, val) => {
      acc[val.previousSiblingId] = val;
      return acc;
    }, {}),
    result = [];

  let currId = null;

  // Arranging nodes according to the nodeId
  while (temp[currId]) {
    result.push(temp[currId]);
    currId = temp[currId]?.nodeId;
  }
  return result;
};

const getFormattedData = () => {
  // create a map to hold nodes by nodeId for efficient lookup
  const nodeMap = {};
  data.forEach((node) => (nodeMap[node.nodeId] = node));

  // loop through the nodes and build the nested structure
  const nestedData = [];
  let result = [];
  data.forEach((node) => {
    if (node.parentId) { // checking current node has parentId
      const parent = nodeMap[node.parentId]; //taking current node parent id from nodeMap
      if (parent.children) { // checking for children in current node
        if (!node.previousSiblingId) { // checking previousSiblingId is null 
          parent.children.unshift(node); // Assigining to the top position in children array
        } else {
          parent.children.push(node); // Pushing the current node which has previousSiblingId
          parent.children = sortBySiblings(parent.children); //sending current children array to order according to the previousSiblingId
        }
      } else { 
        parent.children = [node]; // Assigning current node to the children
      }
    } else { 
      if (!node.previousSiblingId) {
        nestedData.unshift(node); // Assigning top position to the current node in the nestedData array for havinf previousSiblingId as null
      } else {
        nestedData.push(node); // Pushing the current node to the nestedData array 
        result = sortBySiblings(nestedData); // Sending nestedData array to order according to the previousSiblingId and assigning to result array
      }
    }
  });
  console.log("Nested data:", nestedData);
};

getFormattedData();