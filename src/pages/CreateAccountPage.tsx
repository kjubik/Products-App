import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "src/firebase/types/User";
import { postUser } from "src/firebase/services/users";


const CreateAccountPage = () => {

    const auth = getAuth();
    const naviagte = useNavigate();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleCreateAccount = async () => {
        // ...
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            const user = userCredential.user;

            if (!user.email) return;
            const userData: User = {
                id: user.uid,
                email: user.email,
                username: username,
                isAdmin: false,
                displayName: username,
            }
            await postUser(userData);

            naviagte("/products");
        })
        .catch((error) => {
            console.error("Error creating account", error);
        });
    }

    return (
    <div className="py-16 mx-auto flex flex-col items-center gap-4">
        <GoogleAuthButton />
        <p>or</p>
        <div className="flex flex-col gap-2">
            <input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
            />
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
            <button onClick={handleCreateAccount}>Create Account</button>
        </div>
    </div>
    );
}; 

export default CreateAccountPage;
