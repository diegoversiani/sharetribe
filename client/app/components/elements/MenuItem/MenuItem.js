import { Component, PropTypes } from 'react';
import { div, a, span } from 'r-dom';

import styleVariables from '../../../assets/styles/variables';
import css from './MenuItem.css';

class MenuItem extends Component {

  constructor(props, context) {
    super(props, context);
    this.activeColor = this.props.activeColor || styleVariables.customColorFallback;
  }

  render() {
    return div({ className: css.menuitem }, [
      this.props.active ?
        span({
          className: css.activeIndicator,
          style: { backgroundColor: this.activeColor },
        }) :
        null,
      a(
        {
          className: `menuitem ${css.menuitemLink}`,
          href: this.props.href,
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
  href: string.isRequired,
  index: number.isRequired,
  type: string.isRequired,
};

export default MenuItem;
