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
import { useSelector } from 'react-redux';

import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

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

const translations = {
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
  opening_times: {
    en: 'Opening times',
    nl: 'Openingstijden',
  },
  plan_your_visit: {
    en: 'Plan your visit',
    nl: 'Plan je bezoek',
  },
  share_article: {
    en: 'Share article',
    nl: 'Deel Dit Artikel',
  },
  open_daily: {
    en: 'Open daily from 11 a.m. to 5 p.m.',
    nl: 'Dagelijks open van 11 tot 17 uur.',
  },
  visit_link: {
    en: '/en/visit/practical-information',
    nl: '/nl/bezoek',
  },
};

/**
 * EventView view component class.
 * @function EventView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const EventView = ({ intl, content }) => {
  const blocksFieldname = getBlocksFieldname(content);
  const blocksLayoutFieldname = getBlocksLayoutFieldname(content);
  const currentLang = useSelector((state) => state.intl.locale);

  return hasBlocksData(content) ? (
    <div id="page-document" className="ui container">
      <Segment floated="left" className="event-details-wrapper">
        <Header dividing sub>
          {translations[getDateLabel(content.start, content.end)][currentLang]}
        </Header>
        <When
          start={content.start}
          end={content.end}
          whole_day={content.whole_day}
          open_end={content.open_end}
        />
        <Header dividing sub>
          {translations['opening_times'][currentLang]}
        </Header>
        <p className="opening-times">
          {translations['open_daily'][currentLang]}
        </p>

        <div className="visit-wrapper">
          <Link to={translations['visit_link'][currentLang]}>
            {translations['plan_your_visit'][currentLang]}
          </Link>
        </div>

        <Header dividing sub>
          {translations['share_article'][currentLang]}
        </Header>
        <div className="share-buttons-wrapper">
          <FacebookShareButton url={content['@id']}>
            Facebook
          </FacebookShareButton>
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
