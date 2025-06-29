import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { formatShips } from "components/ShipmentList";

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { GetQuoteOfferById } from "services/ApiAdmin";

const AdminQuotePage = () => {
    const [offer, setOffer] = useState('');
    const { id } = useParams();
    const history = useHistory();

    const getOfferData = () => {
        GetQuoteOfferById(id)
            .then((response) => {
                let resData;

                if(response.amount) resData = { ...response.quoteId, amount: response.amount, declineReason: response.declineReason, offerId: response._id, result: response.result };
                else resData = { ...response, quoteId: response._id };

                setOffer(resData);
            })
            .catch((error) => {
                console.error("Error fetching offers:", error);
            });
    }

    useEffect(() => {
        getOfferData()
    }, [])
    
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
                
                {
                    !offer.declineReason ?

                    (   offer.amount && 

                        <div className="p-6 border rounded-xl shadow-md bg-white w-full">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Our Offer:</label>
                                <p className="text-lg font-semibold text-gray-700">{ offer.amount } TND</p>
                            </div>
                        </div>
                    )

                    :

                    <div className="p-6 border rounded-xl shadow-md bg-white w-full">
                        <label className="text-md text-gray-500">Declined for:</label>
                        <p className="text-lg font-semibold text-gray-700">{ offer.declineReason }</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default AdminQuotePage;