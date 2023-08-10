import styles from "./CountryItem.module.css";

function CountryItem({ country }) {
  console.log(country)
  return (
    <li className={styles.countryItem}>
     
      <span>{country.emoji}</span>
      <h2>{country.country}</h2>
    </li>
  );
}

export default CountryItem;
