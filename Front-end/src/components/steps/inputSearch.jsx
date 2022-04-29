import React, { useContext, useState } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import style from "./style.module.css";
import { StepperContext } from "../../contexts/StepperContext";

export default function LocationSearchInput() {
  const { userData, setUserData, errors } = useContext(StepperContext);

  const [address, setAddress] = useState("");

  const handleChange = (address) => {
    setAddress(address);
    setUserData({ ...userData, default_shipping_address: address });
  };

  const handleSelect = async (address) => {
    /* geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => console.log("Success", latLng))
      .catch((error) => console.error("Error", error)); */
    setAddress(address);
    setUserData({ ...userData, default_shipping_address: address });
  };

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className="text-black w-full flex flex-col">
          <p className="text-white mt-10">
            {userData["default_shipping_address"] || address}
          </p>
          <input
            className={`${
              !errors.default_shipping_address.validity
                ? style.error
                : undefined
            }`}
            value={userData["default_shipping_address"] || ""}
            {...getInputProps({
              placeholder: "Buscar Dirección...",
              className: "location-search-input rounded mt-10",
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map((suggestion) => {
              const className = suggestion.active
                ? "suggestion-item--active"
                : "suggestion-item";
              // inline style for demonstration purpose
              const style = suggestion.active
                ? { backgroundColor: "#fafafa", cursor: "pointer" }
                : { backgroundColor: "#ffffff", cursor: "pointer" };
              return (
                <div
                  {...getSuggestionItemProps(suggestion, {
                    className,
                    style,
                  })}
                >
                  <span>{suggestion.description}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}
