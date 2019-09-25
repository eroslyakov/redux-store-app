import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './app.css';
import ShopHeader from '../shop-header/shop-header';
import HomePage from '../pages/home-page';
import CartPage from '../pages/cart-page';

const App = () => {
    return (
        <main role="main" className="container">
            <ShopHeader />
            <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/cart' component={CartPage} />
            </Switch>
        </main>
    )
};

export default App;