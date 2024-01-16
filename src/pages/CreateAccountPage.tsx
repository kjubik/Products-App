import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "src/firebase/types/User";
import { postUser } from "src/firebase/services/users";
import { Input } from "@/shadcn-ui/ui/input";
import { Button } from "src/shadcn-ui/ui/button";


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
            <Input 
                type="text" 
                placeholder="Username" 
                onChange={(e) => setUsername(e.target.value)}
            />
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
                onClick={handleCreateAccount}
            >
                Create Account
            </Button>
        </div>
    </div>
    );
}; 

export default CreateAccountPage;
