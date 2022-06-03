/**
 * Navigation components.
 * @module components/theme/Navigation/Navigation
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { Menu } from 'semantic-ui-react';
import cx from 'classnames';
import { BodyClass, getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { getNavigation } from '@plone/volto/actions';
import { CSSTransition } from 'react-transition-group';
import NavItems from '@plone/volto/components/theme/Navigation/NavItems';
import { SearchWidget } from '@plone/volto/components';

const messages = defineMessages({
  closeMobileMenu: {
    id: 'Close menu',
    defaultMessage: 'Close menu',
  },
  openMobileMenu: {
    id: 'Open menu',
    defaultMessage: 'Open menu',
  },
});

/**
 * Navigation container class.
 * @class Navigation
 * @extends Component
 */
class Navigation extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getNavigation: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string,
      }),
    ).isRequired,
    lang: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Navigation
   */
  constructor(props) {
    super(props);
    this.toggleMobileMenu = this.toggleMobileMenu.bind(this);
    this.closeMobileMenu = this.closeMobileMenu.bind(this);
    this.state = {
      isMobileMenuOpen: false,
    };
    this.container = React.createRef();
  }

  componentDidMount() {
    const { settings } = config;
    if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
      this.props.getNavigation(
        getBaseUrl(this.props.pathname),
        settings.navDepth,
      );
    }
  }

  handleClickOutsideNav = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      console.log(event.target);
      this.setState({
        isMobileMenuOpen: false,
      });
    }
  };

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentDidUpdate(nextProps) {
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      this.props.getNavigation(
        getBaseUrl(nextProps.pathname),
        config.settings?.navDepth,
      );
      this.closeMobileMenu();
    }

    // Hide submenu on route change
    if (document.querySelector('body')) {
      document.querySelector('body').click();
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { settings } = config;
    if (
      nextProps.pathname !== this.props.pathname ||
      nextProps.token !== this.props.token
    ) {
      if (!hasApiExpander('navigation', getBaseUrl(this.props.pathname))) {
        this.props.getNavigation(
          getBaseUrl(nextProps.pathname),
          settings.navDepth,
        );
      }
    }
  }

  /**
   * Toggle mobile menu's open state
   * @method toggleMobileMenu
   * @returns {undefined}
   */
  toggleMobileMenu() {
    this.setState({ isMobileMenuOpen: !this.state.isMobileMenuOpen }, () => {
      if (this.state.isMobileMenuOpen) {
        document.addEventListener('mousedown', this.handleClickOutsideNav);
      }
    });
  }

  /**
   * Close mobile menu
   * @method closeMobileMenu
   * @returns {undefined}
   */
  closeMobileMenu() {
    if (!this.state.isMobileMenuOpen) {
      console.log('do not close it');
      return;
    }
    this.setState({ isMobileMenuOpen: false }, () => {
      console.log('close it');
      document.removeEventListener('mousedown', this.handleClickOutsideNav);
    });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <nav className="navigation" id="navigation" ref={this.container}>
        <div className="hamburger-wrapper">
          <button
            className={cx('hamburger hamburger--spin', {
              'is-active': this.state.isMobileMenuOpen,
            })}
            aria-label={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            title={
              this.state.isMobileMenuOpen
                ? this.props.intl.formatMessage(messages.closeMobileMenu, {
                    type: this.props.type,
                  })
                : this.props.intl.formatMessage(messages.openMobileMenu, {
                    type: this.props.type,
                  })
            }
            type="button"
            onClick={this.toggleMobileMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner" />
            </span>
          </button>
        </div>

        <CSSTransition
          in={this.state.isMobileMenuOpen}
          timeout={500}
          classNames="mobile-menu"
          unmountOnExit
        >
          <div key="mobile-menu-key" className="mobile-menu">
            <BodyClass className="has-mobile-menu-open" />
            <div className="mobile-menu-nav">
              <Menu stackable pointing secondary>
                <NavItems items={this.props.items} lang={this.props.lang} />
                <div className="menu-search-wrapper">
                  <SearchWidget />
                </div>
                <div className="menu-social-media">
                  <h5>
                    <a
                      className="social-media-link"
                      href="https://twitter.com/museumhilversum"
                    >
                      Twitter
                    </a>
                  </h5>
                  <h5>
                    <a
                      href="https://www.instagram.com/museumhilversum/"
                      className="social-media-link"
                    >
                      Instagram
                    </a>
                  </h5>
                  <h5>
                    <a
                      href="https://www.facebook.com/MuseumHilversum"
                      className="social-media-link"
                    >
                      Facebook
                    </a>
                  </h5>
                </div>
              </Menu>
            </div>
          </div>
        </CSSTransition>
      </nav>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      lang: state.intl.locale,
    }),
    { getNavigation },
  ),
)(Navigation);
