import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Image } from 'semantic-ui-react';
import loadable from '@loadable/component';
import ResponsiveContainer from '@eeacms/volto-block-image-cards/ImageCards/ResponsiveContainer';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderTemplate.less';

const Slider = loadable(() => import('react-slick'));

const SliderTemplate = ({ items, linkTitle, linkHref, isEditMode }) => {
  const carouselSettings = {
    dots: true,
    arrows: false,
    lazyLoad: 'ondemand',
  };

  return (
    <>
      <div className="slider-carousel-container">
        <ResponsiveContainer>
          {({ parentWidth }) => {
            return (
              parentWidth && (
                <div
                  style={{ width: `${parentWidth - 10}px`, margin: '0 auto' }}
                >
                  <Slider
                    {...carouselSettings}
                    className="slick-carousel rounded"
                  >
                    {items.map((item) => (
                      <div>
                        <section className="base-section">
                          <div className="base-container">
                            <div className="base-content">
                              <div className="image-container">
                                <div className="slide-img-wrapper">
                                  <Image
                                    alt={item.title}
                                    src={flattenToAppURL(
                                      `${item['@id']}/@@images/${item.image_field}/teaser`,
                                    )}
                                  />
                                </div>
                              </div>
                              <div className="slide-details">
                                <p className="quote">{item.description}</p>
                                <p className="author">{item.title}</p>
                              </div>
                            </div>
                          </div>
                        </section>
                      </div>
                    ))}
                  </Slider>
                </div>
              )
            );
          }}
        </ResponsiveContainer>
      </div>
    </>
  );
};

SliderTemplate.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default SliderTemplate;
