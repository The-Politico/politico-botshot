import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import Icon from '@fortawesome/fontawesome-free-solid/faCameraRetro';

const Title = () => (
  <section className='title'>
    <h1><FontAwesomeIcon icon={Icon} /> Botshot</h1>
    <p>Take screenshots of page elements on your site.</p>
  </section>
);

export default Title;
