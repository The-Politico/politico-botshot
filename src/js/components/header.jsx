import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const Header = () => (
  <header>
    <b className='bt-icon bt-icon--politico' />
    <a
      href='https://github.com/The-Politico/politico-hotshot'
    >
      <FontAwesomeIcon
        style={{ float: 'right', }}
        icon={[
          'fab', 'github',
        ]}
      />
    </a>
  </header>
);

export default Header;
