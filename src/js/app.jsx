import React from 'react';
import { hot } from 'react-hot-loader';
import Header from './components/header';
import Title from './components/title';
import Instructions from './components/instructions';
import Extras from './components/extras';

import fontawesome from '@fortawesome/fontawesome';
import brands from '@fortawesome/fontawesome-free-brands';
import faCameraRetro from '@fortawesome/fontawesome-free-solid/faCameraRetro';

fontawesome.library.add(brands, faCameraRetro);

const App = () => (
  <React.Fragment>
    <Header />
    <Title />
    <Instructions />
    <Extras />
  </React.Fragment>
);

export default hot(module)(App);
