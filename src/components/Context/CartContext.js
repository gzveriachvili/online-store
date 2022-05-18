import React, { Component } from 'react';

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends Component {
  state = {
    cart: [],
  };

  logIn = (object) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, object],
    }));
  };

  render() {
    const { cart } = this.state;
    const { logIn } = this;
    return (
      <CartContext.Provider
        value={{
          cart,
          logIn,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}

export default CartContext;
