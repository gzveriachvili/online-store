import React, { Component } from 'react';
import './style/card.scss';

class Card extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='product-card'>
        <div className='img-text'>
          <img src={this.props.thumbnail} alt={this.props.productTitle}></img>
          <div className='title-price'>
            <h4>{this.props.productTitle}</h4>
            <p>{this.props.productPrice}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
