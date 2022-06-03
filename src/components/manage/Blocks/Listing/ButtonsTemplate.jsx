import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Link } from 'react-router-dom';

const ButtonsTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  return (
    <>
      <Grid stackable columns={12} className="listing-buttons">
        {items.map((item) => (
          <div className="listing-button-column flex justify-start">
            <Link
              title={item.title}
              to={flattenToAppURL(item['@id'])}
              className="ui button rounded-button"
            >
              {item.title}
            </Link>
          </div>
        ))}
      </Grid>
    </>
  );
};

ButtonsTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default ButtonsTemplate;
