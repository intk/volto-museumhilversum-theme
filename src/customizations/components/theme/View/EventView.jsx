/**
 * EventView view component.
 * @module components/theme/View/EventView
 */

 import React from 'react';
 import PropTypes from 'prop-types';
 import { defineMessages, injectIntl } from 'react-intl';
 import {
   flattenHTMLToAppURL,
   hasBlocksData,
   getBlocksLayoutFieldname,
   getBlocksFieldname,
   getBaseUrl,
 } from '@plone/volto/helpers';
 import { Container, Image, Segment, Header, List } from 'semantic-ui-react';
 import { map } from 'lodash';
 import config from '@plone/volto/registry';
 import { Link } from 'react-router-dom';
 import { flattenToAppURL } from '@plone/volto/helpers';
 import { FacebookShareButton, TwitterShareButton } from 'react-share';
 
 import {
   When,
   Recurrence,
 } from '@plone/volto/components/theme/View/EventDatesInfo';
 
 const messages = defineMessages({
   what: {
     id: 'event_what',
     defaultMessage: 'Wat',
   },
   when: {
     id: 'event_when',
     defaultMessage: 'Te zien',
   },
   allDates: {
     id: 'event_alldates',
     defaultMessage: 'All dates',
   },
   where: {
     id: 'event_where',
     defaultMessage: 'Where',
   },
   contactName: {
     id: 'event_contactname',
     defaultMessage: 'Contact Name',
   },
   contactPhone: {
     id: 'event_contactphone',
     defaultMessage: 'Contact Phone',
   },
   attendees: {
     id: 'event_attendees',
     defaultMessage: 'Attendees',
   },
   website: {
     id: 'event_website',
     defaultMessage: 'Website',
   },
   visitWebsite: {
     id: 'visit_external_website',
     defaultMessage: 'Visit external website',
   },
   opening_times: {
     id: 'opening_times',
     defaultMessage: 'Openingstijden',
   },
   plan_your_visit: {
     id: 'plan_your_visit',
     defaultMessage: 'Plan je bezoek',
   },
   share_article: {
     id: 'share_article',
     defaultMessage: 'Deel Dit Artikel',
   },
 });
 
 /**
  * EventView view component class.
  * @function EventView
  * @params {object} content Content object.
  * @returns {string} Markup of the component.
  */
 const EventView = ({ intl, content }) => {
   const blocksFieldname = getBlocksFieldname(content);
   const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
 
   return hasBlocksData(content) ? (
     <div id="page-document" className="ui container">
       <Segment floated="left" className="event-details-wrapper">
         {content.subjects.length > 0 && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.what)}
             </Header>
             <List items={content.subjects} />
           </>
         )}
         <Header dividing sub>
           {intl.formatMessage(messages.when)}
         </Header>
         <When
           start={content.start}
           end={content.end}
           whole_day={content.whole_day}
           open_end={content.open_end}
         />
         <Header dividing sub>
           {intl.formatMessage(messages.opening_times)}
         </Header>
         <p className="opening-times">
           Di t/m Zo: 11:00 ??? 16:30<br></br>Maandag gesloten
         </p>
 
         <div className="visit-wrapper">
           <Link to="/nl/bezoek">
             {intl.formatMessage(messages.plan_your_visit)}
           </Link>
         </div>
 
         <Header dividing sub>
           {intl.formatMessage(messages.share_article)}
         </Header>
         <div className="share-buttons-wrapper">
           <FacebookShareButton url={content['@id']}>Facebook</FacebookShareButton>
           <TwitterShareButton url={content['@id']}>Twitter</TwitterShareButton>
         </div>
 
         {content.recurrence && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.allDates)}
             </Header>
             <Recurrence recurrence={content.recurrence} start={content.start} />
           </>
         )}
         {content.location && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.where)}
             </Header>
             <p>{content.location}</p>
           </>
         )}
         {content.contact_name && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.contactName)}
             </Header>
             <p>
               {content.contact_email ? (
                 <a href={`mailto:${content.contact_email}`}>
                   {content.contact_name}
                 </a>
               ) : (
                 content.contact_name
               )}
             </p>
           </>
         )}
         {content.contact_phone && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.contactPhone)}
             </Header>
             <p>{content.contact_phone}</p>
           </>
         )}
         {content.attendees.length > 0 && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.attendees)}
             </Header>
             <List items={content.attendees} />
           </>
         )}
         {content.event_url && (
           <>
             <Header dividing sub>
               {intl.formatMessage(messages.website)}
             </Header>
             <p>
               <a
                 href={content.event_url}
                 target="_blank"
                 rel="noopener noreferrer"
               >
                 {intl.formatMessage(messages.visitWebsite)}
               </a>
             </p>
           </>
         )}
       </Segment>
       <div className="content-core">
         {map(content[blocksLayoutFieldname].items, (block) => {
           const Block =
             config.blocks.blocksConfig[
               content[blocksFieldname]?.[block]?.['@type']
             ]?.['view'] || null;
           return Block !== null ? (
             <Block
               key={block}
               id={block}
               properties={content}
               data={content[blocksFieldname][block]}
               path={getBaseUrl('')}
             />
           ) : (
             <div key={block}>
               {intl.formatMessage(messages.unknownBlock, {
                 block: content[blocksFieldname]?.[block]?.['@type'],
               })}
             </div>
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
 EventView.propTypes = {
   content: PropTypes.shape({
     title: PropTypes.string,
     description: PropTypes.string,
     text: PropTypes.shape({
       data: PropTypes.string,
     }),
     attendees: PropTypes.arrayOf(PropTypes.string).isRequired,
     contact_email: PropTypes.string,
     contact_name: PropTypes.string,
     contact_phone: PropTypes.string,
     end: PropTypes.string.isRequired,
     event_url: PropTypes.string,
     location: PropTypes.string,
     open_end: PropTypes.bool,
     recurrence: PropTypes.any,
     start: PropTypes.string.isRequired,
     subjects: PropTypes.arrayOf(PropTypes.string).isRequired,
     whole_day: PropTypes.bool,
   }).isRequired,
 };
 
 export default injectIntl(EventView);
 