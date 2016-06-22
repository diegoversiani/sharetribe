import * as actionTypes from '../constants/topbarConstants';

export const submitSearch = (query) => ({
  type: actionTypes.TOPBAR_SEARCH_SUBMIT,
  payload: { query },
});
