import './App.css'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

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

  async function getUser() {
    const user = await auth.currentUser;
    console.log('hello', user);
  }

  return (
    <>
      <div>
        <h1>Pracowania Programowania</h1>
        <button onClick={getUser}>Click me!</button>
      </div>
    </>
  )
}

export default App;
