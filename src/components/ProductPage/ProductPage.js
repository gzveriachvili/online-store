import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { productRequest } from '../../services/getQueries';

class ProductPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  displayData() {
    const data = this.props.data;
    //const parse = require('html-react-parser');
    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <p>{data.product.name}</p>
          <p>{data.product.brand}</p>
        </div>
      );
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

let id = window.location.pathname;
id = id.split('/');
id = id[id.length - 1];

export default graphql(productRequest(id))(ProductPage);
