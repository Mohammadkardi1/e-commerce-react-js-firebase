import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProductsContextProvider } from './Global/ProductsContext';
import {CartContextProvider} from './Global/CartContext'


// weap all app with provider
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ProductsContextProvider>
        <CartContextProvider>
            <App />
        </CartContextProvider>
    </ProductsContextProvider>,
);