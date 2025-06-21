// filepath: src/views/clients/Shipments.js
import React, { useEffect, useState } from "react";
import { getShipments } from "services/ApiShipment";

export default function Shipments() {
  const [activeTab, setActiveTab] = useState("all");
  const [shipments, setShipments] = useState([]);

  useEffect(() => {
    getShipments()
      .then((response) => {
        setShipments(response.shipments.slice(0, 5));
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, [])

  return (
    <>
      <div className="relative mr-4 mt-48   pr-5 w-full    ">
          <div className="bg-blueGray-400 rounded-lg  shadow-lg border-3   ">
            <h1 className="text-2xl text-emerald-500 mt-3 ml-2 font-bold mb-2">
              My Shipment History 
            </h1>
            <p className="text-gray-600 mb-3 ml-2">
              Track and manage your shipments .
            </p>

            {/* Tabs Navigation */}
            <div className="flex justify-center ml-3 mr-3">
              <nav className="flex w-full max-w-2xl mx-auto rounded-lg overflow-hidden border-3 border-gray-200">
                {[
                  { tab: "all", label: "All Shipments" },
                  { tab: "pending", label: "Pending" },
                  { tab: "transit", label: "In Transit" },
                  { tab: "delivered", label: "Delivered" }
                ].map(({ tab, label }, idx, arr) => (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-6 border-2 py-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none mb-4
                    ${
                      activeTab === tab
                        ? "bg-white text-black border-b-2 border-blue-600 rounded-lg"
                        : "bg-gray-100 text-gray-500 hover:bg-gray-200 border-b-2 border-transparent"
                    }
                    ${idx === 0 ? "rounded-l-lg" : ""}
                    ${idx === arr.length - 1 ? "rounded-r-lg" : ""}
                  `}
                    style={{
                      borderRight:
                        idx < arr.length - 1 ? "1px solid #e5e7eb" : "none",
                    }}
                  >
                    {label}
                  </button>
                ))}
              </nav>
            </div>
            

            {activeTab === "all" && (
              <div className="flex">
                <div className="flex flex-col w-1/2   p-8">
                  <div className="bg-blueGray-700rounded-lg p-8 shadow-lg border-3">
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">Your Recent Shipments</h2>

                    {
                      shipments.map((shipment, idx) => (
                <div
                  key={shipment.id}
                  className="bg-white border border-blue-200 rounded-lg mr-5 shadow p-4 mb-4 mt-1"
                >
                  <div className="flex justify-between rounded-lg items-center mb-1">
                    <h3 className="text-md font-semibold text-blue-800">
                      SH 00{idx + 1 || "N/A"}
                    </h3>
                    <span className="text-sm px-2 py-1 rounded bg-blue-200 text-blue-800 font-medium">
                      {shipment.status || "Pending"}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-700 my-2">
                    <p className="font-medium">
                      {shipment.origin || "Unknown Origin"} → {shipment.destination || "Unknown Destination"}
                    </p>
                    <p className="font-medium my-2">
                      {shipment.destination}
                    </p>
                    <p className="font-medium my-2">
                      {shipment.estimatedDeliveryDate}
                    </p>
                    
                    
                  </div>

                </div>



                ))}
                     
                    
                
                 
                </div>
                </div>

                <div className="flex flex-col w-1/2   p-8">
                  <div className="bg-blueGray-700rounded-lg p-8 shadow-lg border-3">
                    <h2 className="text-xl font-semibold mb-4 text-blue-900">Your Recent Quotes</h2>

                    

                    
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "pending" && (<></>)}

            {activeTab === "transit" && (<></>)}
            
            {activeTab === "delivered" && (<></>)}
          </div>

        </div>
    </>
  );
}