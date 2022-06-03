import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Image } from 'semantic-ui-react';
import loadable from '@loadable/component';
import ResponsiveContainer from '@eeacms/volto-block-image-cards/ImageCards/ResponsiveContainer';
import { Link } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderListing.less';

const Slider = loadable(() => import('react-slick'));

const SliderListing = ({ items, linkTitle, linkHref, isEditMode }) => {
  const carouselSettings = {
    dots: false,
    arrows: true,
    lazyLoad: 'progressive',
    autoplay: false,
    infinite: true,
    slidesToShow: 3,
    draggable: false,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="slider-carousel-container slider-listing">
        <ResponsiveContainer>
          {({ parentWidth }) => {
            return (
              parentWidth && (
                <div style={{ width: `${parentWidth}px`, margin: '0 auto' }}>
                  <Slider
                    {...carouselSettings}
                    className="slick-carousel slider-listing"
                  >
                    {items.map((item) => (
                      <div>
                        <section className="base-section">
                          <div className="base-container">
                            <div className="base-content">
                              <div className="image-container">
                                <div className="slide-img-wrapper">
                                  <Link
                                    to={flattenToAppURL(item['@id'])}
                                    title={item.title}
                                    className="link-img-wrapper"
                                  >
                                    <Image
                                      alt={item.title}
                                      src={flattenToAppURL(
                                        `${item['@id']}/@@images/${item.image_field}/teaser`,
                                      )}
                                    />
                                  </Link>
                                </div>
                              </div>
                              <div className="slide-details">
                                <h2 className="title">
                                  <Link
                                    to={flattenToAppURL(item['@id'])}
                                    title={item.title}
                                  >
                                    {item.title}
                                  </Link>
                                </h2>
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

SliderListing.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default SliderListing;
