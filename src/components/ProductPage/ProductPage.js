import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { getAllProducts } from '../../services/getQueries';
import './style/productpage.scss';

import CartContext from '../Context/CartContext';

class ProductPage extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  resetSelection() {
    let allAttributes = document.querySelectorAll('.product-attributes');

    allAttributes.forEach((attribute) => {
      attribute = attribute.childNodes;
      for (let i = 0; i <= attribute.length - 1; i++) {
        attribute.forEach((option) => {
          option.classList.remove('attribute-selected');
        });
      }
      attribute[0].classList.add('attribute-selected');
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
        //attribute[0].classList.add('attribute-selected');
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
      //colorAttributes[0].classList.add('color-selected');
      colorAttributes[i].addEventListener('click', () => {
        colorAttributes.forEach((option) => {
          option.classList.remove('color-selected');
        });
        colorAttributes[i].classList.add('color-selected');
      });
    }
  }

  getSelectedAtr() {
    let selectedAtr = document.querySelectorAll('.attribute-selected');
    let arr = [];
    selectedAtr.forEach((child) => {
      arr.push({
        value: child.getAttribute('value'),
        id: child.getAttribute('data-index'),
      });
    });

    return arr;
  }

  getSelectedCol() {
    let selectedCol = document.querySelectorAll('.color-selected');
    let arr = [];
    selectedCol.forEach((child) => {
      arr.push({
        value: child.getAttribute('value'),
        id: child.getAttribute('data-index'),
      });
    });

    return arr;
  }

  getOccurrence(array, value, wordLength) {
    var count = 1;

    array.forEach((v) => {
      return v.slice(0, wordLength.length) == value && count++;
    });
    return count;
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

  static contextType = CartContext;
  displayData() {
    const { itemNames, addItem, quantities, addQuantity } = this.context;
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

                {item.attributes.map((atr, index) => {
                  if (atr.name !== 'Color') {
                    return (
                      <div className='attributes-section'>
                        <p className='attribute-name'>{atr.name}:</p>
                        <ul className='product-attributes'>
                          {atr.items.map((atr2, index2) => {
                            return (
                              <li
                                data-index={`${index}${index2}`}
                                value={atr2.value}
                              >
                                {atr2.value}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  } else {
                    return (
                      <div className='attributes-section'>
                        <p className='attribute-name'>{atr.name}:</p>
                        <ul className='product-color'>
                          {atr.items.map((atr2, index2) => {
                            return (
                              <li
                                value={atr2.value}
                                data-index={`${index}${index2}`}
                              ></li>
                            );
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
                    let allAttributes = document.querySelectorAll(
                      '.product-attributes'
                    );
                    let colorAttributes =
                      document.querySelectorAll('.product-color');

                    console.log(
                      'getSelectedCol().length',
                      this.getSelectedCol().length
                    );
                    console.log(
                      'colorAttributes.length',
                      colorAttributes.length
                    );

                    if (
                      this.getSelectedAtr().length !== allAttributes.length ||
                      this.getSelectedCol().length !== colorAttributes.length
                    ) {
                      alert('Please select product attributes');
                    } else {
                      if (
                        !itemNames.includes(
                          item.name +
                            this.getSelectedAtr()
                              .map((val) => val.value)
                              .join('')
                        )
                      ) {
                        addItem(
                          [
                            [item],
                            [this.getSelectedAtr()],
                            [this.getSelectedCol()],
                            [
                              item.name +
                                this.getSelectedAtr()
                                  .map((val) => val.value)
                                  .join('') +
                                this.getSelectedCol()
                                  .map((val) => val.value)
                                  .join(''),
                            ],
                          ],

                          item.name +
                            this.getSelectedAtr()
                              .map((val) => val.value)
                              .join('') +
                            this.getSelectedCol()
                              .map((val) => val.value)
                              .join('')
                        );
                      } else {
                        addQuantity(
                          item.name +
                            this.getSelectedAtr()
                              .map((val) => val.value)
                              .join('') +
                            this.getOccurrence(quantities, item.name, item.name)
                        );
                      }
                      //this.resetSelection();
                    }
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

  render() {
    return <div>{this.displayData()}</div>;
  }
}

export default graphql(getAllProducts)(ProductPage);
