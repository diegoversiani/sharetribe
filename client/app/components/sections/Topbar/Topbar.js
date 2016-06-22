/* eslint-disable no-console */

import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';
import { routes } from '../../../utils/PropTypes';
import * as placesUtils from '../../../utils/places';

import css from './Topbar.css';

import Logo from '../../elements/Logo/Logo';
import SearchBar from '../../composites/SearchBar/SearchBar';

const parseQuery = (searchQuery) => {
  const parts = (searchQuery || '')
          .replace(/^\?/, '')
          .replace(/#.*$/, '')
          .split('&');

  return parts.reduce((params, keyval) => {
    const pair = keyval.split('=');
    const pairLength = 2;
    if (pair.length === pairLength) {
      params[pair[0]] = decodeURIComponent(pair[1]); // eslint-disable-line no-param-reassign
    }
    return params;
  }, {});
};

const currentSearchParams = (searchQuery) => {
  const PARAMS_TO_KEEP = ['view', 'locale'];
  const parsedParams = parseQuery(searchQuery);

  return Object.keys(parsedParams).reduce((params, key) => {
    if (PARAMS_TO_KEEP.includes(key)) {
      params[key] = parsedParams[key]; // eslint-disable-line no-param-reassign
    }
    return params;
  }, {});
};

const isValid = (value) => typeof value === 'number' && !isNaN(value) || !!value;

const createQuery = (searchParams) => {
  const extraParams = currentSearchParams(window.location.search);
  const params = { ...extraParams, ...searchParams };

  console.log('creating query string from params:', params);
  const paramKeys = Object.keys(params);
  paramKeys.sort();

  return paramKeys.reduce((url, key) => {
    const val = params[key];

    if (!isValid(val)) {
      return url;
    }

    return `${url}${url ? '&' : '?'}${key}=${encodeURIComponent(val)}`;
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
          keywordQuery: this.props.search.keyword_query,
          locationQuery: this.props.search.location_query,
          onSubmit: ({ keywordQuery, locationQuery, place }) => {
            console.log({
              keywordQuery,
              locationQuery,
              coordinates: placesUtils.coordinates(place),
              viewport: placesUtils.viewport(place),
              maxDistance: placesUtils.maxDistance(place),
            });
            const query = createQuery({
              q: keywordQuery,
              lq: locationQuery,
              lc: placesUtils.coordinates(place),
              boundingbox: placesUtils.viewport(place),
              distance_max: placesUtils.maxDistance(place),
            });
            const searchUrl = `${this.props.search_path}${query}`;
            console.log('Search URL:', `"${searchUrl}"`);

            // window.location.assign(searchUrl);
            this.actions.submitSearch(query);
          },
        }) :
      null,
    ]);
  }
}

Topbar.propTypes = {
  actions: PropTypes.shape({
    submitSearch: PropTypes.func.isRequired,
  }).isRequired,
  routes,
  logo: PropTypes.shape(Logo.propTypes).isRequired,
  search: PropTypes.shape({
    mode: PropTypes.string.isRequired,
    keyword_placeholder: PropTypes.string.isRequired,
    location_placeholder: PropTypes.string.isRequired,
    keyword_query: PropTypes.string,
    location_query: PropTypes.string,
  }),
  search_path: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
};

export default Topbar;
