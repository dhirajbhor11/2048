import React, { useEffect, useState } from "react";
import Tile from "../Tile/Tile";
import "./Ground.scss";

const x = 3;
const y = 3;

function upPress(arr) {
  for (let j = 0; j < y; j++) {
    let selI = null;
    let selJ = null;

    for (let i = 0; i < x; i++) {
      if (arr[i][j] === 0) {
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] === arr[selI][selJ]
      ) {
        arr[selI][selJ] += arr[i][j];
        arr[i][j] = 0;
        selI = null;
        selJ = null;
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] !== arr[selI][selJ]
      ) {
        selI = null;
        selJ = null;
      }

      if (selI == null && selJ == null) {
        selI = i;
        selJ = j;
      }
    }
  }

  for (let j = 0; j < y; j++) {
    let pos = null;
    for (let i = 0; i < x; i++) {
      if (arr[i][j] == 0) {
        pos = i;
        while (arr[pos][j] == 0 && pos < x - 1) {
          pos++;
        }
        arr[i][j] = arr[pos][j];
        arr[pos][j] = 0;
      }
    }
  }
  return arr;
}

function leftPress(arr) {
  for (let i = 0; i < x; i++) {
    let selI = null;
    let selJ = null;
    for (let j = 0; j < y; j++) {
      if (arr[i][j] === 0) {
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] === arr[selI][selJ]
      ) {
        arr[selI][selJ] += arr[i][j];
        arr[i][j] = 0;
        selI = null;
        selJ = null;
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] !== arr[selI][selJ]
      ) {
        selI = null;
        selJ = null;
      }

      if (selI == null && selJ == null) {
        selI = i;
        selJ = j;
      }
    }
  }

  for (let i = 0; i < x; i++) {
    let pos = null;
    for (let j = 0; j < y; j++) {
      if (arr[i][j] == 0) {
        pos = j;
        while (arr[i][pos] == 0 && pos < y - 1) {
          pos++;
        }
        arr[i][j] = arr[i][pos];
        arr[i][pos] = 0;
      }
    }
  }
  return arr;
}
function rightPress(arr) {
  for (let i = x - 1; i >= 0; i--) {
    let selI = null;
    let selJ = null;
    for (let j = 0; j < y; j++) {
      if (arr[i][j] === 0) {
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] === arr[selI][selJ]
      ) {
        arr[selI][selJ] += arr[i][j];
        arr[i][j] = 0;
        selI = null;
        selJ = null;
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] !== arr[selI][selJ]
      ) {
        selI = null;
        selJ = null;
      }

      if (selI == null && selJ == null) {
        selI = i;
        selJ = j;
      }
    }
  }

  for (let i = 0; i < x; i++) {
    let pos = null;
    for (let j = y - 1; j > 0; j--) {
      if (arr[i][j] == 0) {
        pos = j;
        while (arr[i][pos] == 0 && pos > 0) {
          pos--;
        }
        arr[i][j] = arr[i][pos];
        arr[i][pos] = 0;
      }
    }
  }
  return arr;
}

function downPress(arr) {
  let i = 0;
  // let j = 0;

  for (let j = 0; j < y; j++) {
    let selI = null;
    let selJ = null;

    for (let i = x - 1; i >= 0; i--) {
      if (arr[i][j] === 0) {
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] === arr[selI][selJ]
      ) {
        arr[selI][selJ] += arr[i][j];
        arr[i][j] = 0;
        selI = null;
        selJ = null;
        continue;
      } else if (
        selI != null &&
        selJ != null &&
        arr[i][j] !== arr[selI][selJ]
      ) {
        selI = null;
        selJ = null;
      }

      if (selI == null && selJ == null) {
        selI = i;
        selJ = j;
      }
    }
  }

  for (let j = 0; j < y; j++) {
    let pos = null;
    for (let i = x - 1; i >= 0; i--) {
      if (arr[i][j] == 0) {
        pos = i;
        while (arr[pos][j] == 0 && pos > 0) {
          pos--;
        }
        arr[i][j] = arr[pos][j];
        arr[pos][j] = 0;
      }
    }
  }
  return arr;
}

function Ground() {
  const [arr, setArr] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const [uiArr, setUiArr] = useState("");

  function setUi() {
    setUiArr(
      arr.map((inner, i) => {
        return inner.map((value, j) => {
          return (
            <Tile value={value} key={`${i}${j}`}>
              {value ? value : ""}
            </Tile>
          );
        });
      })
    );
  }

  function addNewPoint(arr) {
    let emptyPos = [];

    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (arr[i][j] == 0) {
          emptyPos.push({ i, j });
        }
      }
    }
    let randomNo = Math.floor(Math.random() * emptyPos.length);
    let { i, j } = emptyPos[randomNo];
    arr[i][j] = 2;
    return arr;
  }

  useEffect(() => {
    document.onkeydown = function (event) {
      switch (event.keyCode) {
        case 37:
          setArr(leftPress(arr));
          break;
        case 38: {
          setArr(upPress(arr));
          break;
        }
        case 39:
          setArr(rightPress(arr));
          break;
        case 40:
          setArr(downPress(arr));
          break;
        default: {
          setUi();
        }
      }
      setArr(addNewPoint(arr));
      setUi();
    };
  });

  return (
    <div>
      <div className="ground">{uiArr}</div>
    </div>
  );
}

export default Ground;
