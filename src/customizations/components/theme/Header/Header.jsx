/* eslint-disable no-unused-vars */
/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container, Segment, Image, Label, Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Logo,
  Title,
  Navigation,
  LanguageSelector,
} from '@plone/volto/components';
import { LeadVideo } from '@package/components';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';
import ArrowDownImage from './ArrowDown.svg';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

import config from '@plone/volto/registry';

const headertranslations = {
  visit: {
    en: 'Plan your visit',
    nl: 'Plan je bezoek',
  },
  visit_link: {
    en: '/en/visit/practical-information',
    nl: '/nl/bezoek/praktische-informatie',
  },
  nowonview: {
    en: 'Now on view',
    nl: 'Nu te zien',
  },
  expected: {
    en: 'Expected',
    nl: 'Verwacht',
  },
  past: {
    en: 'Past',
    nl: 'Geweest',
  },
};

const getDateLabel = (start, end) => {
  const today = new Date();
  const start_date = new Date(start);
  const end_date = new Date(end);
  today.setHours(0, 0, 0, 0);

  if (start_date > today) {
    return 'expected';
  } else if (end_date < today) {
    return 'past';
  } else {
    return 'nowonview';
  }
};

/**
 * Header component class.
 * @class Header
 * @extends Component
 */
class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
    content: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string,
      preview_image: PropTypes.any,
      youtube_id: PropTypes.any,
      preview_caption: PropTypes.any,
    }),
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
    content: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    var contentBlockFieldsName = null;
    var contentLayout = null;

    const content = this.props.content;
    var preview_image = content?.preview_image;
    const is_event = (content && content['@type'] === 'Event') || false;
    const is_news_item = (content && content['@type'] === 'News Item') || false;
    const blocksFieldname = getBlocksFieldname(content);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

    if (!preview_image) {
      preview_image = content?.image;
    }

    if (blocksFieldname && blocksFieldname in content) {
      contentBlockFieldsName = content[blocksFieldname];
    } else {
      contentBlockFieldsName = null;
    }

    if (blocksLayoutFieldname && blocksLayoutFieldname in content) {
      contentLayout = content[blocksLayoutFieldname];
    } else {
      contentLayout = null;
    }

    const headerItems = contentLayout?.items;

    const renderHeaderBlock =
      (headerItems &&
        contentBlockFieldsName &&
        headerItems.length > 0 &&
        contentBlockFieldsName?.[headerItems[0]]?.['@type'] === 'imagecards') ||
      (contentBlockFieldsName?.[headerItems[0]]?.['@type'] === 'listing' &&
        contentBlockFieldsName?.[headerItems[0]]?.['variation'] ===
          'slider_header') ||
      false;

    var Block = null;
    var headerBlockID = null;

    if (renderHeaderBlock) {
      headerBlockID = headerItems[0];
      Block =
        config.blocks.blocksConfig[
          contentBlockFieldsName?.[headerBlockID]?.['@type']
        ]?.['view'] || null;
    }

    return (
      <Segment
        basic
        className={`header-wrapper ${
          content?.subjects?.includes('no-title') ? 'no-title' : ''
        } ${
          content?.subjects?.includes('header-button') ? 'header-button' : ''
        } ${preview_image ? '' : 'no-preview-image'}`}
        role="banner"
      >
        <Menu inverted borderless className="fixed-navigation">
          <Menu.Item header>
            <Logo />
          </Menu.Item>

          <Menu.Menu position="right">
            <Menu.Item>
              <NavLink
                to={headertranslations['visit_link'][this.props.lang]}
                key={headertranslations['visit_link'][this.props.lang]}
              >
                {headertranslations['visit'][this.props.lang]}
              </NavLink>
            </Menu.Item>
            <Menu.Item className="item-language-selector">
              <LanguageSelector />
            </Menu.Item>
            <Menu.Item className="item-hamburger no-padding-right no-padding-left">
              <Navigation pathname={this.props.pathname} />
            </Menu.Item>
          </Menu.Menu>
        </Menu>

        {preview_image && !content?.youtube_id && !Block && (
          <Container fluid className="header-image-container">
            <div className="header-image-wrapper">
              <Image
                fluid
                className="lead-image"
                src={preview_image.scales.large.download}
                alt={
                  content.preview_caption
                    ? content.preview_caption
                    : content.title
                }
              />
            </div>
          </Container>
        )}

        {renderHeaderBlock && !content?.youtube_id && (
          <div className="header-carousel-wrapper">
            <Block
              key={headerBlockID}
              id={headerBlockID}
              properties={content}
              data={content[blocksFieldname][headerBlockID]}
              path={getBaseUrl('')}
            />
          </div>
        )}

        {content?.youtube_id && (
          <Container fluid className="header-image-container">
            <LeadVideo content={content} />
          </Container>
        )}

        {content?.preview_caption && !renderHeaderBlock && (
          <Container fluid className="header-image-caption">
            <p className="preview-image-caption">{content.preview_caption}</p>
          </Container>
        )}

        {content?.layout &&
          !['multiplecontent_view', 'homepage_view'].includes(
            content?.layout,
          ) && (
            <Container fluid className="header-title-container">
              <div className="header">
                <div className="title-nav-wrapper">
                  {is_event && (
                    <div className="label-wrapper">
                      <Label color="black">
                        {
                          headertranslations[
                            getDateLabel(content.start, content.end)
                          ][this.props.lang]
                        }
                      </Label>
                    </div>
                  )}
                  <Title title={content?.title} />
                  {content?.description && (
                    <p className="documentDescription">{content.description}</p>
                  )}
                  {content?.start && (
                    <>
                      <When
                        start={content.start}
                        end={content.end}
                        whole_day={content.whole_day}
                        open_end={content.open_end}
                      />
                    </>
                  )}
                  {is_news_item && content?.effective && (
                    <>
                      <When
                        start={content.effective}
                        end={content.effective}
                        whole_day={true}
                        open_end={false}
                      />
                    </>
                  )}
                </div>
              </div>
            </Container>
          )}
      </Segment>
    );
  }
}

export default connect((state) => ({
  token: state.userSession.token,
  content: state.content.data,
  lang: state.intl.locale,
}))(Header);
