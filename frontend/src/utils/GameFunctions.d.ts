// TODO find competitor
var ownSocket = "Onpm_mNzguCfX3PyAAAH";
var myObject = {
  p1: {
    "0": "xw-0HYpLCHbtlxtZAAAD",
    "1": "Onpm_mNzguCfX3PyAAAH"
  },
  p2: {
    "0": "7vnwtHz8qlqkY5xcAAAF",
    "1": "82SUTrKjY0fs3FiYAAAJ"
  }
};

const findSocket = (myobj, ownSocket) => {
  const obj = Object.entries(myobj);
  const p1_Array = Object.values(obj[0][1]);
  const p2_Array = Object.values(obj[1][1]);
  let oppositeSocket = {};
  if (p1_Array.find((x) => x === ownSocket)) {
    oppositeSocket = p2_Array[p1_Array.findIndex((x) => x === ownSocket)];
  } else {
    oppositeSocket = p1_Array[p2_Array.findIndex((x) => x === ownSocket)];
  }

  console.log({ ownSocket, oppositeSocket });
};

findSocket(myObject, ownSocket);