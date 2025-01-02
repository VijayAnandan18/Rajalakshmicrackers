import logo from './logo.svg';
import './App.css';
import AddProductForm from './components/AddProductForm';
import ProductsList from './components/ProductsList';
import UserProfile from './components/UserProfile';
import CreateOrder from './components/CreateOrder';
import AdminOrdersPage from './components/AdminOrdersPage';

function App() {
  return (
    <div className="App">
     <AddProductForm/>
     <ProductsList/>
     <UserProfile/>
     <CreateOrder/>
     <AdminOrdersPage/>
    </div>
  );
}

export default App;
