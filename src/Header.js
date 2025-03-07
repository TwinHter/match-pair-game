import { useState, useEffect } from "react";

function Header(props) {
  return (
    <div>
      <h1>Match Pair Game</h1>
      <div>
        <button onClick={props.handleStartGame}>Start</button>
        <button onClick={props.handleRestartGame}>Restart</button>
      </div>
      <div>
        <p>
          Fastest Time:
          {props.fastestTime === null ? "N/A" : `${props.fastestTime} seconds`}
        </p>
        <p>Time:{props.time} seconds</p>
      </div>
    </div>
  );
}
export default Header;
