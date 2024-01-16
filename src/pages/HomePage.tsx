import { Link } from 'react-router-dom';
import { buttonVariants } from "@/shadcn-ui/ui/button";


const HomePage = () => {

  return (
    <div
    className="flex flex-col gap-4 items-center justify-center p-6"
    >
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        ProductsApp
      </h1>
      <p>An account is required to use the app.</p>
      <div className="flex gap-4">
        <Link to='/create-account' className={buttonVariants({ variant: "default" })}>
          Create Account
        </Link>
        <Link to='/sign-in' className={buttonVariants({ variant: "secondary" })}>
          Sign In
        </Link>
      </div>
    </div>  
  );
};

export default HomePage;
