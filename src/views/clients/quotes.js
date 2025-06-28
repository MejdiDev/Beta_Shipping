import React, { useEffect, useState } from "react";
import "assets/styles/tailwind.css";
import { getClientQuotes } from "services/ApiQuote";

import getCard from "components/Cards/CardQuoteShip";

export default function Clientquotes() {
  const [quotes, setQuotes] = useState([]);
  const [query, setQuery] = useState("");

  const [status, setStatus] = useState("");
  const [shipType, setShipType] = useState("");
  const [incoterm, setIncoterm] = useState("");

  const [shownQuotes, setShownQuotes] = useState([])

  const handleSubmit = e => {
    e.preventDefault();
  }

  useEffect(() => {
    getClientQuotes()
      .then((response) => {
        const resQuotes = response.map(el => {
          return { ...el.detailsId, shipmentType: el.shipmentType, status: el.status, quoteId: el._id }
        })

        setQuotes(resQuotes);
        setShownQuotes(resQuotes);

        console.log("Quotes fetched successfully:", resQuotes);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }, []);

  useEffect(() => {
    setShownQuotes(
      quotes.filter(el => (
        el._id.includes(query) &&
        (status.length !== 0 ? el.status === status : true) &&
        (shipType.length !== 0 ? el.shipmentType === shipType : true) &&
        (incoterm.length !== 0 ? el.incoterm === incoterm : true)
      ))
    );
  }, [ query, status, shipType, incoterm ])
  

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

              <select onChange={ e => setStatus(e.target.value) } className="w-full rounded-lg">
                <option value="">--- Select Status ---</option>

                <option value="pending">Pending</option>
                <option value="under review">Under Review</option>
                <option value="quoted">Quoted</option>
                <option value="accepted">Accepted</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipment Type
              </label>

              <select onChange={ e => setShipType(e.target.value) } className="w-full rounded-lg">
                <option value="">--- Select Shipment Type ---</option>

                <option value="fcl">FCL</option>
                <option value="lcl">LCL</option>
                <option value="air">AIR</option>
              </select>
            </div>
            
            <div className="flex-1">
              <label className="block  text-sm font-medium text-gray-700 mb-1">
                Incoterm
              </label>

              <select onChange={ e => setIncoterm(e.target.value) } className="w-full rounded-lg">
                <option value="">--- Select Incoterm ---</option>
                
                <option value="fob">FOB</option>
                <option value="fca">FCA</option>
                <option value="exwork">EXWORK</option>
              </select>
            </div>
          </div>
        </div>

        <div className="px-3 w-full flex justify-center mt-8">
          <div style={{ width: "1000px" }}>
            {shownQuotes.length > 0 ? (
              shownQuotes.map((quote, index) =>
                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8">
                  { getCard({ quote, index, to: ('/client/quote/' + quote.quoteId) }) }
                </div>
              )
            ) : (
              <div className="col-span-full">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                  <p className="text-red-600">No quotes available.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}