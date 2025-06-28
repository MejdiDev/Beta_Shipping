import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toastErr } from "services/ApiAll";
import { getShipmentById } from "services/ApiClient";
import { formatShips } from "views/opAgent/OpAgentShipments";

const ShipmentPage = () => {
    const [ship, setShip] = useState();
    const { id } = useParams();

    useEffect(() => {
        getShipmentById(id)
            .then((response) => {
                setShip(formatShips([response])[0]);
            })
            .catch((error) => {
                console.error("Error fetching shipment:", error);
                toastErr(error.message);
            });
    }, [])

    return ship && (
        <>
            <div className="mx-auto w-full py-8" style={{ maxWidth: "800px" }}>
                {/* Top Section: Quote Details */}
                <div className="mb-6 p-6 border rounded-xl shadow-md bg-white w-full">
                    <h2 className="text-2xl font-bold mb-4">Shipment Details</h2>

                    {
                        ship.shipmentType === 'fcl' &&
                        
                        <FCLOffer
                            quote={ ship }
                        />
                    }

                    {
                        ship.shipmentType === 'lcl' &&
                        
                        <LCLOffer
                            quote={ ship }
                        />
                    }

                    {
                        ship.shipmentType === 'air' &&
                        
                        <AIROffer
                            quote={ ship }
                        />
                    }
                </div>

                {/* Bottom Section: Accept or Decline */}
                <div className="p-6 border rounded-xl shadow-md bg-white w-full">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Our Offer:</label>
                        <p className="text-lg font-semibold text-gray-700">1,278 TND</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ShipmentPage;