import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "../button/Button";
import { useNavigate } from "react-router-dom";
import useUrlPosition from "../../hooks/useUrlPosition";
import Spinner from "../spinner/Spinner";
import Message from "../message/Message";
import { Timestamp, GeoPoint } from "@firebase/firestore/lite";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useCities } from "../../contexts/citiesContext";
import { v4 as uuidv4 } from 'uuid';
import { jwtDecode } from "jwt-decode";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const url = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const navigate = useNavigate();
  const {addCity, isLoading} = useCities()
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const [isGoeLoading, setIsGeoLoading] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const decodedToken = jwtDecode(localStorage.getItem('token'))
  useEffect(() => {
    async function fetchCountry() {
      if (!lat && !lng) return;
      setIsGeoLoading(true);
      setGeocodingError("");
      try {
        const res = await fetch(`${url}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName || "");
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeocodingError(err.message);
      } finally {
        setIsGeoLoading(false);
      }
    }
    fetchCountry();
  }, [lat, lng]);

  const handleSubmit = async(e)=>{
    e.preventDefault()
    if (!cityName || !date) return;
    const city = {
      city_name: cityName,
      id: uuidv4(),
      userId: decodedToken.user_id,
      country,
      emoji,
      date: Timestamp.fromDate(new Date(date)),
      position: new GeoPoint(lat, lng),
      notes
    }
   await addCity(city)
   navigate('/app/cities')
  }
  if (isGoeLoading) return <Spinner />;

  if (!lat && !lng)
    return <Message message="Start by clicking somewhere on the map" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form className={`${styles.form} ${isLoading? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker selected={date} dateFormat="dd/MM/yyyy" onChange={(date) => setDate(date)} />
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
        <Button type="primary">add</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </form>
  );
}

export default Form;
