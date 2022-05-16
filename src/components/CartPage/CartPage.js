import React, { Component } from 'react';
import AuthContext, {
  AuthProvider,
  AuthConsumer,
} from '../Context/AuthContext';

class CartPage extends Component {
  render() {
    return (
      <AuthConsumer>
        {(props) => {
          const { username, isAuthenticated, logIn, logOut } = props;
          return (
            <div>
              <h1>Username: {username}</h1>
              <button onClick={logIn}>LOG IN</button>
            </div>
          );
        }}
      </AuthConsumer>
    );
  }
}

export default CartPage;
