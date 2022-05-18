import React, { Component } from 'react';
import './style/cartpage.scss';
import CartContext, {
  CartProvider,
  CartConsumer,
} from '../Context/CartContext';

class CartPage extends Component {
  convertHexToSwatch() {
    let productColor = document.querySelector('.product-color').childNodes;
    productColor.forEach((child) => {
      child.style.backgroundColor = child.getAttribute('value');
      if (child.getAttribute('value') === '#FFFFFF') {
        child.classList.add('color-visibility');
      }
    });
  }

  componentDidMount() {
    try {
      this.convertHexToSwatch();
    } catch (error) {
      console.log(error);
    }

    try {
    } catch {}
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
            const { cart } = props;
            console.log('CART CONTENT: ', cart);

            return cart.map((arr) => {
              return arr[0].map((item) => {
                return (
                  <div className='product-info cart-page'>
                    <div className='img-section img-section-cart-page'>
                      <div className='cart-page-quantity'>
                        <div>
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

                      <div className='img-right'>
                        <img src={item.gallery[0]} alt={item.name}></img>
                      </div>
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
                                      data-index={`${index}${index2}`}
                                      className={
                                        arr[1][0].find((el) => {
                                          console.log('EL: ', el);
                                          return el.value == atr2.value;
                                        }) &&
                                        arr[1][0].find(
                                          (ind) => ind.id == `${index}${index2}`
                                        )
                                          ? 'attribute-selected'
                                          : ''
                                      }
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
                            <div className='attributes-section attributes-section-product-page'>
                              <p className='attribute-name'>{atr.name}:</p>
                              <ul className='product-color product-color-cart-page'>
                                {atr.items.map((atr2) => {
                                  return <li value={atr2.value}></li>;
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
      </div>
    );
  }
}

export default CartPage;
