import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

class LocationSearchInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        address: '',
        addressSelected: false,
      };
    }
  
    handleChange = (address) => {
        this.setState({
          address,
          addressSelected: false, // Réinitialise addressSelected à false lors de la modification de l'adresse
        });
      };
  
    handleSelect = (address) => {
      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          this.setState({
            address,
            addressSelected: true,
          });
          if (this.props.onAddressSelect) {
            this.props.onAddressSelect(address);
          }
        })
        .catch((error) => console.error('Error', error));
    };
  
    render() {
      const { address } = this.state;
      
      const searchOptions = {
        componentRestrictions: { country: 'fr' },
        types: ['address'],
      };
      return (
        <PlacesAutocomplete
          value={address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
          searchOptions={searchOptions}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <input
                {...getInputProps({
                  placeholder: 'Recherche ...',
                  className: 'location-search-input',
                })}
              />
              <div className="autocomplete-dropdown-container">
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion, index) => {
                  const className = suggestion.active
                    ? 'suggestion-item--active'
                    : 'suggestion-item';
                  // inline style for demonstration purpose
                  const style = suggestion.active
                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
  
                  return (
                    <div
                      key={index} // Ajoutez cette ligne avec une clé unique
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
  }
  
  export default LocationSearchInput;
  