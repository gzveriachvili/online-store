import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../../services/getQueries';
import './style/productpage.scss';
import { Link } from 'react-router-dom';

import AuthContext, {
  AuthProvider,
  AuthConsumer,
} from '../Context/AuthContext';

class ProductPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
    };
  }

  addItem(item) {
    this.setState({
      cart: this.state.cart.concat(item),
    });

    //Prevent duplicate attributes after

    let allAttributes = document.querySelectorAll('.product-attributes');

    allAttributes.forEach((attribute) => {
      attribute = attribute.childNodes;
      for (let i = 0; i <= attribute.length - 1; i++) {
        attribute.forEach((option) => {
          option.classList.remove('attribute-selected');
        });
      }
    });

    let colorAttributes = document.querySelector('.product-color').childNodes;

    for (let i = 0; i <= colorAttributes.length - 1; i++) {
      colorAttributes[i].classList.remove('color-selected');
    }
  }

  changeImage(e) {
    console.log(e.target.src);
    let imgRight = document.querySelector('.img-right').firstChild;

    imgRight.src = e.target.src;
  }

  convertHexToSwatch() {
    let productColor = document.querySelector('.product-color').childNodes;
    productColor.forEach((child) => {
      child.style.backgroundColor = child.getAttribute('value');
      if (child.getAttribute('value') === '#FFFFFF') {
        child.classList.add('color-visibility');
      }
    });
  }

  createToggle() {
    //Attributes
    let allAttributes = document.querySelectorAll('.product-attributes');

    allAttributes.forEach((attribute) => {
      attribute = attribute.childNodes;
      for (let i = 0; i <= attribute.length - 1; i++) {
        attribute[0].classList.add('attribute-selected');
        attribute[i].addEventListener('click', () => {
          attribute.forEach((option) => {
            option.classList.remove('attribute-selected');
          });

          attribute[i].classList.add('attribute-selected');
        });
      }
    });

    //Colors
    let colorAttributes = document.querySelector('.product-color').childNodes;
    for (let i = 0; i <= colorAttributes.length - 1; i++) {
      colorAttributes[0].classList.add('color-selected');
      colorAttributes[i].addEventListener('click', () => {
        colorAttributes.forEach((option) => {
          option.classList.remove('color-selected');
        });
        colorAttributes[i].classList.add('color-selected');
      });
    }
  }

  componentDidMount() {
    try {
      this.convertHexToSwatch();
    } catch (error) {
      console.log(error);
    }

    try {
      this.createToggle();
    } catch (error) {
      console.log(error);
    }
  }

  componentDidUpdate() {
    try {
      this.convertHexToSwatch();
    } catch (error) {
      console.log(error);
    }

    try {
      this.createToggle();
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

                <button
                  onClick={() => {
                    this.addItem(item);

                    console.log('CART: ', this.state.cart);
                  }}
                >
                  add to cart
                </button>

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

  static contextType = AuthContext;

  render() {
    console.log('Context:', this.context);
    const { username, isAuthenticated, logIn, logOut } = this.context;
    return (
      <div>
        <Link to='/sw-erd-test/cart'>Cart</Link>
        <h1>User: {username}</h1>
        <button
          onClick={() => {
            logIn('its working');
          }}
        >
          LOG IN
        </button>
        {this.displayData()}
        <h1>
          {this.state.cart.map((item) => {
            return item.name;
          })}
        </h1>
      </div>
    );
  }
}

export default graphql(getAllProducts)(ProductPage);
