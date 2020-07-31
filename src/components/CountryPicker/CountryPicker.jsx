import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import styles from "./CountryPicker.module.css";
import { fetchCountries } from "../../api";

const Country = ({ handleCountryChange }) => {
  const [fetechedCountries, setFetechedCountries] = useState([]);

  useEffect(() => {
    const fetchCountriesFromAPI = async () => {
      setFetechedCountries(await fetchCountries());
    };
    fetchCountriesFromAPI();
  }, []);

  return (
    <FormControl className={styles.formControl}>
      <NativeSelect
        defaultValue=""
        onChange={(e) => handleCountryChange(e.target.value)}
      >
        <option value="">Global</option>
        {fetechedCountries.map((country, index) => (
          <option key={index} value={country}>
            {country}
          </option>
        ))}
      </NativeSelect>
    </FormControl>
  );
};

export default Country;
