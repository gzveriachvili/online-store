import './style/App.scss';
import { Route, Routes, Navigate } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Header from './components/Utils/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Navigate to='/all' />} />
        <Route path='/all' element={<CategoryPage category='0' />} />
        <Route path='/clothes' element={<CategoryPage category='1' />} />
        <Route path='/tech' element={<CategoryPage category='2' />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
