import { Component, PropTypes } from 'react';
import r, { div } from 'r-dom';

import css from './MenuMobile.css';
import MenuSection from './MenuSection';

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
      }, [
        r(MenuSection, {
          name: this.props.menuLinksTitle,
          color: this.props.color,
          links: this.props.menuLinks,
        }),
      ]),
      div({
        className: `offscreenmenu_footer ${css.offScreenFooter}`,
      }, 'footer'),
    ]);
  }
}

OffScreenMenu.propTypes = {
  color: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  menuLinksTitle: PropTypes.string.isRequired,
  menuLinks: PropTypes.arrayOf(
    PropTypes.shape({
      active: PropTypes.bool.isRequired,
      activeColor: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default OffScreenMenu;
