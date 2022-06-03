/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import { Container } from 'semantic-ui-react';
import { map } from 'lodash';
import config from '@plone/volto/registry';

import {
  getBlocksFieldname,
  getBlocksLayoutFieldname,
  hasBlocksData,
  getBaseUrl,
} from '@plone/volto/helpers';

/**
 * Component to display the default view.
 * @function MultipleContentView
 * @param {Object} content Content object.
 * @returns {string} Markup of the component.
 */
const MultipleContentView = ({ content, intl, location }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);

  return hasBlocksData(content) ? (
    <div
      id="page-document"
      className={`ui container multiplecontent-view ${
        content.subjects?.includes('alternate-color') ? 'alternate-color' : ''
      } ${content.subjects?.includes('header-button') ? 'header-button' : ''}`}
    >
      <div
        className={
          content.subjects?.includes('wideimage')
            ? 'content-core wideimage'
            : 'content-core'
        }
      >
        {map(content[blocksLayoutFieldname].items, (block) => {
          const Block =
            config.blocks.blocksConfig[
              content[blocksFieldname]?.[block]?.['@type']
            ]?.['view'] || null;
          return Block !== null &&
            content[blocksFieldname][block]['@type'] !== 'title' ? (
            <Block
              key={block}
              id={block}
              properties={content}
              data={content[blocksFieldname][block]}
              path={getBaseUrl(location?.pathname || '')}
            />
          ) : (
            ''
          );
        })}
      </div>
    </div>
  ) : (
    <Container id="page-document multiplecontent-view">
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
MultipleContentView.propTypes = {
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

export default injectIntl(MultipleContentView);
