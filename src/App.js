import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import AutocompleteInput from './AutocompleteInput';

const apiKey = 'AIzaSyC5CswQ7gz5vOrOPfGnlCCrN44xJ3zU384'; 

const App = () => {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [info, setInfo] = React.useState('');

  const onPlaceSelected = (place) => {
    const location = place.geometry.location;
    setSelectedPlace({ lat: location.lat(), lng: location.lng() });
    setInfo(getFunDetails(place)); // Replace with more fun details if needed
  };

  const onMapClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setSelectedPlace(location);
    setInfo(getFunDetails({ geometry: { location } })); // Get fun details
  };

  const getFunDetails = (place) => {
    // Replace this with actual API call or fun details logic
    return `Fun details about ${place.formatted_address || 'the selected location'}`;
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AutocompleteInput onPlaceSelected={onPlaceSelected} />
      <GoogleMap
          onClick={onMapClick}
          mapContainerStyle={{ height: '700px', width: '100%' }}
          zoom={13}
          center={{ lat: -26.031921, lng: 28.185995 }}
        >
          {selectedPlace && <Marker position={selectedPlace} />}
          {selectedPlace && (
            <InfoWindow position={selectedPlace} onCloseClick={() => setSelectedPlace(null)}>
              <div>{info}</div>
            </InfoWindow>
          )}
        </GoogleMap>
 
      </div>
    </LoadScript>
  ); 
};

export default App;
