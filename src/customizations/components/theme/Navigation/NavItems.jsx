import React from 'react';
import NavItem from '@plone/volto/components/theme/Navigation/NavItem';
import { Dropdown } from 'semantic-ui-react';

const NavItems = ({ items, lang }) => {
  return (
    <>
      {items.map((item) =>
        item && item.items && item.items.length > 0 ? (
          <Dropdown text={item.title} className="item" key={item.url}>
            <Dropdown.Menu>
              {item.items.map((dropdownitem) => (
                <Dropdown.Item key={dropdownitem.url}>
                  <NavItem item={dropdownitem} lang={lang} />
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <div className="top-item">
            <NavItem item={item} lang={lang} key={item.url} />
          </div>
        ),
      )}
    </>
  );
};

export default NavItems;
