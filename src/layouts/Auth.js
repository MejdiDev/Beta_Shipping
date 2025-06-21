import React, { useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import Navbar from "components/Navbars/AuthNavbar.js";

// views

import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import Footer from "components/Footers/FooterClient";


export default function Auth() {
  const [activeTab, setActiveTab] = useState("Login");

  return (
    <>
      <Navbar transparent />
      <main>
        <section className="relative w-full h-full pt-40 min-h-screen" style={{
              backgroundImage: "linear-gradient(to bottom right, #0ea5e9, #8b5cf6)",
            }}>
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full opacity-20"
          ></div>

          <div className="flex items-center justify-center h-full">
            <div className="w-full px-6" style={{ paddingTop: "10rem", maxWidth: "700px", width: "100%" }}>
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0 px-6 py-6">
                <div className="rounded-t mb-0">
                  <div className="text-center mb-3">
                    <h1 className="text-3xl font-bold text-center">Welcome</h1>
                    <p className="text-center">Sign in to your account or create a new one</p>
                  </div>
                </div>

                <div className="flex justify-center w-full mb-6">
                  <nav className="flex w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-gray p-2">
                    {[ "Login", "Sign Up" ].map((tab, idx, arr) => (
                      <>
                      <button
                        onClick={() => setActiveTab(tab)}
                        type="button"
                        className={`flex-1 px-6 border-2 py-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
                        ${
                          activeTab === tab
                            ? "bg-white text-black border-b-2 border-transparent rounded-lg"
                            : "bg-gray-100 text-gray-500 hover:bg-red-200 border-b-2 border-transparent"
                        }
                        ${idx === 0 ? "rounded-l-lg" : ""}
                        ${idx === arr.length - 1 ? "rounded-r-lg" : ""}
                      `}
                        style={{ outline: "none" }}
                      >
                        { tab }
                      </button>

                      {
                        (idx !== 1) && (
                          <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>
                        )
                      }
                      </>
                    ))}
                  </nav>
                </div>

                { activeTab === "Login" && <Login /> }
                { activeTab === "Sign Up" && <Register /> }
                
              </div>
              <div className="flex flex-wrap mt-6 relative">
                <div className="w-1/2">
                  <a
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    className="text-blueGray-200"
                  >
                    <small>Forgot password?</small>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-32"><Footer /></div>
        </section>
      </main>
    </>
  );
}
