import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import {I18nextProvider} from "react-i18next";
import i18next from "i18next";



import common_fr from "./lang/fr/common.json";
import common_en from "./lang/en/common.json";
import common_es from "./lang/es/common.json";

var userLang = navigator.language || navigator.userLanguage;
let lang = userLang.substr(0,2)
 const setLang = (lang) =>{
  
switch(lang){
 case 'en' :return('en')
 case 'fr' :return('fr')
 case 'es' :return('es')
 default :return('en')
}
 }



i18next.init({
  
  interpolation: { escapeValue: false },  // React already does escaping
  lng: setLang(lang),                              // language to use
  resources: {
      fr: {
          common: common_fr              // 'common' is our custom namespace
      },
      en: {
          common: common_en
      },
      es: {
         common: common_es
    },
  },
});

ReactDOM.render(
  <Provider store = {configureStore()}>
     <I18nextProvider i18n={i18next}>
  <BrowserRouter>
    <App />
  
    </BrowserRouter>
    </I18nextProvider>
    </Provider>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
