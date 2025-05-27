import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import bell from "../assets/bell.svg";
import profile from "../assets/user-image.svg";
import { AuthContext } from "../context/Auth";
import { toast } from "react-toastify";

const Header = ({ setSearchTitle }) => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { setAuth } = authContext;

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchTitle(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("key");
    localStorage.removeItem("secret");
    localStorage.removeItem("auth");
    setAuth(false);
    toast.info("Logged out successfully!");
    navigate("/signin");
  };

  return (
    <header className="text-white flex items-center px-6 py-3 rounded-bl-[80px] justify-between">
      <div className="flex gap-[24px] items-center">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="logo" className="w-[150px] h-[36px]" />
        </div>

        <div className="flex items-center px-3 py-1.5 w-80">
          <img src={search} alt="search" className="w-4 h-4 mr-2" />
          <input
            type="text"
            placeholder="Search for any training you want"
            className="bg-transparent outline-none text-sm text-white w-full placeholder-gray-400"
            value={inputValue}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={handleLogout}
          className="text-sm bg-red-600 hover:bg-red-500 text-white py-1.5 px-4 rounded transition"
        >
          Log Out
        </button>
        <img src={bell} alt="notifications" className="w-6 h-6" />
        <img
          src={profile}
          alt="profile"
          className="w-8 h-8 rounded-full border-2 border-pink-500"
        />
        
      </div>
    </header>
  );
};

export default Header;
