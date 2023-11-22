import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from './components/common/ProtectedRoutes';
import Navbar from './components/common/Navbar';


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
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/products' element={<ProductsPage />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<ProfilePage />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
