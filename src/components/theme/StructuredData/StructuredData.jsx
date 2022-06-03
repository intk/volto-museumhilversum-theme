import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StructuredData extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    content: PropTypes.any,
  };

  render() {
    const content = this.props.content;

    const structuredDataRaw = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: content.title,
      description: content.description,
      employmentType: content.employmentType,
      datePosted: '2022-01-17',
      validThrough: '2499-12-31',
      hiringOrganization: {
        type: 'Organization',
        name: 'INTK',
        sameAs: 'https://www.intk.com',
        logo: 'https://www.intk.com/logo.png',
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          streetAddress: 'Beatrixgebouw 6de etage, Jaarbeursplein 6',
          addressLocality: 'Utrecht',
          addressRegion: 'Utrecht',
          postalCode: '3521 AL',
          addressCountry: 'NL',
        },
      },
    };

    if (content.baseSalary) {
      structuredDataRaw.baseSalary = {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          value: content.baseSalary,
          unitText: 'MONTH',
        },
      };
    }

    const structuredData = JSON.stringify(structuredDataRaw);

    return (
      <>
        {content.activateJobPosting && (
          <script type="application/ld+json">{structuredData}</script>
        )}
      </>
    );
  }
}

export default StructuredData;
