import AIROffer from "components/offerCards/AIROffer";
import FCLOffer from "components/offerCards/FCLOffer";
import LCLOffer from "components/offerCards/LCLOffer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { toastSucc } from "services/ApiAll";
import { toastErr } from "services/ApiAll";
import { getShipmentById } from "services/ApiClient";
import { downloadDocument } from "services/ApiOpOfficer";
import { formatShips } from "views/opAgent/OpAgentShipments";

const ShipmentPage = () => {
    const [ship, setShip] = useState([]);
    const [docs, setDocs] = useState([]);

    const { id } = useParams();

    const downloadDoc = ({ docId, userId }) => {
        downloadDocument({ docId, userId })
            .then((response) => {
                console.log(response)
                toastSucc("Document downloaded successfully !")
            })
            .catch((error) => {
                toastErr(error.message);
                console.error("Error fetching offers:", error);
            });
    }

    useEffect(() => {
        getShipmentById(id)
            .then((response) => {
                setShip(formatShips([response])[0]);
                setDocs(response.documents);
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
                <div className="p-6 border rounded-xl shadow-md bg-white w-full mb-6">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Our Offer:</label>
                        <p className="text-lg font-semibold text-gray-700">1,278 TND</p>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full" style={{ maxWidth: "800px" }}>
                {
                    docs.map((doc, index) => (
                        <div className="flex items-center justify-between mb-6" key={index}>
                            <p>{ doc.fileName }</p>

                            <button
                                style={{ backgroundColor: '#e8f4ff', color: '#3595e3', borderColor: '#3595e3' }}
                                className="font-semibold py-2 px-3 border-2 rounded cursor-pointer"

                                onClick={ () => downloadDoc({
                                    docId: doc._id,
                                    userId: doc.clientId
                                }) }
                            >Download</button>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default ShipmentPage;