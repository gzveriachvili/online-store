import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../../services/getQueries';
import './style/productpage.scss';

class ProductPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  changeImage(e) {
    console.log(e.target.src);
    let imgRight = document.querySelector('.img-right').firstChild;
    console.log(imgRight);

    imgRight.src = e.target.src;
  }

  componentDidMount() {
    try {
      let productColor = document.querySelector('.product-color').childNodes;
      productColor.forEach((child) => {
        child.style.backgroundColor = child.getAttribute('value');
      });
    } catch (error) {
      console.log(error);
    }
  }

  displayData() {
    const data = this.props.data;
    const parse = require('html-react-parser');

    let id = window.location.pathname;
    id = id.split('/');
    id = id[id.length - 1];

    if (data.loading) {
      return <div>Loading...</div>;
    } else {
      // eslint-disable-next-line array-callback-return
      return data.categories[this.props.category].products.map((item) => {
        if (item.id === id) {
          return (
            <div className='product-info'>
              <div className='img-section'>
                <div className='img-left'>
                  {item.gallery.map((img, index) => {
                    return (
                      <img
                        className={`small-img-${index}`}
                        onClick={(e) => {
                          this.changeImage(e);
                        }}
                        src={img}
                        alt={item.name}
                      ></img>
                    );
                  })}
                </div>

                <div className='img-right'>
                  <img src={item.gallery[0]} alt={item.name}></img>
                </div>
              </div>
              <div className='details-section'>
                <div className='brand-and-name'>
                  <p>{item.brand}</p>
                  <p>{item.name}</p>
                </div>

                {item.attributes.map((atr) => {
                  if (atr.name !== 'Color') {
                    return (
                      <div className='attributes-section'>
                        <p className='attribute-name'>{atr.name}:</p>
                        <ul className='product-attributes'>
                          {atr.items.map((atr2) => {
                            return <li value={atr2.value}>{atr2.value}</li>;
                          })}
                        </ul>
                      </div>
                    );
                  } else {
                    return (
                      <div className='attributes-section'>
                        <p className='attribute-name'>{atr.name}:</p>
                        <ul className='product-color'>
                          {atr.items.map((atr2) => {
                            return <li value={atr2.value}></li>;
                          })}
                        </ul>
                      </div>
                    );
                  }
                })}

                <div className='product-price'>
                  <p>Price: </p>
                  <p>
                    {item.prices[this.props.currency].currency.symbol}
                    {item.prices[this.props.currency].amount}
                  </p>
                </div>

                <button>add to cart</button>
                <div className='product-description'>
                  {parse(item.description)}
                </div>
              </div>
            </div>
          );
        }
      });
    }
  }

  render() {
    console.log(this.props);
    return this.displayData();
  }
}

export default graphql(getAllProducts)(ProductPage);
