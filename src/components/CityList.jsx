import Spinner from "./Spinner";
import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message"
  /* eslint-disable react/prop-types */


function CityList({cities,isLoading}) {


  if (isLoading) return <Spinner />;

  if(!cities) return <Message message="add your first city by clicking in map" />

  return  <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  
}

export default CityList;
