import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Grid, Image, Segment } from 'semantic-ui-react';

const TestimonialsTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  return (
    <>
      <Grid stackable columns={2} className="items testimonials">
        {items.map((item) => (
          <Grid.Column key={item['@id']} className="testimonial-column">
            <Segment basic className="testimonial">
              <div className="image-container">
                <Image
                  alt={item.title}
                  src={flattenToAppURL(
                    `${item['@id']}/@@images/${item.image_field}/teaser`,
                  )}
                  loading="lazy"
                  verticalAlign="middle"
                  circular
                />
              </div>
              <div className="listing-body">
                <p>{item.description}</p>
                <h3>{item.title ? item.title : item.id}</h3>
              </div>
            </Segment>
          </Grid.Column>
        ))}
      </Grid>
    </>
  );
};

TestimonialsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default TestimonialsTemplate;
