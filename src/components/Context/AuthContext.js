import React, { Component } from 'react';

const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends Component {
  state = {
    username: '',
    isAuthenticated: false,
  };

  logIn = () => {
    this.setState({
      username: 'Bob',
      isAuthenticated: true,
    });
  };

  logOut = () => {
    this.setState({
      username: '',
      isAuthenticated: false,
    });
  };

  render() {
    const { username, isAuthenticated } = this.state;
    const { logIn, logOut } = this;
    return (
      <AuthContext.Provider
        value={{
          username,
          isAuthenticated,
          logIn,
          logOut,
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
