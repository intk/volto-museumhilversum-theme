/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';

import WebSlidesBlocksComponent from '../WebSlides/WebSlidesBlocks';
import './WebSlidesView.less';

import { hasBlocksData } from '@plone/volto/helpers';

/**
 * Component to display the default view.
 * @function WebslidesView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const WebslidesBlocksView = ({ content, intl, location }) => {
  return hasBlocksData(content) ? (
    <>
      <BodyClass className={`webslides_view`} />
      <div
        id="page-document"
        className="ui container webslides-view columns-view"
      >
        <WebSlidesBlocksComponent content={content} location={location} />
      </div>
    </>
  ) : (
    <Container id="page-document webslides-view columns-view">
      {content.remoteUrl && (
        <span>
          The link address is:
          <a href={content.remoteUrl}>{content.remoteUrl}</a>
        </span>
      )}
      {content.text && (
        <div
          dangerouslySetInnerHTML={{
            __html: content.text.data,
          }}
        />
      )}
    </Container>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
WebslidesBlocksView.propTypes = {
  /**
   * Content of the object
   */
  content: PropTypes.shape({
    /**
     * Title of the object
     */
    title: PropTypes.string,
    /**
     * Description of the object
     */
    description: PropTypes.string,
    /**
     * Text of the object
     */
    text: PropTypes.shape({
      /**
       * Data of the text of the object
       */
      data: PropTypes.string,
    }),
  }).isRequired,
};

export default injectIntl(WebslidesBlocksView);
