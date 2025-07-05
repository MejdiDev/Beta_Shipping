import React, { useState } from "react";
import "assets/styles/tailwind.css";
import { requestQuote } from "services/ApiQuote";

import FCLTab from "./requestTabs/FCLTab";
import LCLTab from "./requestTabs/LCLTab";
import AIRTab from "./requestTabs/AIRTab";
import { toastSucc } from "services/ApiAll";
import { toastErr } from "services/ApiAll";

export const initFormData = {
  'fcl': {
    clientId: '',
    
    readyDate: "",

    originPort: "",
    destinationPort: "",

    containerQuantity: "",
    goodsDescription: "",

    dangerous: false,

    incoterm: '',
    containerType: ''
  },

  'lcl': {
    clientId: '',
    
    readyDate: "",

    originPort: "",
    destinationPort: "",

    cargoDescription: "",
    packageType: "",
    totalPackages: "",

    weight: "",
    length: "",
    
    width: "",
    height: "",

    incoterm: ''
  },

  'air': {
    clientId: '',
    
    readyDate: "",

    originAirport: "",
    destinationAirport: "",

    cargoDescription: "",
    numberOfPieces: "",

    weight: "",
    volume: "",

    incoterm: ''
  }
}

export const validateForm = ({ formData, activeTab }) => {
    let isValid = true;
    const currentFormData = activeTab ? formData[ activeTab.toLowerCase() ] : formData;
    
    Object.keys(currentFormData).forEach((fieldName) => {
      const fieldValue = currentFormData[fieldName];
      
      const isFieldEmpty = fieldValue === null || fieldValue === "" || (typeof fieldValue === "number" && fieldValue === 0);
      
      const exceptions = document.querySelector(`[name="clientId"]`) ? [] : ["clientId"];
      const shouldSkip = exceptions.includes(fieldName);
      
      const inputElement = document.querySelector(`[name="${fieldName}"]`);

      if (inputElement && isFieldEmpty && !shouldSkip) {
        inputElement.classList.add('border-red');
        isValid = false;

      } else {
        const inputElement = document.querySelector(`[name="${fieldName}"]`);

        if (inputElement) {
          inputElement.classList.remove('border-red');
        }
      }
    });

    toastErr("All fields need to be filled in !")
    return isValid;
  };

export default function ClientRequest() {
  const [activeTab, setActiveTab] = useState("FCL");
  const [formData, setFormData] = useState( initFormData );

  const handleChange = (e, mode) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [mode]: {
        ...formData[mode],
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!validateForm({ formData, activeTab })) return

    requestQuote(activeTab, formData[activeTab.toLocaleLowerCase()])
      .then((response) => {
        toastSucc(response.message);
        setFormData(initFormData);
      })
      .catch((error) => {
        console.error("Error requesting quote:", error);

        toastErr("Failed to request quote. Please try again.");
      });
  };

  return (
    <>
      <form onSubmit={ handleSubmit } className="px-4 md:px-10 py-8">
        <div className="flex justify-center relative mr-4 pr-5 w-full">
          <div className="flex flex-col items-center max-w-800-px bg-white rounded-lg border-3 p-5" style={{ minWidth: "800px" }}>
            <h1 className="text-5xl text-lightBlue-500 mt-3 text-center font-bold mb-2">
              Request a Quote !
            </h1>
            <p className="text-gray-600 mb-6 text-center max-w-580-px">
              Get instant pricing for your freight shipment. Fill out the
              details below and we'll provide you with competitive rates.
            </p>

            {/* Tabs Navigation */}
            <div className="flex justify-center ml-3 mr-3 mb-3 w-full">
              <nav className="flex w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-gray p-2">
                {[
                  { tab: "FCL", label: "FCL" },
                  { tab: "LCL", label: "LCL" },
                  { tab: "AIR", label: "AIR" },
                ].map(({ tab, label }, idx, arr) => (
                  <>
                    <button
                      type="button"
                      key={tab}
                      onClick={() => setActiveTab(tab)}
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
                      {label}
                    </button>

                    {
                      (idx !== 2) && (
                        <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>
                      )
                    }
                  </>
                ))}
              </nav>
            </div>
            
            {activeTab === "FCL" &&
              <FCLTab
                formData={ formData['fcl'] }
                handleChange={ e => handleChange(e, 'fcl') }
              />
            }
            
            {activeTab === "LCL" &&
              <LCLTab
                formData={ formData['lcl'] }
                handleChange={ e => handleChange(e, 'lcl') }
              />
            }
            
            {activeTab === "AIR" &&
              <AIRTab
                formData={ formData['air'] }
                handleChange={ e => handleChange(e, 'air') }
              />
            }

            {/* Action Buttons */}
            <div className="mt-10 flex mb-5 justify-end space-x-4 pt-6 border-t w-full">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-black bg-white hover:bg-gray-50"
              >
                Save as Draft
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-white bg-lightBlue-500 hover:bg-gray-50 flex items-center ml-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
                  />
                </svg>
                Get Quote
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
