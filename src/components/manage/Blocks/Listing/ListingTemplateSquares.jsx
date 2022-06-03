import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Grid, Image, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import SharingButtons from './SharingButtons';

const ListingTemplateSquares = ({ items, linkTitle, linkHref, isEditMode }) => {
  return (
    <>
      <Grid stackable columns={2} className="listings">
        {items.map((item) => (
          <Grid.Column
            mobile={12}
            tablet={6}
            computer={4}
            className="listing-column"
          >
            {item.image_field && (
              <Segment
                basic
                className={
                  !['testimonial', 'organization', 'person'].includes(
                    item['@type'],
                  )
                    ? 'listing-item'
                    : 'listing-item no-link'
                }
              >
                {!['testimonial', 'organization', 'person'].includes(
                  item['@type'],
                ) ? (
                  <Link to={flattenToAppURL(item['@id'])}>
                    <Image
                      alt={item.title}
                      src={flattenToAppURL(
                        `${item['@id']}/@@images/${item.image_field}/teaser`,
                      )}
                      loading="lazy"
                    />

                    {item.youtube_id && (
                      <Icon name="play" size="huge" color="white" />
                    )}
                  </Link>
                ) : (
                  <Image
                    alt={item.title}
                    src={flattenToAppURL(
                      `${item['@id']}/@@images/${item.image_field}/teaser`,
                    )}
                    loading="lazy"
                  />
                )}
                {item['@type'] === 'person' && (
                  <SharingButtons email={item.email} phone={item.phone} />
                )}
              </Segment>
            )}
            <Segment basic className="listing-item-content">
              <h2>
                {!['testimonial', 'organization', 'person'].includes(
                  item['@type'],
                ) ? (
                  <Link to={flattenToAppURL(item['@id'])} title={item.title}>
                    {item.title ? item.title : item.id}
                  </Link>
                ) : (
                  <>{item.title ? item.title : item.id}</>
                )}
              </h2>
              {item.description && <p>{item.description}</p>}
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
};

ListingTemplateSquares.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default ListingTemplateSquares;
