import React from "react";
import "./Tile.scss";

function Tile(props) {
  let classNames = `tile ${props.className ? props.className : ""}`;
  return (
    <div className={classNames} key={props.value}>
      {props.children}
    </div>
  );
}

export default Tile;
