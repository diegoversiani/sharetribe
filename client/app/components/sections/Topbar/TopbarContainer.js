import React from 'react';
import r from 'r-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Topbar from './Topbar';

import * as topbarActions from '../../../actions/topbarActions';
import * as ownPropTypes from '../../../utils/PropTypes';

const TopbarContainer = ({ actions, routes, logo, search, search_path }) =>
        r(Topbar, { actions, routes, logo, search, search_path });

TopbarContainer.propTypes = {
  actions: React.PropTypes.shape({
    submitSearch: React.PropTypes.func.isRequired,
  }).isRequired,
  routes: ownPropTypes.routes,
};

const mapStateToProps = (state) => ({
  routes: state.routes,
  query: state.topbar.query,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(topbarActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TopbarContainer);
