/**
 * Document view component.
 * @module components/theme/View/DefaultView
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { defineMessages, injectIntl } from 'react-intl';
 
 import { Container, Image } from 'semantic-ui-react';
 import { map } from 'lodash';
 import config from '@plone/volto/registry';
 import { StructuredData } from '@package/components';
 
 import {
   getBlocksFieldname,
   getBlocksLayoutFieldname,
   hasBlocksData,
   getBaseUrl,
 } from '@plone/volto/helpers';
 
 const messages = defineMessages({
   unknownBlock: {
     id: 'Unknown Block',
     defaultMessage: 'Unknown Block {block}',
   },
 });
 
 /**
  * Component to display the default view.
  * @function DefaultView
  * @param {Object} content Content object.
  * @returns {string} Markup of the component.
  */
 const DefaultView = ({ content, intl, location }) => {
   const blocksFieldname = getBlocksFieldname(content);
   const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
   const blockItems = content[blocksLayoutFieldname]?.items;
   const carouselOnTop =
     (blockItems &&
       blockItems.length > 0 &&
       content[blocksFieldname]?.[blockItems[0]]?.['@type'] === 'imagecards') ||
     (content[blocksFieldname]?.[blockItems[0]]?.['@type'] === 'listing' &&
       content[blocksFieldname]?.[blockItems[0]]?.['variation'] ===
         'slider_header') ||
     false;
 
   var carouselBlockID = null;
 
   if (carouselOnTop) {
     carouselBlockID = blockItems[0];
   }
 
   return hasBlocksData(content) ? (
     <div id="page-document" className="ui container">
       <StructuredData content={content} />
 
       <div className="content-core">
         {map(blockItems, (block) => {
           const Block =
             config.blocks.blocksConfig[
               content[blocksFieldname]?.[block]?.['@type']
             ]?.['view'] || null;
           return Block !== null && block !== carouselBlockID ? (
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
     <></>
   );
 };
 
 /**
  * Property types.
  * @property {Object} propTypes Property types.
  * @static
  */
 DefaultView.propTypes = {
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
 
 export default injectIntl(DefaultView);
 