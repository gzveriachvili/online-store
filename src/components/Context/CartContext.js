import React, { Component } from 'react';

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends Component {
  state = {
    cart: [],
  };

  addItem = (object) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, object],
    }));
  };

  emptyCart = () => {
    this.setState({
      cart: [],
    });
  };

  render() {
    const { cart } = this.state;
    const { addItem, emptyCart } = this;
    return (
      <CartContext.Provider
        value={{
          cart,
          addItem,
          emptyCart,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
