import React from "react";
import {} from "react-router-dom";
import {} from "lucide-react";

// components

import Navbar from "components/Navbars/firstpageNavbar.js";
import Footer from "components/Footers/Footer.js";

export default function Landing() {
  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-10 pb-32  flex content-center items-center justify-center min-h-screen-100">
          <div
            className="absolute top-0 w-full h-full "
            style={{
              backgroundImage:
                "url('https://www.ciffa.com/wp-content/uploads/2021/02/4-modes.jpg')",
              backgroundSize: "contain",

              backgroundPosition: "center center",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">
                  <h1 className="text-white font-semibold text-5xl">
                    Complete Freight Solutions
                  </h1>
                  <p className="mt-4 text-2xl text-blueGray-200">
                    Master Your Freight, Master Your Documents, Have Complete
                    Control Over Your Operations .
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
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
        </div>

        <section id="services" className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap  ">
              <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-5 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-6 flex-auto">
                    <div className=" text-2xl text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-purple-500">
                      <i className=" fas fa-plane"></i>
                    </div>
                    <h6 className="text-2xl font-bold2">Air Freight </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Express and standard air cargo services with priority
                      handling.
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400 text-2xl">
                      <i className="fas fa-anchor"></i>
                    </div>
                    <h6 className="text-2xl font-bold2">Ocean Freight</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Full container loads, less than container loads, and break
                      bulk cargo management with complete documentation
                      visibility and control.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-2xl  text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-truck"></i>
                    </div>
                    <h6 className="text-2xl font-semibold">Ground Transport</h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Last-mile delivery, cross-border trucking, and intermodal
                      connections for complete door-to-door service.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div id="documents" className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                <div className="text-white px-3 text-center border inline-flex items-center justify-center w-16 h-16 mb-6 shadow-xl rounded-lg bg-lightBlue-500">
                  <i className="fas fa-database text-2xl py-5 "></i>
                </div>
                <h5 className="text-3xl mb-2 font-bold leading-normal">
                  Centralized Document Hub
                </h5>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  Bring all your freight documents together in one secure place.
                  Easily upload, organize, and share Bills of Lading, Air
                  Waybills, and more. Our smart system instantly categorizes and
                  indexes everything, so you find what you need, fast. Share
                  with partners and customs in a click.
                </p>
                <p>
                  <ul>
                    <li>
                      {" "}
                      <i className="text-2xl fas fa-check-circle text-lightBlue-400 mb-3">
                        {" "}
                        Find any document easily{" "}
                      </i>
                    </li>
                    <li>
                      <i className="text-2xl fas fa-check-circle text-lightBlue-400 mb-3">
                        {" "}
                        Secure database with user authentification{" "}
                      </i>
                    </li>
                    <li>
                      <i className="text-2xl fas fa-check-circle text-lightBlue-400 mb-3">
                        {" "}
                        Gain complete visibility over shipments{" "}
                      </i>
                    </li>
                  </ul>
                </p>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                  <img
                    alt="..."
                    src="https://images.gosearch.ai/blog/content/uploads/2024/10/10214047/gosearch-centralized-document-repository-article%402x.png"
                    className="w-full align-middle "
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="freight-management" className="py-20 bg-blueGray-200">
          <div className="container mx-auto ">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Complete Freight & Document Management
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Everything you need to manage your freight operations
                efficiently, from documentation to delivery tracking.
              </p>
            </div>

            <div className="flex flex-row  mt-5 bg-lightBlue-200 mb-2 p-5 rounded-lg">
              {/* Box 1 */}
              <div className="px-3 w-full">
                <div className="bg-white rounded-lg shadow-lg transition-shadow duration-300">
                  <div className="border-2 p-8 border-blueGray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blueGray-700">
                        Request Quote
                      </h3>
                      
                    </div>
                    <p className="text-gray-600">
                      Digitize, organize, and manage all your shipping documents
                      in one secure platform. Generate bills of lading, customs
                      forms, and certificates instantly.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 2 */}
              <div className="px-3 w-full">
                <div className="bg-white rounded-lg shadow-lg transition-shadow duration-300">
                  <div className="border-2 p-8 border-blueGray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blueGray-700">
                        Real-time Tracking
                      </h3>
                      
                    </div>
                    <p className="text-gray-600">
                      Track your shipments across air, sea, and land with
                      real-time updates. Get notifications and provide customers
                      with accurate delivery estimates.
                    </p>
                  </div>
                </div>
              </div>

              {/* Box 3 */}
              <div className="px-3 w-full">
                <div className="bg-white  rounded-lg shadow-lg transition-shadow duration-300">
                  <div className="border-2 p-8 border-blueGray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold text-blueGray-700">
                        Compliance & Security
                      </h3>
                      
                    </div>
                    <p className="text-gray-600">
                      Ensure regulatory compliance with automated checks and
                      secure document storage. Meet international shipping
                      standards with confidence.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex py-20 bg-blueGray-200">
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
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>

          <div className="container mx-auto px-4">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-4/12 ml-auto mr-auto px-4">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-lg"
                  src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
                />
              </div>
              <div className="w-full md:w-5/12 ml-auto mr-auto px-4">
                <div className="md:pr-12">
                  <div className="text-white  text-center inline-flex items-center justify-center w-16 h-16 mb-5 shadow-xl rounded-lg  border bg-emerald-400 text-xl ">
                    <i className="fas fa-rocket text-xl"></i>
                  </div>
                  <h3 className="text-3xl font-semibold">
                    Modernizing Freight Documentation in Tunisia and Beyond
                  </h3>
                  <ul className="list-none mt-6 grid grid-cols-2 gap-4">
                    <li className="flex items-center py-2">
                      <div>
                        <span
                          className="text-2xl font-bold
                         inline-block py-1 px-2 rounded-full text-white bg-emerald-400 mr-3 py-"
                        >
                          <i className="fas fa-upload text-2xl"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-black text-lg">
                          Smart Upload System
                        </h4>
                      </div>
                    </li>

                    <li className="flex items-center py-2">
                      <div>
                        <span className="text-2xl font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-emerald-400 mr-3">
                          <i className="fa fa-search "></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="black text-lg">Intelligent Search </h4>
                      </div>
                    </li>

                    <li className="flex items-center py-2">
                      <div>
                        <span className="text-2xl font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-emerald-400 mr-3">
                          <i className="fa fa-archive"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="black text-lg">
                          Centralized Repository
                        </h4>
                      </div>
                    </li>

                    <li className="flex items-center py-2">
                      <div>
                        <span className="text-2xl font-semibold inline-block py-1 px-2 uppercase rounded-full text-white bg-emerald-400 mr-3">
                          <i className="fas fa-project-diagram"></i>
                        </span>
                      </div>
                      <div>
                        <h4 className="text-blueGray-500">
                          Automated Workflows
                        </h4>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-20 pb-48 bg-blueGray-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center text-center mb-24">
              <div className="w-full lg:w-6/12 px-4">
                <h2 className="text-4xl font-semibold">
                  Here are our heroes :{" "}
                </h2>
                <p className="text-lg leading-relaxed m-4 text-blueGray-500"></p>
              </div>
            </div>
            <div className="flex flex-wrap">
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Refka </h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Manager
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-google"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Refka </h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Manager
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Refka </h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Manager
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 lg:w-3/12 lg:mb-0 mb-12 px-4">
                <div className="px-6">
                  <img
                    alt="..."
                    src={require("assets/img/team-1-800x800.jpg").default}
                    className="shadow-lg rounded-full mx-auto max-w-120-px"
                  />
                  <div className="pt-6 text-center">
                    <h5 className="text-xl font-bold">Refka </h5>
                    <p className="mt-1 text-sm text-blueGray-400 uppercase font-semibold">
                      Manager
                    </p>
                    <div className="mt-6">
                      <button
                        className="bg-lightBlue-400 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-linkedin"></i>
                      </button>
                      <button
                        className="bg-lightBlue-600 text-white w-8 h-8 rounded-full outline-none focus:outline-none mr-1 mb-1"
                        type="button"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative block mt-32 py-24 lg:pt-0 bg-lightBlue-500">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center lg:-mt-64 -mt-48">
              <div className="w-full lg:w-6/12 px-4 py-16">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200">
                  <div className="flex-auto p-5 lg:p-10">
                    <h4 className="text-2xl font-semibold">
                      Get in touch with us !
                    </h4>
                    <p className="leading-relaxed mt-1 mb-4 text-blueGray-500">
                      Complete this form and we will get back to you in 24
                      hours.
                    </p>
                    <div className="relative w-full mb-3 mt-8">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="full-name"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Full Name"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                        placeholder="Email"
                      />
                    </div>

                    <div className="relative w-full mb-3">
                      <label
                        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        rows="4"
                        cols="80"
                        className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Type a message..."
                      />
                    </div>
                    <div className="text-center mt-6">
                      <button
                        className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
