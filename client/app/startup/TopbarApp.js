import r from 'r-dom';
import { combineReducers, applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import { initialize as initializeI18n } from '../utils/i18n';
import { subset } from '../utils/routes';
import middleware from 'redux-thunk';
import reducers from '../reducers/reducersIndex';
import TopbarContainer from '../components/sections/Topbar/TopbarContainer';

export default (props, railsContext) => {
  initializeI18n(railsContext.i18nLocale, railsContext.i18nDefaultLocale, process.env.NODE_ENV);

  const routes = subset([
    // 'search_path',
  ], { locale: railsContext.i18nLocale });

  const combinedReducer = combineReducers(reducers);
  const combinedProps = Object.assign({}, props, { routes });

  const store = applyMiddleware(middleware)(createStore)(combinedReducer, combinedProps);

  return r(Provider, { store }, [
    r(TopbarContainer),
  ]);
};
