import React, { Component } from 'react';
import './style/cartpage.scss';
import { CartConsumer } from '../Context/CartContext';
import ImageSlider from './utils/ImageSlider/ImageSlider';

class CartPage extends Component {
  convertHexToSwatch() {
    let productColor = document.querySelectorAll('.product-color');
    productColor.forEach((child) => {
      let pcNodes = child.childNodes;
      pcNodes.forEach((gChild) => {
        gChild.style.backgroundColor = gChild.getAttribute('value');
        if (gChild.getAttribute('value') === '#FFFFFF') {
          gChild.classList.add('color-visibility');
        }
      });
    });
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

  componentDidMount() {
    try {
      this.convertHexToSwatch();
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
  }

  render() {
    return (
      <div className='cart'>
        <h1>Cart</h1>
        <CartConsumer>
          {(props) => {
            const { cart, addItem } = props;

            console.log('CART CONTENT: ', cart);

            return cart.map((arr) => {
              return arr[0].map((item) => {
                {
                  console.log('This is ITEM:', item);
                }
                return (
                  <div className='product-info cart-page'>
                    <div className='img-section img-section-cart-page'>
                      <div className='cart-page-quantity'>
                        <div
                          onClick={() => {
                            addItem([
                              [item],
                              [this.getSelectedAtr()],
                              [this.getSelectedCol()],
                            ]);
                          }}
                        >
                          <svg
                            width='45'
                            height='45'
                            viewBox='0 0 45 45'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M22.5 15V30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <path
                              d='M15 22.5H30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='44'
                              height='44'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </div>
                        <div>
                          <p>0</p>
                        </div>
                        <div>
                          <svg
                            width='45'
                            height='45'
                            viewBox='0 0 45 45'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <path
                              d='M15 22.5H30'
                              stroke='#1D1F22'
                              stroke-linecap='round'
                              stroke-linejoin='round'
                            />
                            <rect
                              x='0.5'
                              y='0.5'
                              width='44'
                              height='44'
                              stroke='#1D1F22'
                            />
                          </svg>
                        </div>
                      </div>

                      <ImageSlider
                        length={item.gallery.length}
                        imgGallery={item.gallery}
                        imgAlt={item.name}
                      />
                    </div>
                    <div className='details-section details-section-cart-page'>
                      <div className='brand-and-name cart-page-brand-and-name'>
                        <p>{item.brand}</p>
                        <p>{item.name}</p>
                      </div>

                      <div className='product-price cart-page-price'>
                        <p>
                          {item.prices[this.props.currency].currency.symbol}
                          {item.prices[this.props.currency].amount}
                        </p>
                      </div>

                      {item.attributes.map((atr, index) => {
                        if (atr.name !== 'Color') {
                          return (
                            <div className='attributes-section attributes-section-product-page'>
                              <p className='attribute-name'>{atr.name}:</p>
                              <ul className='product-attributes product-attributes-cart-page'>
                                {atr.items.map((atr2, index2) => {
                                  return (
                                    <li
                                      className={
                                        arr[1][0].find((el) => {
                                          return el.value == atr2.value;
                                        }) &&
                                        arr[1][0].find(
                                          (ind) => ind.id == `${index}${index2}`
                                        )
                                          ? 'attribute-selected'
                                          : ''
                                      }
                                      value={atr2.value}
                                      data-index={`${index}${index2}`}
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
                            <div className='attributes-section attributes-section-product-page'>
                              <p className='attribute-name'>{atr.name}:</p>
                              <ul className='product-color product-color-cart-page'>
                                {atr.items.map((atr2, index2) => {
                                  return (
                                    <li
                                      className={
                                        arr[2][0].find(
                                          (el) => el.value == atr2.value
                                        ) &&
                                        arr[2][0].find(
                                          (ind) => ind.id == `${index}${index2}`
                                        )
                                          ? 'color-selected'
                                          : ''
                                      }
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
                    </div>
                  </div>
                );
              });
            });
          }}
        </CartConsumer>

        <CartConsumer>
          {(props) => {
            const { cart, emptyCart } = props;

            return cart.length > 0 ? (
              <div className='order-section'>
                <div className='order-details'>
                  <div className='order-col-1'>
                    <p>Tax 21%:</p>
                    <p>Quantity: </p>
                    <p>Total:</p>
                  </div>
                  <div className='order-col-2'>
                    <p>$42 USD</p>
                    <p>{cart.length}</p>
                    <p>$200 USD</p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    window.confirm("Pressing 'OK' will empty your cart.") &&
                      emptyCart();
                  }}
                >
                  order
                </button>
              </div>
            ) : (
              <div className='empty-cart'>
                <h2>Your cart is empty.</h2>
              </div>
            );
          }}
        </CartConsumer>
      </div>
    );
  }
}

export default CartPage;
