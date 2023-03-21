import { useState } from "react";
import "./App.css";
import { InputElement } from "./components/InputElement";
import { SearchBar } from "./components/SearchBar";

function App() {
  const noSpecialCharactersAllowed = /([\[\]'";:/\\.,><?!@#$%^&*|{}_])/;
  const checkForPhoneNumber = /(^\+\d{0,11}$)|(^\d{0,10}$)/;
  const checkForTextInput = /^[a-zA-Z ]*$/;
  const [typeOfInput, setTypeOfInput] = useState(true);

  return (
    <div>
      <p>Click to change the type of data you want to insert:</p>
      <button
        className="switchInputType"
        onClick={() =>
          setTypeOfInput((prevState) => {
            return !prevState;
          })
        }
      >
        {typeOfInput ? "Number" : "Text"}
      </button>

      <InputElement
        noSpecialCharactersAllowed={noSpecialCharactersAllowed}
        typeOfInput={typeOfInput}
        checkForPhoneNumber={checkForPhoneNumber}
        checkForTextInput={checkForTextInput}
      />
      <SearchBar />
    </div>
  );
}

export default App;
