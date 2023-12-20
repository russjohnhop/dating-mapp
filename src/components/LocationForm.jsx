import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationForm({
  userAddress,
  setUserAddress,
  userCoordinates,
  setUserCoordinates,
  partnerAddress,
  setPartnerAddress,
  partnerCoordinates,
  setPartnerCoordinates,
  error,
  handleSubmit,
}) {
  // const [coordinates, setCoordinates] = React.useState({
  //   lat: null,
  //   lng: null,
  // });
  const handleSelectUser = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setUserAddress(value);
    setUserCoordinates(latLng);
  };

  const handleSelectPartner = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setPartnerAddress(value);
    setPartnerCoordinates(latLng);
  };

  return (
    <div>
      <h1>Enter Your Location</h1>

      <PlacesAutocomplete
        value={userAddress}
        onChange={setUserAddress}
        onSelect={handleSelectUser}
        searchOptions={{
          componentRestrictions: {
            country: "uk",
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <h1>Enter Your Date's Location</h1>

      <PlacesAutocomplete
        value={partnerAddress}
        onChange={setPartnerAddress}
        onSelect={handleSelectPartner}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div {...getSuggestionItemProps(suggestion, { style })}>
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
}
