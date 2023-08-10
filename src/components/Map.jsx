import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css"

function Map() {
  const navigate = useNavigate()
  const [searchParams,setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  return (
    <div className={styles.mapContainer} onClick={()=>navigate("form")}>
      map  {lat} , {lng}
      <button onClick={()=>setSearchParams({lat:23,lng:40})}>change params</button>
    </div>
  );
}



export default Map;
