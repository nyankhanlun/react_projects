import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import productReducer from './store/reducers/products';
import ProductsProvider from './context/products-context'
import configureProductStore from './hooks-store/products-store'

const root = ReactDOM.createRoot(document.getElementById('root'));

configureProductStore()

root.render(
  // <ProductsProvider >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </ProductsProvider>
);
