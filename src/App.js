import './style/App.scss';
import { Route, Routes } from 'react-router-dom';
import CategoryPage from './components/CategoryPage/CategoryPage';
import Header from './components/Utils/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<CategoryPage category='0' />} />
        <Route path='/all' element={<CategoryPage category='0' />} />
        <Route path='/clothes' element={<CategoryPage category='1' />} />
        <Route path='/tech' element={<CategoryPage category='2' />} />
      </Routes>
    </div>
  );
}

export default App;
