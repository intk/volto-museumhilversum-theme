/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { useTagManager } from '@package/components';
import { Grid, Image } from 'semantic-ui-react';
import { Logo } from '@plone/volto/components';
import SponsorImage from './NLSponsor.svg';
import ArrowUpImage from './ArrowUp.svg';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import CookieConsent, { Cookies } from 'react-cookie-consent';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

const cookietranslations = {
  more_info_link: {
    en: '/nl/over-ons/over-het-museum/privacyverklaring-en-cookies',
    nl: '/nl/over-ons/over-het-museum/privacyverklaring-en-cookies',
  },
  more_info_text: {
    en: 'Read more',
    nl: 'Meer info',
  },
  text: {
    en: 'We use cookies to enhance our website.',
    nl: 'Wij gebruiken cookies om onze website te verbeteren.',
  },
  button_text: {
    en: 'Accept',
    nl: 'Accepteren',
  },
};

const MailChimpForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf('@') > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value,
    });

  return (
    <div className="newsletter-wrapper">
      {status === 'sending' && <div style={{ color: 'blue' }}>...</div>}
      {status === 'error' && (
        <div
          style={{ color: 'red' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === 'success' && (
        <div
          className="success-msg"
          style={{ color: 'green' }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      <input
        ref={(node) => (name = node)}
        type="text"
        className="name"
        placeholder="Naam"
      />
      <input
        ref={(node) => (email = node)}
        type="email"
        placeholder="Emailadres"
      />
      <br />
      <button onClick={submit}>Inschrijven</button>
    </div>
  );
};

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => {
  useTagManager();

  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const mailchimp_url =
    '//intk.us5.list-manage.com/subscribe/post?u=234bf50c3263f36ded910b409&amp;id=604ba512c5';

  return (
    <>
      <Segment
        role="contentinfo"
        vertical
        padded
        inverted
        color="black"
        textAlign="left"
        id="footer"
      >
        <Grid container stackable columns={1} className="footer-logo-container">
          <Grid.Row>
            <Grid.Column className="footer-logo">
              <Logo />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Grid container stackable className="footer-items-container">
          <Grid.Row>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Openingstijden</h4>
              <p>
                Dagelijks open van 11 tot 17 uur.
                <br></br>18 maart gesloten.
              </p>
              <Link to="/nl/bezoek">Plan je bezoek</Link>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Contacts</h4>
              <p>
                info@museumhilversum.nl<br></br>035 – 5339601
              </p>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Blijf of the hoogte</h4>
              <MailchimpSubscribe
                url={mailchimp_url}
                render={({ subscribe, status, message }) => (
                  <MailChimpForm
                    status={status}
                    message={message}
                    onValidated={(formData) => subscribe(formData)}
                  />
                )}
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h5>
                <a
                  className="social-media-link"
                  href="https://twitter.com/museumhilversum"
                >
                  Twitter
                </a>
                <Image className="arrow-up" src={ArrowUpImage} />
              </h5>
              <h5>
                <a
                  href="https://www.instagram.com/museumhilversum/"
                  className="social-media-link"
                >
                  Instagram
                </a>
                <Image className="arrow-up" src={ArrowUpImage} />
              </h5>
              <h5>
                <a
                  href="https://www.facebook.com/MuseumHilversum"
                  className="social-media-link"
                >
                  Facebook
                </a>
                <Image className="arrow-up" src={ArrowUpImage} />
              </h5>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Locatie</h4>
              <p>Kerkbrink 6, 1211 BX Hilversum</p>
              <a href="https://www.google.com/maps?f=d&source=s_d&saddr&daddr=Kerkbrink+6,+1211+BX+Hilversum,+Netherlands+(Museum+Hilversum)&hl=en&geocode=CVXkfbhilC3CFTjgHAMd_OhOACGF6UW5JFoajg&sll=52.240205,5.146065&sspn=0.083358,0.224018&vpsrc=6&mra=ls&ie=UTF8&ll=52.240205,5.146065&spn=0.083358,0.224018&z=13&iwloc=A">
                Route
              </a>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Sponsors</h4>
              <Image src={SponsorImage} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment
        role="supportinfo"
        vertical
        padded
        color="white"
        textAlign="left"
        id="footer-support"
      >
        <Grid
          container
          stackable
          columns={1}
          className="footer-support-container"
        >
          <Grid.Row>
            <Grid.Column className="footer-support">
              <h2>Word een vriend</h2>
              <p>
                Voor slechts 30 euro per jaar ben je al Museumvriend. Daarmee
                steun je niet alleen Museum Hilversum maar krijg je ook een
                speciale pas waarmee je gratis toegang hebt tot alle
                tentoonstellingen van Museum Hilversum.
              </p>
              <Link to="/nl/over-ons/vrienden">Aanmelden als vriend</Link>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
      <CookieConsent
        style={{ background: '#000000' }}
        buttonStyle={{
          color: '#ffffff',
          fontSize: '13px',
          background: '#000000',
        }}
        buttonText={cookietranslations['button_text'][lang]}
      >
        {cookietranslations['text'][lang]}{' '}
        <Link to="/nl/over-ons/over-het-museum/privacyverklaring-en-cookies">
          {cookietranslations['more_info_text'][lang]}
        </Link>
      </CookieConsent>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
