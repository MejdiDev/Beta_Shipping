import React from "react";

export default function Footer() {
  return (
    <footer className="relative bg-white pt-8 pb-6">
      <div
        className="bottom-auto top-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden -mt-20 h-20"
        style={{ transform: "translateZ(0)" }}
      >
        <svg
          className="absolute bottom-0 overflow-hidden"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            className="text-blueGray-200 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
      <div className="px-4">
        <div className="flex flex-wrap text-center lg:text-left">
          {/* Company Info */}
          <div className="w-full lg:w-6/12 px-4 mb-6 lg:mb-0">
            <h4 className="text-2xl font-semibold text-blueGray-700">DocFlow</h4>
            <p className="text-blueGray-600 mt-2">
              Smart freight forwarding for global businesses. Let's keep in touch!
            </p>

            <div className="mt-4 flex justify-center items-center lg:justify-start">
              <a href="" className="text-blueGray-600 hover:text-blue-600 mr-3">
                <i className="fab fa-facebook-f text-2xl"></i>
              </a>

              <a href="" className="text-blueGray-600 hover:text-blue-600 mr-3">
                <i className="fab fa-linkedin-in text-2xl"></i>
              </a>

              <a href="" className="text-blueGray-600 mr-3">
                <i className="fab fa-instagram text-2xl"></i>
              </a>

              <a href="" className="text-blueGray-600">
                <i className="fab fa-github text-2xl"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="w-full lg:w-3/12 px-4">
            <span className="flex uppercase text-blueGray-500 text-sm font-semibold mb-2">
              Quick Links
            </span>
            <ul className="list-none">
              <li>
                <a href="/about" className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="/services" className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm">
                  Contact
                </a>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div className="w-full lg:w-3/12 px-4">
            <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2">
              Contact
            </span>
            <ul className="list-none text-sm">
              <li className="flex items-center pb-2">
                <i className="fas fa-map-marker-alt mr-2 text-blue-500"></i>
                Montplaisir Tunisia
              </li>
              <li className="flex items-center pb-2">
                <i className="fas fa-phone-alt mr-2 text-blue-500"></i>
                +1 (555) 123-4567
              </li>
              <li className="flex items-center pb-2">
                <i className="fas fa-envelope mr-2 text-blue-500"></i>
                support@DocFlow.com
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-6 border-blueGray-300" />

        <div className="flex flex-wrap items-center justify-center md:justify-between text-sm text-blueGray-500">
          <div className="w-full md:w-6/12 px-4 text-center md:text-left">
            © {new Date().getFullYear()} DocFlow. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
}
