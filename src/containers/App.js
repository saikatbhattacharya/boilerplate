import React, { PropTypes } from 'react';
import Header from 'containers/Header';

require('font-awesome/css/font-awesome.css');
require('styles/app.scss');


const App = ({ children }) => (
  <div className="app">
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.object.isRequired,
};

export default App;
