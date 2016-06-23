import { Component, PropTypes } from 'react';
import { div, a, span } from 'r-dom';

import css from './MenuItem.css';

class MenuItem extends Component {

  constructor(props, context) {
    super(props, context);
    this.activeColor = this.props.activeColor || '#a64c5d';
    this.textColor = this.props.active ? '#4A4A4A ' : this.props.textColor || '#a64c5d';
  }

  render() {
    const extraClasses = this.props.extraClasses ? this.props.extraClasses : '';
    const extraClassesLink = this.props.extraClassesLink ? this.props.extraClassesLink : '';

    return div({ className: `${css.menuitem}  ${extraClasses}` }, [
      this.props.active ?
        span({
          className: css.activeIndicator,
          style: { backgroundColor: this.activeColor },
        }) :
        null,
      a(
        {
          className: `menuitem ${css.menuitemLink} ${extraClassesLink}`,
          href: this.props.href,
          style: { color: this.textColor },
        },
        this.props.content),
    ]);
  }
}

const { bool, number, string } = PropTypes;

MenuItem.propTypes = {
  active: bool.isRequired,
  activeColor: string.isRequired,
  content: string.isRequired,
  extraClasses: string,
  extraClassesLink: string,
  href: string.isRequired,
  index: number.isRequired,
  textColor: string,
  type: string.isRequired,
};

export default MenuItem;
