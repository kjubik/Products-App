import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from 'src/components/navigation/ProtectedRoutes';
import Navbar from 'src/components/navigation/Navbar';
import NewProductPage from './pages/NewProductPage';
import EditProductPage from './pages/EditProductPage';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import UsersPage from './pages/UsersPage';


const firebaseConfig = {
  apiKey: "AIzaSyCyuax0IhEU-XCqCtUjr4ZGXTtha4t0Fg8",
  authDomain: "products-85273.firebaseapp.com",
  projectId: "products-85273",
  storageBucket: "products-85273.appspot.com",
  messagingSenderId: "727089448043",
  appId: "1:727089448043:web:9fbe3051235646d07f1d2e"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
console.log('Firebase app initialized');


function App() {
  return (
    <>
    <div className='bg-slate-50 h-full min-h-screen'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/products' element={<ProductsPage />} />
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
