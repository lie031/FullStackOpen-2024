import Weather from "./Weather";

const Countries = ({ filteredCountries, setFilteredCountries, search }) => {

  if (search === ""){
    return;
  }
   
  if (filteredCountries.length > 10) {
    return <p>too many matches</p>;
  }
  else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((l) => (
            <li key={l}>{l}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt="" />
        <Weather city={country.capital}></Weather>
      </div>
    );
  } else {
    return filteredCountries.map((c) => (
      <div key={c.name.common}>
        <p>
          {c.name.common}{" "}
          <button onClick={() => setFilteredCountries([c])}>show</button>
        </p>
      </div>
    ));
  }
};

export default Countries;
