import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';

import css from './MenuMobile.css';

class OffScreenMenu extends Component {

  render() {
    const isOpenClass = this.props.isOpen ? css.offScreenMenuOpen : '';
    return div({
      className: `offscreenmenu ${css.offScreenMenu} ${isOpenClass}`,
    }, [
      div({
        className: `offscreenmenu_header ${css.offScreenHeader}`,
      }, 'header'),
      div({
        className: `offscreenmenu_main ${css.offScreenMain}`,
      }, 'content'),
      div({
        className: `offscreenmenu_footer ${css.offScreenFooter}`,
      }, 'footer'),
    ]);
  }
}

export default OffScreenMenu;
