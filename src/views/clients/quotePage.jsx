import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toastErr } from "services/ApiAll";
import { getShipmentById } from "services/ApiOperationalOfficer";
import { getClientQuoteById } from "services/ApiQuote";
import { formatShips } from "views/opAgent/OpAgentShipments";

const QuotePage = () => {
    const [ship, setShip] = useState();
    const { id } = useParams();

    useEffect(() => {
        getClientQuoteById(id)
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
                    <h2 className="text-2xl font-bold mb-4">Quote Details</h2>

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
            </div>
        </>
    );
}

export default QuotePage;