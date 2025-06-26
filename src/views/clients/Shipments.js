// filepath: src/views/clients/Shipments.js
import getCard from "components/Cards/CardQuoteShip";
import React, { useEffect, useState } from "react";
import { toastErr } from "services/ApiAll";
import { getShipments } from "services/ApiClient";

export default function Shipments() {
  const [ships, setShips] = useState([]);
  const [query, setQuery] = useState("");

  const [status, setStatus] = useState("");
  const [mode, setMode] = useState("");
  const [service, setService] = useState("");

  const [shownShips, setShownShips] = useState([])

  const handleSubmit = e => {
    e.preventDefault();
    
    setShownShips(
      ships.filter(el => (
        el._id.includes(query) &&
        (status.length !== 0 ? el.status === status : true) &&
        (mode.length !== 0 ? el.mode === mode : true) &&
        (service.length !== 0 ? el.service === service : true)
      ))
    );
  }

  useEffect(() => {
    getShipments()
      .then((response) => {
        const resShips = response.map(el => {
          return { ...el.quoteRequestId.detailsId, shipmentType: el.quoteRequestId.shipmentType, status: el.status }
        })

        setShips(resShips);
        setShownShips(resShips);

        console.log("Shipments fetched successfully:", resShips);
      })
      .catch((error) => {
        console.error("Error fetching shipments:", error);
        toastErr(error.message)
      });
  }, []);
  

  return (
    <>
      <div className="flex flex-col items-center bg-gray rounded-lg pt-8">
        <div className="mx-autp items-center flex flex-col justify-between md:flex-nowrap flex-wrap px-4" style={{ width: "1000px" }}>
          <form onSubmit={ handleSubmit } className="md:flex hidden flex-row items-center lg:ml-auto w-full gap-6">
            <div className="relative flex w-full flex-wrap items-stretch">
              <span className="z-10 h-full leading-snug font-normal  text-center text-xl absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search by #ID"
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              
                value={ query }
                onChange={ e => setQuery(e.target.value) }
              />
            </div>

            <button className="bg-lightBlue-500 text-white py-2 px-6 rounded shadow-md">Search</button>
          </form>

          <div className="w-full mt-3 flex gap-4">
            <div className="flex-1">
              <label className="block  text-sm font-medium text-gray-700 mb-1">
                  Status
              </label>

              <select onChange={ e => {
                setStatus(e.target.value)

                setShownShips(
                  ships.filter(el => (
                    el._id.includes(query) &&
                    (status.length !== 0 ? el.status === status : true) &&
                    (mode.length !== 0 ? el.mode === mode : true) &&
                    (service.length !== 0 ? el.service === service : true)
                  ))
                )
              }} className="w-full rounded-lg">
                <option value="requested">Requested</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="delivered">Delivered</option>
                <option value="in transit">In Transit</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mode
              </label>

              <select onChange={ e => {
                setMode(e.target.value)

                setShownShips(
                  ships.filter(el => (
                    el._id.includes(query) &&
                    (status.length !== 0 ? el.status === status : true) &&
                    (mode.length !== 0 ? el.mode === mode : true) &&
                    (service.length !== 0 ? el.service === service : true)
                  ))
                )
              } } className="w-full rounded-lg">
                <option value="fcl">FCL</option>
                <option value="lcl">LCL</option>
                <option value="air">AIR</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block  text-sm font-medium text-gray-700 mb-1">
                  Incoterm
              </label>

              <select onChange={ e => {
                setService(e.target.value)

                setShownShips(
                  ships.filter(el => (
                    el._id.includes(query) &&
                    (status.length !== 0 ? el.status === status : true) &&
                    (mode.length !== 0 ? el.mode === mode : true) &&
                    (service.length !== 0 ? el.service === service : true)
                  ))
                )
              } } className="w-full rounded-lg">
                <option value="FOB">FOB</option>
                <option value="CIF">CIF</option>
                <option value="EXW">EXW</option>
                <option value="DDP">DDP</option>
                <option value="DDU">DDU</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-3 w-full flex justify-center mt-8">
          <div style={{ width: "1000px" }}>
            {shownShips.length > 0 ? (
              shownShips.map((shipment, index) =>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                  { getCard({ quote: shipment, index }) }
                </div>
              )
            ) : (
              <div className="col-span-full">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-600">No shipments available.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}