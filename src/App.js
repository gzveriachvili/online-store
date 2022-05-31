import React, { Component } from 'react';
import { CartProvider } from './components/Context/CartContext';

import './style/App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ProductPage from './components/ProductPage/ProductPage';
import ErrorPage from './components/Utils/ErrorPage/ErrorPage';
import Header from './components/Utils/Header/Header';
import CartPage from './components/CartPage/CartPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currencyKey: 0,
    };
  }

  componentDidMount() {
    let currencyDropdown = document.querySelector('.dropdown-text');
    let ddItems = document.querySelectorAll('.dropdown-item');

    for (const item of ddItems) {
      item.addEventListener('click', () => {
        currencyDropdown.click();
      });
    }

    document.addEventListener('click', () => {
      console.log('dd text: ', currencyDropdown.textContent);
      switch (currencyDropdown.textContent.charAt(0)) {
        case '£':
          this.setState({
            currencyKey: 1,
          });
          break;
        case 'A':
          this.setState({
            currencyKey: 2,
          });
          break;
        case '¥':
          this.setState({
            currencyKey: 3,
          });
          break;
        case '₽':
          this.setState({
            currencyKey: 4,
          });
          break;
        default:
          this.setState({
            currencyKey: 0,
          });
      }
    });
  }

  render() {
    return (
      <div className='App'>
        <CartProvider>
          <Header />
          <Routes>
            <Route
              path='/sw-erd-test'
              element={<Navigate to='/sw-erd-test/all' />}
            />
            <Route
              path='/sw-erd-test/all'
              element={
                <CategoryPage currency={this.state.currencyKey} category='0' />
              }
            />
            <Route
              path='/sw-erd-test/clothes'
              element={
                <CategoryPage currency={this.state.currencyKey} category='1' />
              }
            />
            <Route
              path='/sw-erd-test/tech'
              element={
                <CategoryPage currency={this.state.currencyKey} category='2' />
              }
            />

            <Route
              path='/sw-erd-test/product/:productID'
              element={
                <ProductPage category='0' currency={this.state.currencyKey} />
              }
            />
            <Route
              exact
              path='/sw-erd-test/cart'
              element={<CartPage currency={this.state.currencyKey} />}
            />
            <Route path='*' element={<ErrorPage />} />
          </Routes>
        </CartProvider>
      </div>
    );
  }
}

export default App;
