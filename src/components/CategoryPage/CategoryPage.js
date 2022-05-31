import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../../services/getQueries';
import Card from './utils/Card/Card';
import spinner from './assets/img/spinner.gif';
import './style/category.scss';

class CategoryPage extends Component {
  displayData() {
    const data = this.props.data;
    if (data.loading) {
      return (
        <div>
          <img src={spinner} alt='Loading...'></img>
        </div>
      );
    } else {
      return data.categories[this.props.category].products.map((item) => {
        return (
          <div
            onClick={() => {
              console.log('hi');
            }}
          >
            <Card
              productId={item.id}
              dataInStock={item.inStock}
              thumbnail={item.gallery[0]}
              productTitle={`${item.brand} ${item.name}`}
              productPrice={
                item.prices[this.props.currency].currency.symbol +
                item.prices[this.props.currency].amount
              }
            />
          </div>
        );
      });
    }
  }

  displayCategoryName() {
    const data = this.props.data;
    if (data.loading) {
      return (
        <div>
          <img src={spinner} alt='Loading...'></img>
        </div>
      );
    } else {
      return data.categories[this.props.category].name;
    }
  }

  render() {
    return (
      <div className='category-page'>
        <h2>{this.displayCategoryName()}</h2>
        <div className='product-cards-section'>{this.displayData()}</div>
      </div>
    );
  }
}

export default graphql(getAllProducts)(CategoryPage);
