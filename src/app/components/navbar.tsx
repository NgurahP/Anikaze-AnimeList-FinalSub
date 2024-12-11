import Link from "next/link";
import logo from "./img/nav-logo-red.png";
import Image from "next/image";
import { useState } from "react";

interface NavbarProps {
  onSelectSection: (section: string) => void;
}
const [navbar, setNavbar] = useState(false);
const navChange = () => {
  if (window.pageYOffset >= 1320) {
    setNavbar(true);
  } else if (window.pageYOffset >= 800) {
    setNavbar(true);
  } else if (window.pageYOffset >= 600) {
    setNavbar(true);
  } else {
    setNavbar(false);
  }
};
window.addEventListener("scroll", navChange);

function Navbar({ onSelectSection }: NavbarProps) {
  return (
    <nav
      className={`w-full bg-transparent border-gray-200 dark:bg-gray-900 z-20 ${
        navbar ? `fixed` : ``
      }`}>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="./"
          className="flex items-center space-x-3 rtl:space-x-reverse relative">
          <Image
            src={logo}
            className="pl-8"
            alt="Anikaze Logo"
            height={64}
            width={149}
          />
          <span className="absolute self-center text-2xl font-semibold whitespace-nowrap text-white dark:text-white">
            AniKaze
          </span>
        </Link>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <button
                onClick={() => onSelectSection("home")}
                className="block py-2 px-3 font-bold text-white bg-blue-700 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-blue-500">
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => onSelectSection("anime")}
                className={`block py-2 px-3 font-bold text-white rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-red-700 md:p-0 dark:text-white md:dark:hover:text-red-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent`}>
                Anime List
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
