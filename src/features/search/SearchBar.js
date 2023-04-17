import React, { useState, useCallback } from "react";
import styles from "./SearchBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { fetchSearch } from "./searchAPI";
import debounce from "lodash.debounce";

export const SearchBar = () => {
  const [searchString, setSearchString] = useState("");
  const [results, setResults] = useState([]);
  const search = async (searchString) => {
    const data = await fetchSearch(searchString);
    setResults(data);
  };
  const debounceSearch = useCallback(debounce(search, 300), []);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.searchIcon}>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </div>
        <input
          className={styles.searchBar}
          type="text"
          alt="search text"
          onChange={async (e) => {
            setSearchString(e.target.value);
            debounceSearch(searchString);
          }}
          value={searchString}
        ></input>
      </div>
      {results.length > 0 && searchString.length > 0 && (
        <div className={styles.results}>
          <ul>
            {results.map((el) => (
              <>
                <li>
                  <img src={el.image} alt={`image for ${el.name}`} />
                  <div>
                    <p className={styles.title}>{el.title}</p>
                    <p className={styles.subtitle}>{el.subtitle}</p>
                  </div>
                </li>

                <hr></hr>
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};
