import { formatInputDate } from "components/Cards/ClientTabs/EditClientTab";
import { useState } from "react";
import Switch from "react-switch";

const LCLTab = ({ formData, handleChange }) => {
    const [dangChecked, setDangChecked] = useState(false)

    return (
        <>
            <div className="flex flex-col w-full p-4 pt-0 pb-0">
                <h2 className="flex-1 text-2xl font-semibold">LCL Shipment</h2>

                <div className="flex w-full flex-1">
                    <div className="mt-3 mr-3 flex-1">
                        <label className="block  text-sm font-medium text-gray-700">
                            Origin
                        </label>
                        <input
                            name="originPort"
                            type="text"
                            placeholder="Enter origin port"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.originPort }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="mt-3 ml-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Destination
                        </label>
                        <input
                            name="destinationPort"
                            type="text"
                            placeholder="Enter destination port"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                            value={ formData.destinationPort }
                            onChange={ handleChange }
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-300 my-4 m-4 w-full"></div>

            <div className="flex flex-col w-full p-4 pt-0 pb-0">
                <h2 className="flex-1 text-2xl font-semibold  mb-3">Cargo Details</h2>

                <div className="flex">
                    <div className="flex items-center w-full flex-1 bg-gray p-2 rounded-lg mr-2">
                        <div className="flex-1">
                            <input
                                name="width"
                                type="number"
                                min={0}
                                placeholder="Width"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.width }
                                onChange={ handleChange }
                            />
                        </div>

                        <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>

                        <div className="flex-1">
                            <input
                                name="height"
                                type="number"
                                min={0}
                                placeholder="Height"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.height }
                                onChange={ handleChange }
                            />
                        </div>

                        <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>

                        <div className="flex-1">
                            <input
                                name="length"
                                type="number"
                                min={0}
                                placeholder="Length"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.length }
                                onChange={ handleChange }
                            />
                        </div>
                    </div>

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
                                name="totalPackages"
                                type="number"
                                min={0}
                                placeholder="Total Packages"
                                className="mt-1 border-transparent bg-transparent shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full text-center"

                                value={ formData.totalPackages }
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
                    <div className="mt-3 mr-3 flex-1">
                        <label className="block text-sm font-medium text-gray-700">
                            Package Type
                        </label>
                        
                        <input
                            name="packageType"
                            type="text"
                            placeholder="Enter package type"
                            className="mt-1 block w-full  rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"

                            value={ formData.packageType }
                            onChange={ handleChange }
                        />
                    </div>

                    <div className="mt-3 mr-3 flex-1">
                        <label className="block  text-sm font-medium text-gray-700">
                            Incoterm
                        </label>
                        <select
                            name="incoterm"
                            placeholder="Enter origin port"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.incoterm }
                            onChange={ handleChange }
                        >
                            <option value="">Select Incoterm</option>
                            
                            <option value="fob">FOB</option>
                            <option value="fca">FCA</option>
                            <option value="exwork">EXWORK</option>
                        </select>
                    </div>
                </div>

                <div className="flex w-full flex-1 mt-5">
                    <div className="flex-1 mr-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Ready Date
                        </label>

                        <input
                            name="readyDate"
                            type="date"
                            placeholder="Pick a date"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.readyDate && formatInputDate(formData.readyDate) }
                            onChange={ handleChange }
                            
                            style={{ border: "1px #71717a solid", padding: "0.5rem 0.75rem" }}
                        />
                    </div>
                </div>

                <div className="border-t border-gray-300 my-4 w-full flex w-full flex-1 mt-5 pt-4">
                    <div className="flex-1 mr-3">
                        <label className="block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="cargoDescription"
                            placeholder="Write A Description"
                            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"

                            value={ formData.cargoDescription }
                            onChange={ handleChange }
                            
                            style={{ height: "150px", border: "1px #71717a solid", padding: "0.5rem 0.75rem" }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default LCLTab;