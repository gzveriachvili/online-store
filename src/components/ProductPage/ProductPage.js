import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../../services/getQueries';

class ProductPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  // displayData() {
  //   const data = this.props.data;
  //   const parse = require('html-react-parser');
  //   if (data.loading) {
  //     return <div>Loading...</div>;
  //   } else {
  //     return (
  //       <div>
  //         <p>{this.id}</p>
  //         <p>{data.product.name}</p>
  //         <p>{data.product.brand}</p>
  //       </div>
  //     );
  //   }
  // }

  displayData() {
    const data = this.props.data;
    const parse = require('html-react-parser');

    let id = window.location.pathname;
    id = id.split('/');
    id = id[id.length - 1];

    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      return data.categories[this.props.category].products.map((item) => {
        if (item.id === id) {
          return (
            <div>
              <li key={item.id}>
                <h2>Name: </h2>
                {item.name}
                <h4>ID: </h4>
                {item.id}
                <h4>Category: </h4>
                {item.category}
                <h4>In Stock: </h4>
                {item.inStock}
                <h4>Price: </h4>
                {item.prices[this.props.currency].currency.symbol}
                {item.prices[this.props.currency].amount}
                <h4>Attribute: </h4>
                {item.attributes.map((atr) => {
                  return (
                    <ul>
                      <li>
                        <h5>{atr.name}</h5>
                        {atr.items.map((atr2) => {
                          return (
                            <ul>
                              <li>{atr2.value}</li>
                            </ul>
                          );
                        })}
                      </li>
                    </ul>
                  );
                })}
                <h4>Images: </h4>
                {item.gallery.map((img) => {
                  return <img src={img} alt={item.name}></img>;
                })}
                <h4>Description: </h4>
                {parse(item.description)}
              </li>
            </div>
          );
        }
      });
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div>{this.displayData()}</div>
      </div>
    );
  }
}

console.log(window.location.href);

export default graphql(getAllProducts)(ProductPage);
//export default graphql(productRequest(id))(ProductPage);
