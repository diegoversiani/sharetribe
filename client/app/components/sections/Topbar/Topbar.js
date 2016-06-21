import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';

import css from './Topbar.css';

import Logo from '../../elements/Logo/Logo';
import SearchBar from '../../composites/SearchBar/SearchBar';

function toRadians(degrees) {
  return degrees * (Math.PI/180);
}

function computeScale(a, b) {
  var R = 6371; // Earth's radius in km

  var lat1 = a.lat();
  var lat2 = b.lat();
  var lng1 = a.lng();
  var lng2 = b.lng();
  var lat1InRadians = toRadians(lat1);
  var lat2InRadians = toRadians(lat2);
  var latDiffInRadians = toRadians(lat2-lat1);
  var lngDiffInRadians = toRadians(lng2-lng1);

  // The haversine formula
  // 'a' is the square of half the chord length between the points
  var a = Math.sin(latDiffInRadians/2) * Math.sin(latDiffInRadians/2) +
        Math.cos(lat1InRadians) * Math.cos(lat2InRadians) *
        Math.sin(lngDiffInRadians/2) * Math.sin(lngDiffInRadians/2);
  // the angular distance in radians
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  // distance between coordinates
  var d = R * c;
  return d/2;
}

const coordinates = (place) => {
  if (place && place.geometry) {
    return place.geometry.location.toUrlValue();
  }
  return null;
};

const viewport = (place) => {
  if (place && place.geometry) {
    return place.geometry.viewport.toUrlValue();
  }
  return null;
};

const maxDistance = (place) => {
  if (place && place.geometry) {
    return computeScale(place.geometry.viewport.getNorthEast(),
                        place.geometry.viewport.getSouthWest());
  }
  return null;
};

class Topbar extends Component {
  render() {
    return div({ className: css.topbar }, [
      r(Logo, { ...this.props.logo, classSet: css.topbarLogo }),
      this.props.search ?
        r(SearchBar, {
          mode: this.props.search.mode,
          keywordPlaceholder: this.props.search.keyword_placeholder,
          locationPlaceholder: this.props.search.location_placeholder,
          onSubmit: ({ keywordQuery, locationQuery, place }) => {
            console.log({
              keywordQuery,
              locationQuery,
              coordinates: coordinates(place),
              viewport: viewport(place),
              maxDistance: maxDistance(place),
            });
          },
        }) :
      null,
    ]);
  }
}

Topbar.propTypes = {
  logo: PropTypes.shape(Logo.propTypes).isRequired,
  search: PropTypes.shape({
    mode: PropTypes.string,
    keyword_placeholder: PropTypes.string,
    location_placeholder: PropTypes.string,
  }).isRequired,
};

export default Topbar;
