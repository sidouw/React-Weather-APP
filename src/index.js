import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import './Styles/index.css';
import './Styles/App.css';
import './Styles/Map.css';
import './Styles/WeatherTabs.css';
import './Styles/WeatherData.css'



ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

