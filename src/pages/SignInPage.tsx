import GoogleAuthButton from "src/components/authentication/GoogleAuthButton";


const SignInPage = () => {
    
    return (
        <div className="py-16 mx-auto flex flex-col items-center gap-4">
        <GoogleAuthButton />
        <p>or</p>
        <div className="flex flex-col gap-2">
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button>Sign In</button>
        </div>
    </div>
    );
}; 

export default SignInPage;
