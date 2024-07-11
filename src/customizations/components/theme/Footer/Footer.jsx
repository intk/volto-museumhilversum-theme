/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import { useTagManager } from '@package/components';
import { Logo } from '@plone/volto/components';
import config from '@plone/volto/registry';
import CookieConsent from 'react-cookie-consent';
import { defineMessages, injectIntl } from 'react-intl';
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Image, Segment } from 'semantic-ui-react';
import ArrowUpImage from './ArrowUp.svg';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

const cookietranslations = {
  more_info_link: {
    en: '/en/over-ons/over-het-museum/privacyverklaring-en-cookies',
    nl: '/nl/over-ons/over-het-museum/privacyverklaring-en-cookies',
  },
  more_info_text: {
    en: 'Read more',
    nl: 'Meer info',
  },
  signuplink: {
    en: '/en/about-us/become-a-friend',
    nl: '/nl/over-ons/vrienden-worden',
  },
  visitlink: {
    en: '/en/visit/practical-information',
    nl: '/nl/bezoek/praktische-informatie',
  },
  text: {
    en: 'We use cookies to enhance our website.',
    nl: 'Wij gebruiken cookies om onze website te verbeteren.',
  },
  button_text: {
    en: 'Accept',
    nl: 'Accepteren',
  },
  openinghours: {
    en: 'Opening Times',
    nl: 'Openingstijden',
  },
  opendaily: {
    en: 'Open tuesday through sunday from 11 a.m. To 5 p.m.',
    nl: 'Van Dinsdag tot en met Zondag geopend van 11 tot 17 uur',
  },
  planyourvisit: {
    en: 'Plan your visit',
    nl: 'Plan je bezoek',
  },
  stayinformed: {
    en: 'Stay informed',
    nl: 'Blijf op de hoogte',
  },
  subscribe: {
    en: 'Subscribe',
    nl: 'Inschrijven',
  },
  location: {
    en: 'Location',
    nl: 'Locatie',
  },
  route: {
    en: 'Route',
    nl: 'Route',
  },
  becomeafriend: {
    en: 'Become a friend',
    nl: 'Word een vriend',
  },
  youcanbecome: {
    en:
      'For only 40 euros a year, you can become a Museum Friend. By doing so, you support not only Museum Hilversum, but will also receive a special pass that allows free admission to all exhibitions.',
    nl:
      'Voor slechts 40 euro per jaar ben je al Museumvriend. Daarmee steun je niet alleen Museum Hilversum maar krijg je ook een speciale pas waarmee je gratis toegang hebt tot alle tentoonstellingen.',
  },
  signup: {
    en: 'Sign up as a friend',
    nl: 'Aanmelden als vriend',
  },
  email: {
    en: 'EmailAddress',
    nl: 'Emailadres',
  },
};

const MailChimpForm = ({ status, message, onValidated }) => {
  const lang = useSelector((state) => state.intl.locale);
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
        placeholder={cookietranslations['email'][lang]}
      />
      <br />
      <button onClick={submit}>{cookietranslations['subscribe'][lang]}</button>
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
    '//museumhilversum.us7.list-manage.com/subscribe/post?u=98bfbab9f660b60bd2935184c&amp;id=d7b1a103be';

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
              <h4>{cookietranslations['openinghours'][lang]}</h4>
              <p id="open-daily-text" lang={lang}>
                {cookietranslations['opendaily'][lang]}
              </p>
              <Link to={cookietranslations['visitlink'][lang]}>
                {' '}
                {cookietranslations['planyourvisit'][lang]}
              </Link>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>Contact</h4>
              <p>
                <a href="mailto:info@museumhilversum.nl">
                  info@museumhilversum.nl
                </a>
                <br></br>035 – 5339601
              </p>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>{cookietranslations['stayinformed'][lang]}</h4>
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
              <h5>
                <a
                  href="https://www.linkedin.com/company/museum-hilversum/"
                  className="social-media-link"
                >
                  Linkedin
                </a>
                <Image className="arrow-up" src={ArrowUpImage} />
              </h5>
            </Grid.Column>
            <Grid.Column mobile={12} tablet={6} computer={4}>
              <h4>{cookietranslations['location'][lang]}</h4>
              <p>Kerkbrink 6, 1211 BX Hilversum</p>
              <a href="https://www.google.com/maps?f=d&source=s_d&saddr&daddr=Kerkbrink+6,+1211+BX+Hilversum,+Netherlands+(Museum+Hilversum)&hl=en&geocode=CVXkfbhilC3CFTjgHAMd_OhOACGF6UW5JFoajg&sll=52.240205,5.146065&sspn=0.083358,0.224018&vpsrc=6&mra=ls&ie=UTF8&ll=52.240205,5.146065&spn=0.083358,0.224018&z=13&iwloc=A">
                {cookietranslations['openinghours'][lang]}
              </a>
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
              <h2>{cookietranslations['becomeafriend'][lang]}</h2>
              <p>{cookietranslations['youcanbecome'][lang]}</p>
              <Link to={cookietranslations['signuplink'][lang]}>
                {' '}
                {cookietranslations['signup'][lang]}
              </Link>
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
        <Link to={cookietranslations['more_info_link'][lang]}>
          {' '}
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
