import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../services/getQuery';

class ProductsList extends Component {
  displayData() {
    var data = this.props.data;
    if (data.loading) {
      return <div>Loading</div>;
    } else {
      return data.category.products.map((item) => {
        return (
          <li key={item.id}>
            {item.name},{item.prices[0].currency.symbol}
            {item.prices[0].amount}
          </li>
        );
      });
    }
  }

  render() {
    console.log(this.props);
    return <div>{this.displayData()}</div>;
  }
}

export default graphql(getAllProducts)(ProductsList);
