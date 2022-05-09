import './style/App.scss';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Link, Route, Switch } from 'react-router-dom';
import ProductsList from './components/ProductsList';
import Header from './components/Utils/Header/Header';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <Header />

        <ProductsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
