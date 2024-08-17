import { useContext } from "react";
import { TbLogout2 } from "react-icons/tb";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  console.log(user);
  const handleLogOut = () => {
    logout();
  };
  return (
    <div className="navbar bg-green-800 md:px-20 flex-col md:flex-row justify-between">
      <div className=" flex justify-center md:justify-start">
        <a className="btn btn-ghost text-xl md:text-2xl text-white">
          GadgetGlance
        </a>
      </div>
      {user && (
        <button onClick={handleLogOut} className="text-white text-xl">
          <TbLogout2 />
        </button>
      )}
    </div>
  );
};

export default Navbar;
