/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import { BodyClass } from '@plone/volto/helpers';
import { Container } from 'semantic-ui-react';

import WebSlidesComponent from '../WebSlides/WebSlides';
import './WebSlidesView.less';

import { getBlocksLayoutFieldname, hasBlocksData } from '@plone/volto/helpers';

/**
 * Component to display the default view.
 * @function WebslidesView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */

const WebslidesView = ({ content, intl, location }) => {
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const webslidesItems = content[blocksLayoutFieldname].items;
  /*componentWillUnmount() {
    document.documentElement.classList.remove('ws-ready');
  }*/

  return hasBlocksData(content) ? (
    <>
      <BodyClass className={`webslides_view`} />
      <div
        id="page-document"
        className="ui container webslides-view columns-view"
      >
        <WebSlidesComponent items={webslidesItems} />
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
WebslidesView.propTypes = {
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

export default injectIntl(WebslidesView);
