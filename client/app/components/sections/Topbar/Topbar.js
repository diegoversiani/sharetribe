import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';

import css from './Topbar.css';

import Logo from '../../elements/Logo/Logo';
import SearchBar from '../../composites/SearchBar/SearchBar';

const toRadians = (degrees) => degrees * (Math.PI / 180); // eslint-disable-line no-magic-numbers

const computeScale = (pointA, pointB) => {
  /* eslint-disable no-magic-numbers */

  const EARTH_RADIUS = 6371;

  const lat1 = pointA.lat();
  const lat2 = pointB.lat();
  const lng1 = pointA.lng();
  const lng2 = pointB.lng();
  const lat1InRadians = toRadians(lat1);
  const lat2InRadians = toRadians(lat2);
  const latDiffInRadians = toRadians(lat2 - lat1);
  const lngDiffInRadians = toRadians(lng2 - lng1);

  // The haversine formula
  // 'a' is the square of half the chord length between the points
  const a = Math.sin(latDiffInRadians / 2) * Math.sin(latDiffInRadians / 2) +
          Math.cos(lat1InRadians) * Math.cos(lat2InRadians) *
          Math.sin(lngDiffInRadians / 2) * Math.sin(lngDiffInRadians / 2);

  // the angular distance in radians
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // distance between coordinates
  const d = EARTH_RADIUS * c;

  return d / 2;

  /* eslint-enable no-magic-numbers */
};

const coordinates = (place) => {
  if (place && place.geometry) {
    return place.geometry.location.toUrlValue();
  }
  return null;
};

const viewport = (place) => {
  if (place && place.geometry && place.geometry.viewport) {
    return place.geometry.viewport.toUrlValue();
  }
  return null;
};

const maxDistance = (place) => {
  if (place && place.geometry && place.geometry.viewport) {
    return computeScale(place.geometry.viewport.getNorthEast(),
                        place.geometry.viewport.getSouthWest());
  }
  return null;
};

const parseQuery = (searchQuery) => {
  return {
    view: 'some%20view',
    locale: 'fi,en',
  };
};

const currentSearchParams = (searchQuery) => {
  const PARAMS_TO_KEEP = ['view', 'locale'];
  const parsedParams = parseQuery(searchQuery);

  return Object.keys(parsedParams).reduce((params, key) => {
    if (PARAMS_TO_KEEP.includes(key)) {
      params[key] = decodeURIComponent(parsedParams[key]); // eslint-disable-line no-param-reassign
    }
    return params;
  }, {});
};

const createQuery = (searchParams) => {
  const extraParams = currentSearchParams(window.location.search);
 const params = { ...extraParams, ...searchParams };

  return Object.keys(params).reduce((url, key) => {
    const val = params[key];
    const value = (val == null) ? '' : encodeURIComponent(val);
    return `${url}${url ? '&' : '?'}${key}=${value}`;
  }, '');
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
            const query = createQuery({
              q: keywordQuery,
              lc: coordinates(place),
              ls: 'OK', // TODO: is this relevant?
              boundingbox: viewport(place),
              distance_max: maxDistance(place),
            });
            console.log('new query string:', query);
            window.location.assign(query);
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
