import { useRef, useState, useEffect, useCallback } from "react";
import styles from "./InputElement.module.scss";

export function InputElement({
  noSpecialCharactersAllowed,
  typeOfInput,
  checkForPhoneNumber,
  checkForTextInput,
}) {
  const [typedValue, setTypedValue] = useState(""); // the value you type
  const [inputValue, setInputValue] = useState(""); // final value, after you checked the typed value for special characters
  const [errMsg, setErrMsg] = useState(false);
  const [infoMsg, setInfoMsg] = useState(false);
  const inputRef = useRef();

  const checkForSpecialCharacters = (inputToTest) => {
    const result = noSpecialCharactersAllowed.test(inputToTest);
    if (!result) {
      setInputValue(() => {
        return typedValue;
      });
    } else {
      inputRef.current.value = inputValue;
      setTypedValue(() => {
        return inputValue;
      });
      setErrMsg(() => {
        return true;
      });
      console.log(errMsg);
      setTimeout(() => {
        setErrMsg(() => {
          return false;
        });
      }, 3000);
    }
  };

  const handleInput = (result) => {
    console.log(result);
    if (result) {
      setInputValue(typedValue);

      console.log(infoMsg);
    } else {
      inputRef.current.value = inputValue;
      setTypedValue(() => {
        return inputValue;
      });
      setInfoMsg(true);
      console.log(infoMsg);
    }
  };
  // a doua oara trece prin true pentru ca el practic rescrie ce era gresit ?
  //mai pot pune un singur setinfomsg(!result) si cumva sa folosesc usecallback?nu stiu
  // handleInput imi face render de doua ori si a doua oara trece prin conditia de true si practic imi anuleaza info-messageul - o solutie ar fi sa mut setinfomsg false pe onChange de la input

  const checkIfPhoneNumber = (inputToTest) => {
    const result = checkForPhoneNumber.test(inputToTest);
    handleInput(result);
    // return result;
  };

  const checkIfText = (inputToTest) => {
    const result = checkForTextInput.test(inputToTest);
    handleInput(result);
    // return result; n-am nevoie sa-mi returneze nimic
  };

  useEffect(() => {
    checkForSpecialCharacters(typedValue);

    typeOfInput ? checkIfPhoneNumber(typedValue) : checkIfText(typedValue);
  }, [typedValue]);

  useEffect(() => {
    inputRef.current.value = "";
    setInputValue("");
    setTypedValue("");
    setInfoMsg(false);
  }, [typeOfInput]);

  return (
    <div className={styles.inputElementContainer}>
      <form>
        <label htmlFor="input" className={styles.inputLabel}>
          Input:
        </label>
        <input
          type="text"
          id="input"
          autoComplete="off"
          ref={inputRef}
          onChange={() => {
            setInfoMsg(false);
            setTypedValue(inputRef.current.value);
          }}
        />
      </form>
      <section className={styles.errorSection}>
        {infoMsg && (
          <h3 className={styles.infoMessage}>
            {typeOfInput
              ? "Accepted formats: +xx xxx xxx xxx / xxxx xxx xxx  - NO WHITESPACES"
              : "Accepts only letters and whitespaces, no digits or special characters"}
          </h3>
        )}
        {errMsg && (
          <h2 className={styles.mainError}>
            No Special Characters Allowed, only&nbsp;
            {typeOfInput ? "numbers" : "letters"}
          </h2>
        )}
      </section>
      <div className={styles.liveElementContainer}>
        <strong className={styles.label}>Live element:</strong>
        <p className={styles.liveElement}>{inputValue}</p>
      </div>
    </div>
  );
}

/* 1. Creeaza o componenta în React care poate verifica un input
element live ( în timp ce scrii ) , o componenta care nu permite
introducerea de caractere speciale ex: []’;\/.,><>?>:”|. Practic scopul
este sa nu permitem utilizatorului într-un câmp destinat numelui sa
introducă caractere ciudate.
A. Componenta trebuie sa poată accepta ca props tipul de
verificare ( ideea e sa funcționeze pentru numere și text )
B. Trebuie sa poată verifica și sa accepte doar numere și semnul
plus ( practic numere de telefon )
C. Trebuie sa poată verifica și sa accepte doar text.
D. Trebuie sa arate sub input un mesaj care atenționează userul ca
inputul lui nu este acceptat 
E. ( bonus ) Dacă utilizatorul încearcă sa introducă un caracter
nepermis ex. ‘{‘, sa nu se introducă și sa ii apăra mesajul de
avertizare ca nu sunt acceptate decât litere, mesajul sa rămână
sub input timp de 3-4 secunde. */
