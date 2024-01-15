import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";

const CreateAccountPage = () => {
    
    return (
    <div className="py-16 mx-auto flex flex-col items-center gap-4">
        <GoogleAuthButton />
        <p>or</p>
        <div className="flex flex-col gap-2">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button>Create Account</button>
        </div>
    </div>
    );
}; 

export default CreateAccountPage;
