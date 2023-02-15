import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';

import {Loader} from "./components/loader"

import App from './App';
import './styles/index.css'
import './styles/footer.css'
import './styles/header.css'
import './styles/loader.css'
import './18n'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Suspense fallback={<Loader />}>
      <App />
    </Suspense>
  </React.StrictMode>
);
