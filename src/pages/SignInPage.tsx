import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";
import { signInWithEmailAndPassword, getAuth, UserCredential } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/shadcn-ui/ui/input";
import { Button } from "src/shadcn-ui/ui/button";


const SignInPage = () => {

    const auth = getAuth();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential: UserCredential) => {
            console.log('userCredential', userCredential)
            // const user = userCredential.user;
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
            <Input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="secondary" 
                onClick={handleSignIn}
            >
                Sign In
            </Button>
        </div>
    </div>
    );
}; 

export default SignInPage;
