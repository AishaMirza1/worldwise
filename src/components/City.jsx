
import { useParams,useSearchParams } from "react-router-dom";


import styles from "./City.module.css";
// import Spinner from "./Spinner";

// const formatDate = (date) =>
//   new Intl.DateTimeFormat("en", {
//     day: "numeric",
//     month: "long",
//     year: "numeric",
//     weekday: "long",
//   }).format(new Date(date));

function City() {
  const {id} = useParams()
  const [searchParams,setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  return (
    <div className={styles.city}>
       
  <h1> city {id}</h1>
      <p>position {lat} , {lng}</p>
      <button onClick={()=>setSearchParams()}></button>
    </div>
  );
}

export default City;
