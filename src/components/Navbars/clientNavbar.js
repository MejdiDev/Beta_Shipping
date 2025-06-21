
import React from "react";
import { Link } from "react-router-dom";
import { ShipIcon } from "lucide-react";
import "assets/styles/tailwind.css";
import IndexDropdown from "components/Dropdowns/IndexDropdown.js";
import UserDropdown from "components/Dropdowns/UserDropdown";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <>
      <nav className="top-0 z-50 w-full flex flex-wrap items-center justify-between py-2 pb-6 navbar-expand-lg bg-light-background-gradient shadow">
        <div className="container px-1 mx-auto flex flex-wrap items-center justify-between">
          <div style={{ width: "55px", height: "55px", padding: ".5rem" }} className="bg-lightBlue-500 rounded-lg flex items-center justify-center mr-2">
            <ShipIcon size={56} className="text-white" />
          </div>
          <div className="w-full relative flex lg:w-auto">
            <Link
              to="/firstpage"
              className="text-lightBlue-500 text-3xl font-bold whitespace-pre-wrap mr-4 py-2 uppercase rounded-lg px-3 hover:shadow-xl transition-all"
            >
              Doc Flow
            </Link>
            <button
              className="cursor-pointer text-sm leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>

          <div
            className={
              "lg:flex flex-grow items-center bg-primary-blue-gradient lg:bg-opacity-0 lg:shadow-none" +
              (navbarOpen ? " block" : " hidden")
            }
            id="example-navbar-warning"
          >
            <ul className="flex lg:flex-row list-none lg:ml-auto flex-col lg:items-center items-center">
              <div>
                
                <Link
                  to="/client/clientpage"
                  className="text-gray-700 hover:text-blue-600 transition-colors mr-4"
                >
                  Dashboard
                </Link>
                
                <Link
                  to="/client/clientrequest"
                  className="text-gray-700 hover:text-blue-600 transition-colors mr-4"
                >
                  Request Quote
                </Link>
                 <Link
                  to="/client/quotes"
                  className="text-gray-700 hover:text-blue-600 transition-colors mr-4"
                >
                  Quotes
                </Link>
                <Link
                  to="/client/shipments"
                  className="text-gray-700 hover:text-blue-600 transition-colors mr-4"
                >
                  Shipments
                </Link>
                <Link
                  to="/client/documents"
                  className="text-gray-700 hover:text-blue-600 transition-colors mr-4"
                >
                  Documents
                </Link>
                
               
              </div>
                <li className="flex items-center mr-2">
                <IndexDropdown />
              </li>
               <li className="flex items-center -mt-5">
                <UserDropdown />
              </li>

             
              {/* ... other navbar items ... */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}