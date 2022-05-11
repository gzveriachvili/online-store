import './style/App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ErrorPage from './components/Utils/ErrorPage/ErrorPage';
import Header from './components/Utils/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route
          path='/sw-erd-test'
          element={<Navigate to='/sw-erd-test/all' />}
        />
        <Route
          path='/sw-erd-test/all'
          element={<CategoryPage category='0' />}
        />
        <Route
          path='/sw-erd-test/clothes'
          element={<CategoryPage category='1' />}
        />
        <Route
          path='/sw-erd-test/tech'
          element={<CategoryPage category='2' />}
        />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
