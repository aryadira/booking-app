import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className='bg-blue-800 py-6'>
      <div className='container mx-auto flex justify-between'>
        <span className='text-3xl text-white font-bold tracking-tight'>
          <Link to='/'>Mernholiday.com</Link>
        </span>
        <span className='flex space-x-2'>
          {isLoggedIn ? (
            <span className='text-md flex text-slate-300 font-bold items-center gap-5 tracking-tight'>
              <Link to='/bookings' className='hover:bg-blue-700 focus:bg-blue-800 hover:text-white py-2 px-3 rounded-sm'>
                My Bookings
              </Link>
              <Link to='/hotels' className='hover:bg-blue-700 focus:bg-blue-800 hover:text-white py-2 px-3 rounded-sm'>
                My Hotels
              </Link>
              <SignOutButton />
            </span>
          ) : (
            <Link to='/sign-in' className='flex items-center text-blue-600 py-2 px-3 rounded-sm font-bold bg-white hover:bg-gray-300'>
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
