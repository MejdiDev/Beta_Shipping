import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { toastSucc } from "services/ApiAll";
import { CheckOfferExists } from "services/ApiSalesAgent";
import { AddOffer } from "services/ApiSalesAgent";
import { getQuoteById } from "services/ApiSalesAgent";

const SalesAgentOffer = () => {
    const [quote, setQuote] = useState();
    const [offerExists, setOfferExists] = useState();

    const [offer, setOffer] = useState('');
    const [declineReason, setDeclineReason] = useState('');
    const [status, setStatus] = useState('accepted');

    const { id } = useParams();
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (status === 'rejected') {
            console.log('Declined:', declineReason);
        } else {
            AddOffer({
                quoteId: quote._id,
                agentId: localStorage.getItem("userId"),
                amount: offer
            })
                .then((response) => {
                    console.log(response);

                    toastSucc(response.message)
                    setOfferExists(true);
                })
                .catch((error) => {
                    console.error("Error fetching quotes:", error);
                });
        }
    };

    useEffect(() => {
        getQuoteById(id)
            .then((response) => {
                CheckOfferExists(response._id)
                    .then((response) => {
                        setOfferExists(response.OfferExists);
                        if(response.amount && response.amount !== 0) setOffer(response.amount);
                    })
                    .catch((error) => {
                        console.error("Error fetching offer data:", error);
                    });

                setQuote(response);
            })
            .catch((error) => {
                console.error("Error fetching quote:", error);
            });
    }, [])

    return quote && (
        <div className="flex py-8">
            <div className="mx-auto w-full" style={{ maxWidth: "800px" }}>
                {/* Top Section: Quote Details */}
                <div className="mb-6 p-6 border rounded-xl shadow-md bg-white w-full">
                    <h2 className="text-2xl font-bold mb-4">Quote Details</h2>

                    {
                        quote.shipmentType === 'fcl' &&
                        
                        <FCLOffer
                            quote={ quote.detailsId }
                        />
                    }

                    {
                        quote.shipmentType === 'lcl' &&
                        
                        <LCLOffer
                            quote={ quote.detailsId }
                        />
                    }

                    {
                        quote.shipmentType === 'air' &&
                        
                        <AIROffer
                            quote={ quote.detailsId }
                        />
                    }
                </div>

                {/* Bottom Section: Offer or Decline */}
                
                {
                    !offerExists ? 

                    <div className="py-6 border rounded-xl shadow-md bg-white w-full">
                        <div className="w-full flex justify-between items-center mb-4 px-6">
                            <h2 className="text-xl font-bold">Respond to the Quote</h2>
                            
                            <nav className="flex rounded-lg overflow-hidden bg-gray px-3" style={{ paddingTop: ".4rem", paddingBottom: ".4rem", height: "calc(36px + .8rem)" }}>
                                <button
                                    onClick={() => setStatus('accepted')}
                                    className={`flex-1 px-6 border-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
                                        ${
                                            status === "accepted"
                                            ? "bg-lightBlue-500 text-white border-b-2 border-transparent rounded-lg"
                                            : "bg-gray-100 text-gray-500 hover:bg-red-200 border-b-2 border-transparent"
                                        }
                                    `}
                                    style={{ outline: "none", height: "36px" }}
                                >
                                    Accept
                                </button>

                                <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>

                                <button
                                    onClick={() => setStatus('rejected')}
                                    className={`flex-1 px-6 border-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
                                        ${
                                            status === "rejected"
                                            ? "bg-red-500 text-white border-b-2 border-transparent rounded-lg"
                                            : "bg-gray-100 text-gray-500 hover:bg-red-200 border-b-2 border-transparent"
                                        }
                                    `}
                                    style={{ outline: "none", height: "36px" }}
                                >
                                    Decline
                                </button>
                            </nav>
                        </div>
                        
                        <div className="border-1 border-gray-300 bg-black h-1"></div>

                        <form onSubmit={handleSubmit} className="px-6 mt-4">
                            {status !== 'rejected' ? (
                                <div>
                                    <label className="block text-gray-600 mb-2">Offer Amount (TND) </label>
                                    <input
                                        value={offer}
                                        onChange={(e) => setOffer(e.target.value)}

                                        type="number"
                                        min={0}
                                        placeholder="Enter your offer here"
                                        className="rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full outline-none"
                                    />
                                </div>
                            ) : (
                                <div>
                                    <label className="block text-gray-600 mb-2">Reason for Declining </label>
                                    <textarea
                                        value={declineReason}
                                        onChange={(e) => setDeclineReason(e.target.value)}
                                        placeholder="Explain why you're declining the request"
                                        rows="4"
                                        className="w-full p-2 border border-gray-300 rounded-lg"
                                    ></textarea>
                                </div>
                            )}
                            
                            <div className="mt-6 flex justify-end items-center">
                                <button
                                    type="submit"
                                    className="bg-lightBlue-500 text-white p-2 rounded-lg"
                                >
                                    Submit Response
                                </button>
                            </div>
                        </form>
                    </div>

                    :

                    <>
                        <div className="p-6 border rounded-xl shadow-md bg-white w-full">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Our Offer:</label>
                                <p className="text-lg font-semibold text-gray-700">{ offer } TND</p>
                            </div>
                        </div>

                        <div className="col-span-ful mt-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <p className="text-red-600">An offer has already been added for this quote !</p>
                            </div>
                        </div>

                        <div 
                            className="w-full flex justify-end mt-4"
                            onClick={() => {
                                history.goBack()
                            }}
                        >
                            <button className="bg-black text-white p-2 rounded-lg">Go Back</button>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default SalesAgentOffer;