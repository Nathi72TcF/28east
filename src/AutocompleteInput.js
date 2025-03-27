import React, { useState, useRef } from 'react';
import Autocomplete from 'react-google-autocomplete';

const AutocompleteInput = ({ onPlaceSelected }) => {
    const [inputValue, setInputValue] = useState('');
    const autocompleteRef = useRef(null);
  
    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };
  
    const handleSearchClick = () => {
      const autocomplete = autocompleteRef.current;
      if (autocomplete && autocomplete.getPlace()) {
        onPlaceSelected(autocomplete.getPlace());
      }
    };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Autocomplete
        apiKey="Google API Key"
        ref={autocompleteRef}
        onPlaceSelected={onPlaceSelected}
        types={['address']}
        componentRestrictions={{ country: 'za' }} // Optional: Restrict to South Africa
        fields={['geometry', 'formatted_address']}
        placeholder="Search for a location"
        style={{ width: '300px', padding: '10px', margin: '20px 0' }}
        value={inputValue}
        onChange={handleInputChange}
      />
      <button onClick={handleSearchClick} style={{ padding: '10px', marginTop: '10px' }}>
        Search
      </button>
    </div>
  );
  }

export default AutocompleteInput;
