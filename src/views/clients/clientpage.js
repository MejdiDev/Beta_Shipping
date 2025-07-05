import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "assets/styles/tailwind.css";
import { getClientQuotes } from "services/ApiQuote";

import jsonStats from "./data/stats.json";
import getCard from "components/Cards/CardQuoteShip";
import { getShipments } from "services/ApiClient";
import { formatShips } from "views/opAgent/OpAgentShipments";

export default function ClientPage() {
  const [ quotes, setQuotes ] = useState([]);
  const [ ships, setShips ] = useState([]);

  const [ stats, setStats ] = useState([]);

  useEffect(() => {
    getClientQuotes()
      .then((response) => {
        const resQuotes = response.map(el => {
          return { ...el.detailsId, shipmentType: el.shipmentType, status: el.status }
        });

        setQuotes(resQuotes);
        setStats(jsonStats);

        console.log("Quotes: ", resQuotes)
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });

    getShipments()
      .then((response) => {
        const resShips = formatShips(response);
        setShips(resShips);

        console.log("Shipments: ", resShips)
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  return (
    <>
      <div className="w-full p-8">
        {/* Welcome Section */}
        <div className="bg-lightBlue-400 mx-5 w-full max-w-3xl text-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Welcome, Client!</h1>
          <p className="text-gray-600">
            Welcome to your dashboard. Here you can view your projects, track your progress,
            and manage your account.
          </p>
          <div className="mt-4">
            <Link
              to="/client/clientrequest"
              className="bg-blue-500 hover:bg-white transition-all hover:text-lightBlue border-2 text-white font-bold py-2 px-4 rounded"
            >
              Request a Quote 
              <i className="fas fa-arrow-right ml-2"></i>
            </Link>
          </div>
        </div>
      </div>

      {/* Dashboard Stats Boxes */}
      <div className="flex flex-wrap text-white mx-4">
        {stats && stats.map((stat, idx) => (
          <div
            key={idx}
            className="shadow-xl rounded-xl ml-3 mr-4 pb-26 flex-auto"
            style={{ backgroundColor: stat.color }}
          >
            <div className="flex justify-between items-center px-6 py-5">
              <div className="flex flex-col">
                <p className="text-4xl pl-5 mt-4">{
                  quotes.filter(el => el.status === stat.filter).length
              }</p>
                <p className="text-xl">{ stat.label }</p>
              </div>

              <div className={`ml-5 ${stat.icon} text-5xl`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Last 3 Quotes Section */}
      <div className="flex gap-8 mt-8 px-8">
        <div className="flex-1">
          <div className="bg-blueGray-700rounded-lg p-8 shadow-lg bg-gray border-3 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Your Recent Quotes</h2>

            {quotes.length > 0 ? (
              quotes.slice(0, 3).map((quote, index) => 
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                  {
                    getCard({ quote, index, min: true })
                  }
                </div>
              )
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow text-center text-gray-500">
                No recent quotes available.
              </div>
            )}

            <div className="mt-4 text-right">
              <Link to="/client/quotes" className="text-sm text-blue-600 hover:underline">
                View All Quotes →
              </Link>
            </div>
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-blueGray-700rounded-lg p-8 shadow-lg bg-gray border-3 rounded-xl">
            <h2 className="text-xl font-semibold mb-4 text-blue-900">Your Recent Shipments</h2>

            {ships.length > 0 ? (
              ships.slice(0, 3).map((shipment, index) => 
                <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
                  {
                    getCard({ quote: shipment, index, min: true, model: "shipment", to: ('/client/shipment/' + shipment.shipmentId) })
                  }
                </div>
              )
            ) : (
              <div className="bg-white border border-gray-200 rounded-lg p-4 shadow text-center text-gray-500">
                No recent shipments available.
              </div>
            )}

            <div className="mt-4 text-right">
              <Link to="/client/shipments" className="text-sm text-blue-600 hover:underline">
                View All Shipments →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
