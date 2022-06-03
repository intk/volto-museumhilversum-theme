/**
 * Document view component.
 * @module components/theme/View/ListingView
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Container, Image, Grid } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';

import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

/**
 * List view component class.
 * @function ListingView
 * @params {object} content Content object.
 * @returns {string} Markup of the component.
 */
const ListingView = ({ content, location, token, history }) => (
  <Container id="page-home">
    <section id="content-core">
      <Grid stackable columns={3}>
        {content.items.map((item) => (
          <Grid.Column mobile={12} tablet={6} computer={4} key={item.url}>
            {item.image_field && (
              <Segment
                basic
                className={
                  !token &&
                  ['testimonial', 'organization'].includes(item['@type'])
                    ? 'listing-item no-link'
                    : 'listing-item'
                }
              >
                {!token &&
                ['testimonial', 'organization'].includes(item['@type']) ? (
                  <Image
                    alt={item.title}
                    src={`${flattenToAppURL(item['@id'])}/@@images/${
                      item.image_field
                    }/teaser`}
                    loading="lazy"
                  />
                ) : (
                  <Link to={item.url} title={item.title}>
                    <Image
                      alt={item.title}
                      src={`${flattenToAppURL(item['@id'])}/@@images/${
                        item.image_field
                      }/teaser`}
                      loading="lazy"
                    />
                  </Link>
                )}
              </Segment>
            )}
            <Segment basic className="listing-item-content">
              <h2>
                {!token &&
                ['testimonial', 'organization'].includes(item['@type']) ? (
                  <>{item.title}</>
                ) : (
                  <Link to={item.url} title={item.title}>
                    {item.title}
                  </Link>
                )}
              </h2>
              {item.description && (
                <p className="item-description">{item.description}</p>
              )}
              {['Event'].includes(item['@type']) ? (
                <When
                  start={item.start}
                  end={item.end}
                  whole_day={item.whole_day}
                  open_end={item.open_end}
                />
              ) : (
                ''
              )}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    </section>
  </Container>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
ListingView.propTypes = {
  content: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        description: PropTypes.string,
        review_state: PropTypes.string,
        title: PropTypes.string,
        url: PropTypes.string,
        start: PropTypes.any,
        end: PropTypes.any,
        whole_day: PropTypes.any,
        open_end: PropTypes.any,
      }),
    ),
  }).isRequired,
};

export default ListingView;
