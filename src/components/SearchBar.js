import styles from "./SearchBar.module.scss";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
export function SearchBar() {
  const [list, setList] = useState([]);
  const [newList, setNewList] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [noResult, setNoResult] = useState(false);
  const searchRef = useRef();

  const getData = async () => {
    try {
      const response = await axios.get("MOCK_DATA.json");
      setList(response.data);
      // .then((const dbList = response.json()))
      // .catch((error) => console.log(error));
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
      } else {
        console.log(`Error: ${err.message}`);
      }
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const checkForIndex = /^\d+$/;
  const checkForName = /[^\d\W]+/;
  const checkForDate = /^(\d{0,2}\/?\d{0,2}\/?\d{4})$/;

  const filterData = () => {
    if (
      checkForIndex.test(searchItem) &&
      searchRef.current.value < list.length
    ) {
      const filteredList = list.filter((item) =>
        item.id.toString().includes(searchRef.current.value)
      );
      filteredList.length !== 0
        ? setNewList([...filteredList])
        : setNoResult(true);
    } else if (checkForName.test(searchItem)) {
      const filteredList = list.filter((item) =>
        item.first_name
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase())
      );

      filteredList.length !== 0
        ? setNewList([...filteredList])
        : setNoResult(true);
    } else if (checkForDate.test(searchItem)) {
      const filteredList = list.filter((item) =>
        item.date.includes(searchRef.current.value)
      );
      filteredList.length !== 0
        ? setNewList([...filteredList])
        : setNoResult(true);
    } else if (!searchItem) {
      setNewList([...list]);
    } else {
      setNoResult(true);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      filterData();
    }, 1500);
    setNoResult(false);

    return () => clearTimeout(timer);
  }, [searchItem]);

  return (
    <div className={styles.searchBarTask}>
      <form className={styles.form}>
        <label htmlFor="searchBar" className={styles.inputLabel}>
          Search by Id, date or name:
        </label>
        <input
          type="text"
          id="searchBar"
          ref={searchRef}
          onChange={() => {
            setSearchItem(searchRef.current.value);
          }}
        />
      </form>

      <section>
        <h3>
          <span>Id</span>
          <span>Date</span>
          <span>Name</span>
        </h3>
        <ul className={styles.dbList}>
          {noResult && <p>0 results found</p>}

          {newList.length === 0 &&
            !noResult &&
            list.map((element) => {
              return (
                <li key={element.id} className={styles.listItem}>
                  <p className={styles.dataCell}>{element.id}</p>
                  <p className={styles.dataCell}>{element.date}</p>

                  <p className={styles.dataCell}>{element.first_name}</p>
                </li>
              );
            })}
          {newList.length !== 0 &&
            !noResult &&
            newList.map((element) => {
              return (
                <li key={element.id} className={styles.listItem}>
                  <p className={styles.dataCell}>{element.id}</p>
                  <p className={styles.dataCell}>{element.date}</p>

                  <p className={styles.dataCell}>{element.first_name}</p>
                </li>
              );
            })}
        </ul>
      </section>
    </div>
  );
}

/*
2. Creaza un search bar care permite căutarea într-un array ( ales de
tine ), după un field numeric, unul de data și unul text. ( practic array-ul
sa aibă obiecte care conțin o proprietate text, una date și una number).
A. Search-ul trebuie sa se execute doar după ce utilizatorul a
terminat de scris, ex: dacă eu scriu un cuvânt și tastez normal,
programul se executa și se va efectua acțiunea pentru fiecare
litera scrisă de mine ( asta e comportamentul default ), noi nu
vrem asta, vrem ca acțiunea de search sa se întâmple doar după
ce am terminat de scris cuvântul
B. Daca ștergi totul din search sa se reseteze și sa apăra toată lista
*/
