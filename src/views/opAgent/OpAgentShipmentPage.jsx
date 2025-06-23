import { useEffect, useState } from "react";
import { capitalizeWords } from "services/ApiQuote";
import { formatDate } from "services/ApiQuote";

const exQuote = {
    origin: 'New York',
    destination: 'Los Angeles',
    weight: 1200,
    volume: 250,
    dimensions: { height: 2, width: 2, length: 3 },
    containerType: '40ft',
    incoterm: 'fob',
    mode: 'road',
    status: 'under review',
    serviceLevel: 'express',
    reqDelivery: new Date('2025-07-10'),
    readyDate: new Date('2025-07-05')
};

const OpAgentShipmentPage = () => {
    const [quote, setQuote] = useState(exQuote);

    const [offer, setOffer] = useState('');
    const [declineReason, setDeclineReason] = useState('');
    const [status, setStatus] = useState(quote.status);
    
    const handleSubmit = (e) => {
        e.preventDefault();

        if (status === 'rejected') {
            console.log('Declined:', declineReason);
        } else {
            console.log('Offer submitted:', offer);
        }
    };

    useEffect(() => {

    }, [])

    return (
        <>
            <div className="mx-auto w-full py-8" style={{ maxWidth: "800px" }}>
                            {/* Top Section: Quote Details */}
                <div className="mb-6 p-6 border rounded-xl shadow-md bg-white w-full">
                    <h2 className="text-2xl font-bold mb-4">Offer Details</h2>

                    <div className="flex">
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Origin: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.origin }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Destination: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.destination }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Weight: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.weight } Kg</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Volume: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.volume } m³</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Dimensions (HxWxL in meters): </label>
                                <p className="text-lg font-semibold text-gray-700">{`${quote.dimensions.height} x ${quote.dimensions.width} x ${quote.dimensions.length}`}</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Container Type: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.containerType.toUpperCase() }</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col flex-1">
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Incoterm: </label>
                                <p className="text-lg font-semibold text-gray-700">{ quote.incoterm.toUpperCase() }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Mode: </label>
                                <p className="text-lg font-semibold text-gray-700">{ capitalizeWords(quote.mode) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Service Level: </label>
                                <p className="text-lg font-semibold text-gray-700">{ capitalizeWords(quote.serviceLevel) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Requested Delivery: </label>
                                <p className="text-lg font-semibold text-gray-700">{ formatDate(quote.reqDelivery) }</p>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <label className="text-md text-gray-500">Ready Date: </label>
                                <p className="text-lg font-semibold text-gray-700">{ formatDate(quote.readyDate) }</p>
                            </div>
                        </div>
                    </div>
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

export default OpAgentShipmentPage;