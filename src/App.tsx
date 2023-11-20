import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import ProtectedRoutes from './components/ProtectedRoutes';
import GoogleAuthButton from './components/userAuthentication/GoogleAuthButton';
import SignOutButton from './components/userAuthentication/SignOutButton';

const firebaseConfig = {
  apiKey: "AIzaSyBpHcUmLa0dy7AtEKrVICURN4oxHS0jTZA",
  authDomain: "pracowniaprogramowania-792db.firebaseapp.com",
  projectId: "pracowniaprogramowania-792db",
  storageBucket: "pracowniaprogramowania-792db.appspot.com",
  messagingSenderId: "742625012766",
  appId: "1:742625012766:web:0364cb36d4adad8cc0520f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

function App() {

  return (
    <>
      <nav>
        <h1>ProductPal</h1>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="products">Products</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
        <GoogleAuthButton />
        <SignOutButton />
      </nav>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route element={<ProtectedRoutes />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;
