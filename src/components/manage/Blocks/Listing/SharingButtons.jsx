import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Popup, Button } from 'semantic-ui-react';

const SharingButtons = ({ email, phone }) => {
  return (
    <>
      <div className="contact-buttons-wrapper">
        <div className="contact-buttons">
          {phone && (
            <Popup
              content={
                <>
                  <a href={`tel:${phone}`}>{phone}</a>
                </>
              }
              on="click"
              position="top center"
              popper={{
                id: 'buttons-popper-container',
                style: { zIndex: 2000 },
              }}
              trigger={
                <Button>
                  <FontAwesomeIcon icon={faPhone} />
                </Button>
              }
            />
          )}
          {email && (
            <a
              className="ui button team-button"
              href={`mailto:${email}?Subject=Contact via INTK website`}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </a>
          )}
        </div>
      </div>
    </>
  );
};

export default SharingButtons;
