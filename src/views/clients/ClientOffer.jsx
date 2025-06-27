import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { AcceptOffer } from "services/ApiClient";
import { GetOfferById } from "services/ApiClient";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import AIROffer from "components/offerCards/AIROffer";
import { toastSucc } from "services/ApiAll";
import { toastErr } from "services/ApiAll";

const ClientOffer = () => {
    const [offer, setOffer] = useState('');
    const { id } = useParams();
    const history = useHistory();
    
    const handleSubmit = (e) => {
        e.preventDefault();

        
    };

    const getOfferData = () => {
        GetOfferById(id)
            .then((response) => {
                setOffer({ ...response.quoteId, amount: response.amount, offerId: response._id, result: response.result });
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
            });
    }

    useEffect(() => {
        getOfferData()
    }, [])

    const acceptOffer = () => {
        AcceptOffer(offer)
            .then((response) => {
                console.log(response);

                getOfferData();
                toastSucc(response.message);
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);

                toastErr(error.message);
            });
    }

    return (
        <div className="flex py-8">
            <div className="mx-auto w-full" style={{ maxWidth: "800px" }}>
                {/* Top Section: offer Details */}
                <div className="mb-6 p-6 border rounded-xl shadow-md bg-white w-full">
                    <h2 className="text-2xl font-bold mb-4">Offer Details</h2>

                    {
                        offer.shipmentType === 'fcl' &&
                        
                        <FCLOffer
                            quote={ offer.detailsId }
                        />
                    }

                    {
                        offer.shipmentType === 'lcl' &&
                        
                        <LCLOffer
                            quote={ offer.detailsId }
                        />
                    }

                    {
                        offer.shipmentType === 'air' &&
                        
                        <AIROffer
                            quote={ offer.detailsId }
                        />
                    }
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