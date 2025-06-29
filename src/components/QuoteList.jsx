import React, { useEffect, useState } from "react";
import "assets/styles/tailwind.css";

import getCard from "components/Cards/CardQuoteShip";
import { handleClose } from "./ShipmentList";
import DelTab from "./Cards/LeadTabs/DelTab";
import { validateForm } from "views/clients/clientrequest";
import { AddQuote } from "services/ApiAdmin";
import { toastSucc } from "services/ApiAll";
import { toastErr } from "services/ApiAll";
import LCLTab from "views/clients/requestTabs/LCLTab";
import FCLTab from "views/clients/requestTabs/FCLTab";
import AIRTab from "views/clients/requestTabs/AIRTab";
import { DeleteQuote } from "services/ApiAdmin";
import { initFormData } from "views/clients/clientrequest";
import { EditQuote } from "services/ApiAdmin";

const EditQuoteTab = ({ getData, formData, setFormData, setFocusShip, clients }) => {
    const [activeTab, setActiveTab] = useState((formData.activeShipType && formData.activeShipType !== "") ? formData.activeShipType : "FCL");

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

    const handleAddQuote = () => {
        if(!validateForm({ formData, activeTab })) return

        AddQuote({ shipDetails: formData[ activeTab.toLowerCase() ], shipmentType: activeTab })
            .then((response) => {
                toastSucc(response.message)

                getData()
                handleClose()

                setFormData()
                setFocusShip()
            })
            .catch((error) => {
                console.error("Error adding shipment:", error);
                toastErr(error.message)
            });
    }

    const handleEditQuote = () => {
        if(!validateForm({ formData, activeTab })) return

        EditQuote(formData[ activeTab.toLowerCase() ])
            .then((response) => {
                toastSucc(response.message)

                getData()
                handleClose()

                setFormData()
                setFocusShip()
            })
            .catch((error) => {
                console.error("Error adding shipment:", error);
                toastErr(error.message);
            });
    }

    return (
        <div className="py-4 px-2 pb-4" style={{ backgroundColor: "white", borderRadius: ".65rem", maxWidth: "700px", width: "100%" }}>
            <div className="flex flex-col items-center">

                {/* Tabs Navigation */}
                {   
                    !formData.activeShipType &&

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
                }
                
                {activeTab.toLowerCase() === "fcl" &&
                    <div className="w-full">
                        <FCLTab
                            formData={ formData['fcl'] }
                            handleChange={ e => handleChange(e, 'fcl') }
                        />
                    </div>
                }
                
                {activeTab.toLowerCase() === "lcl" &&
                    <div className="w-full">
                        <LCLTab
                            formData={ formData['lcl'] }
                            handleChange={ e => handleChange(e, 'lcl') }
                        />
                    </div>
                }
                
                {activeTab.toLowerCase() === "air" &&
                    <div className="w-full">
                        <AIRTab
                            formData={ formData['air'] }
                            handleChange={ e => handleChange(e, 'air') }
                        />
                    </div>
                }

                <div className="border-t border-gray-300 w-full flex w-full flex-1 pt-4"></div>

                {
                    formData.activeShipType &&

                    <div className="mb-6 w-full px-4">
                        <label htmlFor="clientId" className="text-sm font-medium text-gray-700">Status: </label>
                        <select
                            name="clientId"
                            value={ formData[activeTab.toLowerCase()].status }
                            onChange={ e => {
                                setFormData((prev) => ({
                                    ...prev,
                                    [activeTab.toLocaleLowerCase()]: {
                                        ...formData[activeTab.toLocaleLowerCase()],
                                        status: e.target.value,
                                    },
                                }));
                            }}
                            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="pending">Pending</option>
                            <option value="quoted">Quoted</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>
                }
            </div>
            
            <div className="flex justify-end gap-3">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 outline-none" onClick={() => {
                    handleClose()

                    setFormData()
                    setFocusShip()
                }}>Cancel</button>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none"
                    onClick={( !formData.activeShipType ? handleAddQuote : handleEditQuote )}
                >Confirm</button>
            </div>
        </div>
    );
}

export default function QuoteList({ getQuotes, editable=false }) {
  const [quotes, setQuotes] = useState([]);
  const [query, setQuery] = useState("");

  const [status, setStatus] = useState("");
  const [shipType, setShipType] = useState("");
  const [incoterm, setIncoterm] = useState("");

  const [shownQuotes, setShownQuotes] = useState([]);

  const [quoteFormData, setQuoteFormData] = useState(initFormData);
  const [floatingTab, setFloatingTab] = useState();

  const handleSubmit = e => {
    e.preventDefault();
  }

  const getData = () => {
    getQuotes()
      .then((response) => {
        const resQuotes = response.map(el => {
          return { ...el.detailsId, shipmentType: el.shipmentType, status: el.status, quoteId: el._id, clientId: el.clientId }
        })

        setQuotes(resQuotes);
        setShownQuotes(resQuotes);

        console.log("Quotes fetched successfully:", resQuotes);
      })
      .catch((error) => {
        console.error("Error fetching quotes:", error);
      });
  }

  useEffect(() => {
    getData();
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
        <div
            id="window-wrapper"
            className="flex justify-center items-center"
            data-fixed="true"

            onClick={ e => {
                if(e.target.id !== "window-wrapper") return

                handleClose()
            }}

            style={{
                paddingTop: (
                    (floatingTab === 'add_quote' || floatingTab === 'edit_quote') ? "calc(80px + 27rem)" : "80px" )
            }}
        >
            {
                (floatingTab === 'add_quote') &&
                
                <EditQuoteTab
                    getData={getData}

                    formData={quoteFormData}
                    setFormData={setQuoteFormData}
                    setFocusShip={() => {}}
                    
                    clients={[]}
                />
            }
            
            {
                (floatingTab === 'del_quote' && quoteFormData) &&

                <DelTab
                    focusId={quoteFormData.quoteId}
                    setFocusId={setQuoteFormData}
                    
                    getData={getData}
                    DeleteLead={DeleteQuote}

                    handleClose={handleClose}
                />
            }

            {
                (floatingTab === 'edit_quote' && quoteFormData) &&
                
                <EditQuoteTab
                    getData={getData}

                    formData={quoteFormData}
                    setFormData={setQuoteFormData}
                    setFocusShip={() => {}}
                />
            }
        </div>

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

                <button
                    className="w-full bg-lightBlue-500 text-white py-2 px-6 rounded shadow-md mt-6"
                    onClick={() => {
                        setFloatingTab('add_quote')
                        
                        document.querySelector("body").style.overflow = "hidden"
                        document.getElementById("window-wrapper").style.display = "flex"

                        setTimeout(() => {
                        document.getElementById("window-wrapper").style.opacity = "1"
                        }, 1);
                    }}
                >Add Quote</button>
            </div>

            <div className="px-3 w-full flex justify-center mt-8">
            <div style={{ width: "1000px" }}>
                {shownQuotes.length > 0 ? (
                shownQuotes.map((quote, index) =>
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 flex flex-col">
                    
                        { getCard({ quote, index, to: ('/admin/quote/' + quote.quoteId) }) }

                        {
                            editable &&

                            <>
                                <div className="border-1 border-gray-300 bg-black h-1 mx-4"></div>

                                <div className="w-full py-4 px-6 flex justify-between items-center">
                                    <div></div>
                                        
                                    <div className="flex items-center gap-4">
                                        <button
                                            className="text-lightBlue-500 outline-none"

                                            onClick={() => {
                                                setQuoteFormData({ ...initFormData, [quote.shipmentType]: quote, activeShipType: quote.shipmentType })
                                                setFloatingTab('edit_quote')

                                                document.querySelector("body").style.overflow = "hidden"
                                                document.getElementById("window-wrapper").style.display = "flex"

                                                setTimeout(() => {
                                                    document.getElementById("window-wrapper").style.opacity = "1"
                                                }, 1);
                                            }}
                                        >Edit</button>
                                        <button
                                            className="text-red-500 outline-none"
                                            
                                            onClick={() => {
                                                setQuoteFormData(quote)
                                                setFloatingTab('del_quote')

                                                document.querySelector("body").style.overflow = "hidden"
                                                document.getElementById("window-wrapper").style.display = "flex"

                                                setTimeout(() => {
                                                    document.getElementById("window-wrapper").style.opacity = "1"
                                                }, 1);
                                            }}
                                        >Delete</button>
                                </div>
                            </div>
                            </>
                        }

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