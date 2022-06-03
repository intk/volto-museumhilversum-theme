import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Image, Label, Icon } from 'semantic-ui-react';
import loadable from '@loadable/component';
import ResponsiveContainer from '@eeacms/volto-block-image-cards/ImageCards/ResponsiveContainer';
import { Link } from 'react-router-dom';
import clockSVG from './clock.svg';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeaderCarousel.less';
import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

const Slider = loadable(() => import('react-slick'));

const HeaderCarousel = ({ items, linkTitle, linkHref, isEditMode }) => {
  const carouselSettings = {
    dots: false,
    arrows: true,
    lazyLoad: 'progressive',
  };

  return (
    <>
      <div className="full-width">
        <div className="slider-carousel-container slider-wrapper">
          <ResponsiveContainer>
            {({ parentWidth }) => {
              return (
                parentWidth && (
                  <div
                    style={{ width: `${parentWidth}px`, margin: '0 auto' }}
                    className="responsive-wrapper"
                  >
                    <Slider
                      {...carouselSettings}
                      className="slick-carousel header-carousel"
                    >
                      {items.map((item) => (
                        <div className="inner-carousel-wrapper">
                          <section className="base-section">
                            <div className="base-container">
                              <div className="base-content">
                                <div className="image-container">
                                  <div className="slide-img-wrapper">
                                    <Image
                                      alt={item.title}
                                      src={flattenToAppURL(
                                        `${item['@id']}/@@images/${item.image_field}/large`,
                                      )}
                                    />
                                  </div>
                                </div>
                                <div className="slide-details">
                                  <div className="slide-inner-content">
                                    {item['@type'] === 'Event' && (
                                      <div className="dates">
                                        <div className="label-wrapper">
                                          <Label color="black">
                                            Nu te zien
                                          </Label>
                                        </div>
                                        <When
                                          start={item.start}
                                          end={item.end}
                                          whole_day={true}
                                          open_end={false}
                                        />
                                      </div>
                                    )}
                                    <div className="title">
                                      <h3>
                                        <Link
                                          to={flattenToAppURL(`${item['@id']}`)}
                                        >
                                          {item.title}
                                        </Link>
                                      </h3>
                                    </div>
                                    <div className="more">
                                      <Link to="/nl/tentoonstellingen">
                                        Ontdek meer
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="opening-times">
                                    <Image src={clockSVG}></Image>
                                    <p>Open Di t/m Zo 11:00—16:30</p>
                                  </div>
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
      </div>
    </>
  );
};

HeaderCarousel.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  linkMore: PropTypes.any,
  isEditMode: PropTypes.bool,
};

export default HeaderCarousel;
