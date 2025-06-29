import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { formatShips } from "components/ShipmentList";

import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getShipmentById } from "services/ApiAdmin";
import { GetQuoteOfferById } from "services/ApiAdmin";

const AdminShipmentPage = () => {
    const [offer, setOffer] = useState('');
    const { id } = useParams();
    const history = useHistory();

    const getOfferData = () => {
        getShipmentById(id)
            .then((response) => {
                setOffer(formatShips([response])[0]);
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
                    <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>

                    {
                        offer.shipmentType === 'fcl' &&
                        
                        <FCLOffer
                            quote={ offer }
                        />
                    }

                    {
                        offer.shipmentType === 'lcl' &&
                        
                        <LCLOffer
                            quote={ offer }
                        />
                    }

                    {
                        offer.shipmentType === 'air' &&
                        
                        <AIROffer
                            quote={ offer }
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

export default AdminShipmentPage;