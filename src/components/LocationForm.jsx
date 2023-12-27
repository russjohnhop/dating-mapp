import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

export default function LocationForm({
  userAddress,
  setUserAddress,
  setUserCoordinates,
  partnerAddress,
  setPartnerAddress,
  setPartnerCoordinates,
}) {
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
    <div className="font-mono bg-black text-white w-full pb-4 ">
      <h1 className="flex text-xl align-middle justify-center m-4 font-mono bg-black text-white pt-3">
        Let's meet in the middle
      </h1>
      <h2 className="pb-2 flex align-middle justify-center">
        Enter Your Location
      </h2>

      <PlacesAutocomplete
        value={userAddress}
        onChange={setUserAddress}
        onSelect={handleSelectUser}
        searchOptions={{
          componentRestrictions: {
            country: ["uk"],
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
            key={suggestions.description}
            className="text-black pb-3 flex align-middle justify-center"
          >
            <input {...getInputProps({ placeholder: "Type address" })} />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
                    {suggestion.description}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>

      <h2 className="pb-2 flex align-middle justify-center">
        Enter Your Date's Location
      </h2>

      <PlacesAutocomplete
        value={partnerAddress}
        onChange={setPartnerAddress}
        onSelect={handleSelectPartner}
        searchOptions={{
          componentRestrictions: {
            country: ["uk"],
          },
        }}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div
            key={suggestions.description}
            className="text-black pb-3 flex align-middle justify-center"
          >
            <input
              className="flex align-middle justify-center"
              {...getInputProps({ placeholder: "Type address" })}
            />
            <div>
              {loading ? <div>...loading</div> : null}

              {suggestions.map((suggestion, index) => {
                const style = {
                  backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                };
                return (
                  <div
                    key={index}
                    {...getSuggestionItemProps(suggestion, { style })}
                  >
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
