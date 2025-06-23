import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { AcceptOffer } from "services/ApiClient";
import { capitalizeWords } from "services/ApiQuote";
import { formatDate } from "services/ApiQuote";
import { GetOfferById } from "services/ApiClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const ClientOffer = () => {
    const [offer, setOffer] = useState('');
    const { id } = useParams();
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        
    };

    useEffect(() => {
        GetOfferById(id)
            .then((response) => {
                setOffer({ ...response.quoteId, amount: response.amount, offerId: response._id, result: response.result });
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
            });
    }, [])

    const acceptOffer = () => {
        AcceptOffer(offer)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
            });
    }

    return (
        <div className="flex py-8">
            <div className="mx-auto w-full" style={{ maxWidth: "800px" }}>
                {/* Top Section: offer Details */}
                <div className="mb-6 p-6 border rounded-xl shadow-md bg-white w-full">
                    <h2 className="text-2xl font-bold mb-4">Offer Details</h2>

                    <div className="flex">
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Origin: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.origin }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Destination: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.destination }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Weight: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.weight } Kg</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Volume: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.volume } m³</p>
                            </div>
                            
                            {
                                offer.dimensions &&

                                <div className="flex items-center gap-4">
                                    <label className="text-md text-gray-500">Dimensions (HxWxL in meters): </label>
                                    <p className="text-lg font-semibold text-gray-700">{`${offer.dimensions.height} x ${offer.dimensions.width} x ${offer.dimensions.length}`}</p>
                                </div>
                            }
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Container Type: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.containerType && offer.containerType.toUpperCase() }</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Incoterm: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.incoterm && offer.incoterm.toUpperCase() }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Mode: </label>
                                <p className="text-lg font-semibold text-gray-700">{ capitalizeWords(offer.mode) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Service Level: </label>
                                <p className="text-lg font-semibold text-gray-700">{ capitalizeWords(offer.serviceLevel) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Requested Delivery: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.reqDelivery && formatDate(offer.reqDelivery) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Ready Date: </label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.readyDate && formatDate(offer.readyDate) }</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Accept or Decline */}
                <div className="p-6 border rounded-xl shadow-md bg-white w-full">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Our Offer:</label>
                        <p className="text-lg font-semibold text-gray-700">{ offer.amount } TND</p>
                    </div>
                </div>

                {
                    offer.result === "pending" ?

                    <div className="mt-6 flex gap-4 justify-end items-center">
                        <button
                            className="bg-red-500 text-white p-2 rounded-lg"
                        >
                            Decline
                        </button>

                        <button
                            className="bg-lightBlue-500 text-white p-2 rounded-lg"
                            onClick={ acceptOffer }
                        >
                            Accept
                        </button>
                    </div>

                    :

                    <>
                        <div className="col-span-ful mt-8">
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <p className="text-red-600">You have already { offer.result } this offer !</p>
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

export default ClientOffer;