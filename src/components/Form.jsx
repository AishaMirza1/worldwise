// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Spinner from "./Spinner"
import Message from "./Message"

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { useCities } from "../contexts/CityProvider";
 
function Form() {
  const navigate = useNavigate()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [isLoadingGeocodingError, setIsLoadingGeocodingError] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const[lat,lng] = useUrlPosition()
  const {createCity,isLoading} = useCities();
  const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
 
  async function handleSubmit(e){
     e.preventDefault()
     if(!cityName || !date) return

     const newCity = {
      cityName,
      country,
      date,
      notes,
      position:{lat,lng}
     }
    await createCity(newCity)
    navigate("/app/cities")
  }
  useEffect(()=>{
    if(!lat && !lng) return ;
    async function fetchCityData(){
      try{
         setIsLoadingGeocoding(true)
         setIsLoadingGeocodingError("")
         const res  = await fetch(`${BASE_URL}latitude=${lat}&longitude=${lng}`)
         const data =await res.json()
         if(!data.countryCode) throw new Error("this is not a city please click somwhere else")
         setCityName(data.city||data.locality)
         setCountry(data.countryName)
         console.log(data)
      }catch(err){
        console.log(err.message)
            setIsLoadingGeocodingError(err.message)
      }finally{
        setIsLoadingGeocoding(false)
        
      }
    }
    fetchCityData()
  },[lat,lng])
  if(isLoadingGeocoding) return <Spinner />
  if(!lat && !lng) return <Message message='please start by cicking somewhere!' />
  if(isLoadingGeocodingError) return <Message message={isLoadingGeocodingError} />
  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
       
         <DatePicker id="date" selected={date} onChange={(date) => setDate(date)} />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
       <Button type='primary' >Add</Button>
       <Button type='back' onClick={(e)=>{
          e.preventDefault();
          navigate(-1)
       }}>&larr; Back</Button>
        
      </div>
    </form>
  );
}

export default Form;