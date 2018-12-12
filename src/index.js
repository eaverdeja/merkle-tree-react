import React from "react";
import ReactDOM from "react-dom";
import TxContainer from "./txContainer";
import "./styles.css";

function App() {
  return (
    <div className="App">
      <TxContainer />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
