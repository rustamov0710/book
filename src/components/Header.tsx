import { useState, ChangeEvent } from "react";
// @ts-ignore
import logo from "../assets/logo.svg";
// @ts-ignore
import search from "../assets/search.svg";
// @ts-ignore
import bell from "../assets/bell.svg";
// @ts-ignore
import profile from "../assets/user-image.svg";

interface HeaderProps {
  setSearchTitle: (title: string) => void;
}

const Header: React.FC<HeaderProps> = ({ setSearchTitle }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setSearchTitle(e.target.value);
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
