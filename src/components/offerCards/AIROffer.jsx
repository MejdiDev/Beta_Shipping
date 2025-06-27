import { formatDate } from "services/ApiQuote";

// weight
// volume
// numberOfPieces

const AIROffer = ({ quote }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full">
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Origin Port: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.originAirport }</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Destination Port: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.destinationAirport }</p>
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
                        <label className="text-md text-gray-500">Number of pieces: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.numberOfPieces }</p>
                    </div>
                </div>
                
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Incoterm: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.incoterm && quote.incoterm.toUpperCase() }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Created At: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.createdAt && formatDate(quote.createdAt) }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Ready Date: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.readyDate && formatDate(quote.readyDate) }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Dangerous: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.dangerous ? "Yes" : "No" }</p>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 my-3 w-full flex w-full flex-1 mt-5 pt-4"></div>

            <div className="w-full">
                <label className="text-md text-gray-500">Goods Description: </label>
                <p className="text-lg font-semibold text-gray-700">{ quote.cargoDescription }</p>
            </div>
        </div>
    );
}

export default AIROffer;