import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { getShipments } from "services/ApiAdmin";
import { toastErr } from "services/ApiAll";
import { formatDate } from "services/ApiQuote";
import { formatShips } from "views/opAgent/OpAgentShipments";

export default function CardPageShipmentsAdmin() {
  const [ships, setShips] = useState([])

  useEffect(() => {
      getShipments()
        .then(response => {
          const resShips = formatShips(response.shipments)
          setShips(resShips.slice(0, 5))
        })
        .catch((error) => {
          console.error("Error requesting shipments:", error);
          toastErr("Failed to request shipments. Please try again.");
        });
  }, [])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Shipment List
              </h3>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
              <Link to="/admin/shipments">
                <button
                  className="bg-lightBlue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          {/* Projects table */}
          <table className="items-center w-full bg-transparent border-collapse table-alt rounded-b-lg overflow-hidden">
            <thead>
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Origin
                </th>

                <th className="bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"></th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Destination
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Mode
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Incoterm
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Ready Date
                </th>
              </tr>
            </thead>

            <tbody>
              {
                ships.map((ship, index) => (
                  <tr key={index}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      { ship.shipmentType !== "air" ? ship.originPort : ship.originAirport }
                    </th>

                    <td>
                      <img className="ml-3 mr-3" src="./arrow.png" alt="Arrow" style={{ height: "30px" }} />
                    </td>

                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                      { ship.shipmentType !== "air" ? ship.destinationPort : ship.destinationAirport }
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { ship.shipmentType && ship.shipmentType.toUpperCase() }
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { ship.incoterm && ship.incoterm.toUpperCase() }
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { ship.readyDate && formatDate(ship.readyDate) }
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}