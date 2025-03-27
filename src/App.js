import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import AutocompleteInput from './AutocompleteInput';

const apiKey = 'Google API Key'; 

const App = () => {
  const [selectedPlace, setSelectedPlace] = React.useState(null);
  const [info, setInfo] = React.useState('');
  const [mapCenter, setMapCenter] = useState({ lat: -26.031921, lng: 28.185995 });

  const onPlaceSelected = (place) => {
    if (place.geometry) {
      const location = place.geometry.location;
      const newCenter = { lat: location.lat(), lng: location.lng() };
      setSelectedPlace(newCenter);
      setMapCenter(newCenter);
      setInfo(getFunDetails(place));
    }
  };

  const onMapClick = (event) => {
    const location = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    setSelectedPlace(location);
    setMapCenter(location);
    setInfo(getFunDetails({ geometry: { location } }));
  };

  const getFunDetails = (place) => {
    return `Fun details about ${place.formatted_address || 'the selected location'}`;
  };

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AutocompleteInput onPlaceSelected={onPlaceSelected} />
      <GoogleMap
          onClick={onMapClick}
          mapContainerStyle={{ height: '700px', width: '100%' }}
          zoom={10}
          center={mapCenter} 
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
