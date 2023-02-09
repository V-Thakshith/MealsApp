import logo from './logo.svg';
import './App.css';
import Favorites from './components/Favorites.jsx'
import Meals from './components/Meals';
import Search from './components/Search.jsx';
import Modal from './components/Modal';
import { useGlobalContext } from './context';

function App() {
  const {showModal,favourites}=useGlobalContext()
  return (    
    <main>
      <Search/>
      {favourites.length>0 && <Favorites/>}
      <Meals/>
      {showModal && <Modal/>}
    </main>
  );
}

export default App;
