import React, { Component } from 'react';

const CartContext = React.createContext();
export const CartConsumer = CartContext.Consumer;

export class CartProvider extends Component {
  state = {
    cart: [],
    itemNames: [],
    quantities: [],
    qtyID: 1,
  };

  addItem = (object, itemName) => {
    this.setState((prevState) => ({
      cart: [...prevState.cart, object],
      itemNames: [...this.state.itemNames, itemName],
    }));
  };

  addQuantity = (quantity) => {
    this.setState({
      quantities: [...this.state.quantities, quantity],
      qtyID: this.state.qtyID + 1,
    });
  };

  removeQuantity = (toremove, lastItemID) => {
    this.setState({
      quantities: this.state.quantities.filter((prod) => prod !== toremove),
      qtyID: parseInt(lastItemID),
    });
  };

  emptyCart = () => {
    this.setState({
      cart: [],
    });
  };

  render() {
    const { cart, itemNames, quantities, qtyID } = this.state;
    const { addItem, emptyCart, addQuantity, removeQuantity } = this;
    return (
      <CartContext.Provider
        value={{
          cart,
          itemNames,
          quantities,
          qtyID,
          addQuantity,
          removeQuantity,
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
