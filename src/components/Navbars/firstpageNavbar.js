/*eslint-disable*/
import React from "react";
import { Link } from "react-router-dom";
import { AnchorIcon, ship, ShipIcon, ShipWheel } from "lucide-react";
import "assets/styles/tailwind.css";
// components

import IndexDropdown from "components/Dropdowns/IndexDropdown.js";

export default function Navbar(props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className=" top-0 fixed z-50 w-full flex flex-wrap items-center justify-between  py-2 navbar-expand-lg bg-light-background-gradient shadow">
        <div className="container px-1 mx-auto flex flex-wrap items-center justify-between">
          <div className="bg-lightBlue-500  py-2 px-3 rounded-lg flex items-center justify-center mr-2">
            <ShipIcon size={56} className=" text-white " />
          </div>
          <div className="w-full relative flex lg:w-auto  ">
            <Link
              to="/Firstpage"
              className="text-lightBlue-500 text-3xl font-bold whitespace-pre-wrap  mr-4 py-2  uppercase rounded-lg px-3  hover:shadow-xl transition-all "
            >
              Beta Shipping
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
            <ul className="flex lg:flex-row list-none lg:ml-auto flex-col lg:items-center items-start"> 
                <div>
                     <a href="#services" className="text-gray-700 hover:text-blue-600 transition-colors mr-4 ">
                  Services
                </a>
                <a href="#documents" className="text-gray-700 hover:text-blue-600 transition-colors mr-4">
                  Document Hub
                </a>
                <a href="#tracking" className="text-gray-700 hover:text-blue-600 transition-colors mr-4 ">
                  Track Shipment
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 transition-colors mr-4 ">
                  Contact
                </a>
                
                
                {/* Add Login and Sign Up buttons */}
                <Link
                  to="/auth/login"
                  className=" mr-3 px-6 py-2  border-2 rounded-lg  bg-lightBlue-400 text-base text-black bg-center  "
                >
                  Login
                </Link>

                <Link
                  to="/auth/register"
                  className="ml-4 px-4 py-2 text-base bg-lightBlue-400 border-2 rounded-lg text-black "
                >
                  Sign Up
                </Link>
                </div>

              <li className="flex items-center">
                <IndexDropdown />
              </li>
              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-facebook text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Share</span>
                </a>
              </li>

              <li className="flex items-center">
                <a
                  className="hover:text-blueGray-500 text-blueGray-700 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fdemos.creative-tim.com%2Fnotus-react%2F%23%2F&text=Start%20your%20development%20with%20a%20Free%20Tailwind%20CSS%20and%20React%20UI%20Kit%20and%20Admin.%20Let%20Notus%20React%20amaze%20you%20with%20its%20cool%20features%20and%20build%20tools%20and%20get%20your%20project%20to%20a%20whole%20new%20level.%20"
                  target="_blank"
                >
                  <i className="text-blueGray-400 fab fa-twitter text-lg leading-lg " />
                  <span className="lg:hidden inline-block ml-2">Tweet</span>
                </a>
              </li>

             

              
            
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
