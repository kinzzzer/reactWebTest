import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import {CartContextProvider} from './CartContext';

export default function App() {
    return (
        <CartContextProvider>
            <Header />
            <Content />
            <Footer />
        </CartContextProvider>
    );
}