import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import  { sortPlacesByDistance } from '../loc.js'
import {fetchAvaliablePlaces} from "../http.js"

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvaliablePlaces] = useState([]);
  const [isFatch, setIsFatching] = useState(false)
  const [error, setError] = useState();

  useEffect(() => {

    async function fetchPlaces() {
      setIsFatching(true)
      try {
        const places = await fetchAvaliablePlaces();
        navigator.geolocation.getCurrentPosition((position)=>{
          const sortedPlaces = sortPlacesByDistance(places, position.coords.latitude, position.coords.longitude)
          setAvaliablePlaces(sortedPlaces)
          setIsFatching(false)
        })
        
      } catch (error) {
        setError({message: error.message || 'Could not fetch places, please try agiain later.'})
        setIsFatching(false)
      }
      
    }
    fetchPlaces();
  }, [])
  if (error) {
    return <Error title="An error occurs" message={error.message} />
  }
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFatch}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
