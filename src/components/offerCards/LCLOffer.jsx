import { formatDate } from "services/ApiQuote";

const LCLOffer = ({ quote }) => {
    return (
        <div className="flex flex-col w-full">
            <div className="flex w-full">
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Origin Port: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.originPort }</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Destination Port: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.destinationPort }</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Package Type: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.packageType }</p>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Total Packages: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.totalPackages }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Created At: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.createdAt && formatDate(quote.createdAt) }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Ready Date: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.readyDate && formatDate(quote.readyDate) }</p>
                    </div>
                </div>
                
                <div className="flex flex-col flex-1">
                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Incoterm: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.incoterm && quote.incoterm.toUpperCase() }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Dangerous: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.dangerous ? "Yes" : "No" }</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Weight: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.weight } Kg</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Length: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.length } Cm</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Width: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.width } Cm</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <label className="text-md text-gray-500">Height: </label>
                        <p className="text-lg font-semibold text-gray-700">{ quote.height } Cm</p>
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

export default LCLOffer;