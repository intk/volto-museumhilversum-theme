/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { flattenToAppURL } from '@plone/volto/helpers';
import { Image, Label, Icon } from 'semantic-ui-react';
import loadable from '@loadable/component';
import ResponsiveContainer from '@eeacms/volto-block-image-cards/ImageCards/ResponsiveContainer';
import { Link } from 'react-router-dom';
import clockSVG from './clock.svg';
import { defineMessages, useIntl } from 'react-intl';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './HeaderCarousel.less';
import {
  When,
  Recurrence,
} from '@plone/volto/components/theme/View/EventDatesInfo';

const Slider = loadable(() => import('react-slick'));

const carouseltranslations = {
  open_times: {
    en: 'Daily opened from 11 am until 5 pm.',
    nl: 'Dagelijks open van 11 tot 17 uur.',
  },
  discover: {
    en: 'Discover more',
    nl: 'Ontdek meer',
  },
  nowonview: {
    en: 'Now on view',
    nl: 'Nu te zien',
  },
  expected: {
    en: 'Expected',
    nl: 'Verwacht',
  },
  past: {
    en: 'Been',
    nl: 'Geweest',
  },
};

const getDateLabel = (start, end) => {
  const today = new Date();
  const start_date = new Date(start);
  const end_date = new Date(end);
  today.setHours(0, 0, 0, 0);

  // if (start_date > today) {
  //   return carouseltranslations['expected'][this.props.lang];
  // } else if (end_date < today) {
  //   return carouseltranslations['past'][this.props.lang];
  // } else {
  //   return carouseltranslations['nowonview'][this.props.lang];
  // }
  return '';
};

const HeaderCarousel = ({ items, linkTitle, linkHref, isEditMode }) => {
  const intl = useIntl();
  const currentLang = useSelector((state) => state.intl.locale);
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
                                            {getDateLabel(item.start, item.end)}
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
                                        {/* {
                                          carouseltranslations['discover'][
                                            this.props.lang
                                          ]
                                        } */}
                                        ''
                                      </Link>
                                    </div>
                                  </div>
                                  <div className="opening-times">
                                    <Image src={clockSVG}></Image>
                                    <p>
                                      {/* {
                                        carouseltranslations['open_times'][
                                          this.props.lang
                                        ]
                                      } */}
                                      ''
                                    </p>
                                  </div>
                                  {console.log(currentLang)}
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
