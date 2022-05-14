import React, { Component } from 'react';
import './style/App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ProductPage from './components/ProductPage/ProductPage';
import ErrorPage from './components/Utils/ErrorPage/ErrorPage';
import Header from './components/Utils/Header/Header';

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      currencyKey: 0,
    };
  }

  componentDidMount() {
    let currencyDropdown = document.querySelector('#currency-dropdown');
    currencyDropdown.addEventListener('click', () => {
      switch (currencyDropdown.value) {
        case 'GBP':
          this.setState({
            currencyKey: 1,
          });
          break;
        case 'AUD':
          this.setState({
            currencyKey: 2,
          });
          break;
        case 'YEN':
          this.setState({
            currencyKey: 3,
          });
          break;
        case 'RUB':
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
            element={<ProductPage />}
          />

          <Route path='*' element={<ErrorPage />} />
        </Routes>
      </div>
    );
  }
}

export default App;
