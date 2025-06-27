import { Link } from "react-router-dom/cjs/react-router-dom";
import { getLabelColor, capitalizeWords, formatDate } from "services/ApiQuote";

const LCLCard = ({ quote, index, min=false, to  }) => {
    return (
        <div key={index}>
            <div className="position-relative flex flex-row space-y-4" style={{ height: "200px" }}>
            <div style={{ width: "6px", backgroundColor: getLabelColor(quote.status)}}></div>
            
            <div className="flex flex-col flex-1">
                <div className="flex items-center gap-10 p-4 flex-1 border-r-2">
                    <div className="flex justify-between">
                    <i className="fa fa-archive text-lightBlue-500 text-4xl mr-3" aria-hidden="true"></i>

                    <div className="flex w-full">
                    <div className="mr-3 ml-3">
                        <p className="text-xs text-gray-500">From</p>
                        <h4 className="text-md font-semibold text-gray-700">
                            {quote.originPort || "N/A"}
                        </h4>
                    </div>

                    <img className="ml-3 mr-3" src="./arrow.png" alt="Arrow" style={{ height: "50px" }} />

                    <div className="ml-3">
                        <p className="text-xs text-gray-500">To</p>
                        <h4 className="text-md font-semibold text-gray-700">
                            {quote.destinationPort || "N/A"}
                        </h4>
                    </div>
                    </div>
                </div>

                <div className="border-1 border-gray-300 bg-black h-10"></div>
                    <div>
                        <p className="text-xs text-gray-500">Package Type</p>
                        <h4 className="text-md font-semibold text-gray-700">
                        ABC2
                        </h4>
                    </div>

                    {
                        !min &&
                        <>
                            <div className="border-1 border-gray-300 bg-black h-10"></div>

                            <div>
                                <p className="text-xs text-gray-500">Total Packages</p>
                                <h4 className="text-md font-semibold text-gray-700">
                                6
                                </h4>
                            </div>
                        </>
                    }
                </div>

                <div className="border-1 border-gray-300 bg-black h-1 mx-4"></div>

                {/* Cargo Details */}
                <div className="flex flex-row justify-even p-4 shadow-sm flex-1 ml-5 w-full">
                    {   !min && 
                        <>
                            <div>
                                <p className="text-xs text-gray-500">Mode</p>
                                <h4 className="text-md font-semibold text-gray-700">
                                    { quote.shipmentType ? quote.shipmentType.toUpperCase() : "N/A" }
                                </h4>
                            </div>

                            <div className="border-1 border-gray-300 bg-black h-10"></div>
                        </>
                    }

                    <div>
                        <p className="text-xs text-gray-500">Width</p>
                        <h4 className="text-md font-semibold text-gray-700">
                        {quote.width ? `${quote.width} kg` : "N/A"}
                        </h4>
                    </div>

                    <div className="border-1 border-gray-300 bg-black h-10"></div>

                    <div>
                        <p className="text-xs text-gray-500">Height</p>
                        <h4 className="text-md font-semibold text-gray-700">
                        {quote.height ? `${quote.height} kg` : "N/A"}
                        </h4>
                    </div>

                    <div className="border-1 border-gray-300 bg-black h-10"></div>

                    <div>
                        <p className="text-xs text-gray-500">Weight</p>
                        <h4 className="text-md font-semibold text-gray-700">
                        {quote.weight ? `${quote.weight} kg` : "N/A"}
                        </h4>
                    </div>
                </div>
            </div>
            
            {   min ?

                <div className="grid-cols-2 gap-4 flex mt-2">
                    <div className="px-2 py-1" style={{ backgroundColor: getLabelColor(quote.status), borderRadius: "20px", color: (quote.status !== "in transit" && "white"), position: "absolute", top: "15px", right: "15px" }}>
                    { capitalizeWords(quote.status) }
                    </div>
                </div>

                :

                <div className="border-l-2">
                    <div className="flex flex-col justify-center items-center p-4 shadow-sm ml-5" style={{ width: "260px", height: "calc(100% - 65px)" }}>
                        <div className="flex flex-row w-full justify-center mt-6">
                            <p className="">Created&nbsp;</p>
                            <h4 className="text-md font-semibold text-gray-700 mb-2">{ formatDate(quote.createdAt) }</h4>
                        </div>

                        <div className="grid-cols-2 gap-4 flex mt-2">
                            <div className="px-2 py-1" style={{ backgroundColor: getLabelColor(quote.status), borderRadius: "20px", color: (quote.status !== "in transit" && "white") }}>
                            Quote { capitalizeWords(quote.status) }
                            </div>
                        </div>

                        <div className="flex flex-row w-full justify-center mt-4">
                            <p className="">Quote ID&nbsp;</p>
                            <h4 className="text-md font-semibold text-gray-700 mb-2">{ "#" + quote._id.substring(0, 7) }</h4>
                        </div>
                    </div>

                    <Link to={ to }>
                        <div className="flex flex-row w-full justify-center mt-6">
                            <h4 className="text-md font-semibold text-gray-700 mb-3">View Details</h4>
                        </div>
                    </Link>
                </div>
            }
            </div>
        </div>
    );
}

export default LCLCard;