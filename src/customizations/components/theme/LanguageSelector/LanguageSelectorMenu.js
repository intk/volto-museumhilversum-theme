/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Accordion, Message } from 'semantic-ui-react';

import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { find, map } from 'lodash';

import {
  Helmet,
  langmap,
  flattenToAppURL,
  normalizeLanguageName,
} from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { changeLanguage } from '@plone/volto/actions';

import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
});

const LanguageSelectorMenu = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );
  const { settings } = config;

  const AvailableLanguages = ({ elements }) => (
    <>
      {elements.map((lang, index) => {
        const translation = find(translations, { language: lang });
        return (
          <span key={`language-selector-${lang}`}>
            <Link
              aria-label={`${intl.formatMessage(
                messages.switchLanguageTo,
              )} ${langmap[lang].nativeName.toLowerCase()}`}
              className={`language-button ${langmap[lang].nativeName}`}
              to={
                translation ? flattenToAppURL(translation['@id']) : `/${lang}`
              }
              title={langmap[lang].nativeName}
              onClick={() => {
                props.onClickAction();
                if (config.settings.supportedLanguages.includes(lang)) {
                  const langFileName = normalizeLanguageName(lang);
                  import('~/../locales/' + langFileName + '.json').then(
                    (locale) => {
                      dispatch(changeLanguage(lang, locale.default));
                    },
                  );
                }
              }}
            >
              {langmap[lang].nativeName}
            </Link>
            {index < elements.length - 1 && <span className='seperator'> | </span>}
          </span>
        );
      })}
    </>
  );

  return settings.isMultilingual ? (
    <div className="menu-language-selector">
      <AvailableLanguages elements={settings.supportedLanguages} />
    </div>
  ) : (
    <Helmet>
      <html lang={settings.defaultLanguage} />
    </Helmet>
  );
};

LanguageSelectorMenu.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelectorMenu.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelectorMenu;
