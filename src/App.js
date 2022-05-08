import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import ProductsList from './components/ProductsList';
import './style/App.scss';

// Apollo client setup
const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className='App'>
        <h1>Query Test</h1>
        <ProductsList />
      </div>
    </ApolloProvider>
  );
}

export default App;
