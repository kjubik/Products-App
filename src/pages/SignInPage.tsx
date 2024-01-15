import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignInPage = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/products");
        })
        .catch((error) => {
            error("Error creating account", error);
        });
    }

    return (
        <div className="py-16 mx-auto flex flex-col items-center gap-4">
        <GoogleAuthButton />
        <p>or</p>
        <div className="flex flex-col gap-2">
            <input 
                type="email" 
                placeholder="Email" 
                onChange={(e) => setEmail(e.target.value)}
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn}>Sign In</button>
        </div>
    </div>
    );
}; 

export default SignInPage;
