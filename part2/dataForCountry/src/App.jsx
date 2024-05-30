import { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((res) => {
        setCountries(res.data);
      })
      .catch((err) => {
        console.log("Something went wrong fetching the data", err);
      });
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    const filteredCountries = countries.filter((c) =>
      c.name.common.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filteredCountries);
  };

  return (
    <>
      <label>
        Search: <input type="text" value={search} onChange={handleSearch} />
      </label>
      <Countries
        filteredCountries={filteredCountries}
        setFilteredCountries={setFilteredCountries}
        search={search}
      ></Countries>
    </>
  );
}

export default App;
