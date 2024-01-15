import { Link } from 'react-router-dom';


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
            <Link to='/create-account' className="rounded-full bg-blue-500 hover:bg-blue-700 px-4 py-1 text-white font-semibold">
                Create Account
            </Link>
            <Link to='/sign-in' className="rounded-full bg-slate-400 hover:bg-slate-600 px-4 py-1 text-white font-semibold">
                Sign In
            </Link>
          </div>
      </div>  
    );
};

export default HomePage;
