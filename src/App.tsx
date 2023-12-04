import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from 'src/components/common/ProtectedRoutes';
import Navbar from 'src/components/common/Navbar';
import ProductPage from 'src/pages/ProductPage';
import NewProductPage from './pages/NewProductPage';
import EditProductPage from './pages/EditProductPage';


const firebaseConfig = {
  apiKey: "AIzaSyBpHcUmLa0dy7AtEKrVICURN4oxHS0jTZA",
  authDomain: "pracowniaprogramowania-792db.firebaseapp.com",
  projectId: "pracowniaprogramowania-792db",
  storageBucket: "pracowniaprogramowania-792db.appspot.com",
  messagingSenderId: "742625012766",
  appId: "1:742625012766:web:90f6ea94880f4e87c0520f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {

  return (
    <>
    <div className='bg-slate-50 h-full min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route path='/product/:productId' element={<ProductPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<ProfilePage />} />
            <Route path='/new-product' element={<NewProductPage/>} />
            <Route path='/edit-product/:productId' element={<EditProductPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App;
