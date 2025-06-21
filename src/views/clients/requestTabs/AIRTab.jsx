import { useState } from "react";
import Switch from "react-switch";

const AIRTab = ({ formData, handleChange }) => {
    const [dangChecked, setDangChecked] = useState(false)

    return (
        <>
            <div className="flex flex-col w-full p-4 pt-0 pb-0">
                <h2 className="flex-1 text-2xl font-semibold">Air Freight Shipment</h2>

                <div className="flex w-full flex-1">
                    <div className="mt-3 mr-3 flex-1">
                        <label className="block  text-sm font-medium text-gray-700">
                            Origin
                        </label>
                        <input
                            name="origin"
                            type="text"
                            placeholder="Enter Origin Airport"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.origin }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="mt-3 ml-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Destination
                        </label>
                        <input
                            name="destination"
                            type="text"
                            placeholder="Enter Destination Airport"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                            value={ formData.destination }
                            onChange={ handleChange }
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 my-4 m-4 w-full"></div>

            <div className="flex flex-col w-full p-4 pt-0 pb-0">
                <h2 className="flex-1 text-2xl font-semibold  mb-3">Cargo Details</h2>

                <div className="flex">
                    <div className="flex items-center w-full flex-1 bg-gray p-2 rounded-lg ml-2">
                        <div className="flex-1">
                            <input
                                name="weight"
                                type="number"
                                min={0}
                                placeholder="Weight (Kg)"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.weight }
                                onChange={ handleChange }
                            />
                        </div>

                        <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>

                        <div className="flex-1">
                            <input
                                name="volume"
                                type="number"
                                min={0}
                                placeholder="Volume (m³)"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.volume }
                                onChange={ handleChange }
                            />
                        </div>
                    </div>

                    <div className="flex items-center w-full flex-1 bg-gray p-2 rounded-lg ml-2">
                        <div className="flex-1">
                            <input
                                name="numPieces"
                                type="number"
                                min={0}
                                placeholder="Number Of Pieces"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.volume }
                                onChange={ handleChange }
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 my-4 m-4 w-full"></div>

            <div className="flex flex-col w-full p-4 pt-0 pb-0">
                <h2 className="flex-1 text-2xl font-semibold">Shipping Terms</h2>

                <div className="flex w-full flex-1">
                    {/* <div className="mt-3 mr-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Container Type
                        </label>
                        <select
                            name="containerType"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                            value={ formData.containerType }
                            onChange={ handleChange }
                        >
                            <option value="20ft Standard">20ft Standard</option>
                            <option value="40ft Standard">40ft Standard</option>
                            <option value="40ft High Cube">40ft High Cube</option>
                        </select>
                    </div> */}

                    <div className="mt-3 mr-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Incoterm
                        </label>
                        <select
                            name="incoterm"
                            placeholder="Enter origin port"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.incoterm }
                            onChange={ handleChange }
                        >
                            <option value="FOB">FOB</option>
                            <option value="CIF">CIF</option>
                            <option value="EXW">EXW</option>
                            <option value="DDP">DDP</option>
                            <option value="DDU">DDU</option>
                        </select>
                    </div>

                    <div className="flex flex-col items-center mt-3 mr-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Dangerous
                        </label>
                        
                        <div className="flex items-center" style={{ height: "calc(100% - 20px)" }}>
                            <Switch
                                checked={ dangChecked }
                                onChange={ v => setDangChecked(v) }

                                onColor="#FF0000"
                                checkedIcon={false}
                                uncheckedIcon={ false }
                            />
                        </div>
                    </div>

                    {/* <div className="mt-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Service Level
                        </label>
                        <select
                            name="serviceLevel"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                            value={ formData.serviceLevel }
                            onChange={ handleChange }
                        >
                            <option value="standard">Standard</option>
                            <option value="express">Express</option>
                            <option value="premium">Premium</option>
                        </select>
                    </div> */}
                </div>

                <div className="border-t border-gray-300 my-4 w-full flex w-full flex-1 mt-5 pt-4">
                    <div className="flex-1 mr-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="readyDate"
                            type="date"
                            placeholder="Write A Description"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.readyDate }
                            onChange={ handleChange }
                            
                            style={{ height: "150px", border: "1px #71717a solid", padding: "0.5rem 0.75rem" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default AIRTab;