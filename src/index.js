import React from "react";
import ReactDOM from "react-dom";
import InlineForm from "./InlineForm";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <h1>useHookedForm</h1>
      <InlineForm
        data={{ number: "", expMonth: "", expYear: "", securityCode: "" }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
