import getCard from "components/Cards/CardQuoteShip";
import { useEffect, useState } from "react";
import { getShipments } from "services/ApiOperationalOfficer";

import { useDropzone } from 'react-dropzone';
import { uploadDocument } from "services/ApiOpOfficer";

const UploadIcon = () => (
    <svg style={{ height: "100px" }} className="text-gray" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
        <path fill="#334155" d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128l-368 0zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39L296 392c0 13.3 10.7 24 24 24s24-10.7 24-24l0-134.1 39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"/>
    </svg>
)

export const FileUpload = ({ setUpFile }) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        'text/pdf': ['.pdf'],
        onDrop: (incomingFiles) => {
            setUpFile(incomingFiles[0])
        }
    });

    return (
        <div className="w-full bg-gray p-5 py-7 rounded-xl border-4 border-dashed flex justify-center cursor-pointer">
            <form className="flex flex-col items-center justify-center">
                <div {...getRootProps({ className: 'dropzone flex flex-col items-center gap-6' })}>
                    <UploadIcon />
                    <input {...getInputProps()} />

                    {acceptedFiles.length > 0 ? <p className="text-center text-xl">{acceptedFiles[0].name}</p> : <p className="text-center text-xl">Glisser & déposez quelques fichiers ici, ou cliquez pour sélectionner des fichiers</p>}
                </div>
            </form>
        </div>
    );
}

const OpAgentShipments = () => {
    const [ships, setShips] = useState([]);
    const [shownShips, setShownShips] = useState([]);

    const [focusShip, setFocusShip] = useState();
    
    const [query, setQuery] = useState("");

    const [status, setStatus] = useState("");
    const [mode, setMode] = useState("");
    const [service, setService] = useState("");

    const [docData, setDocData] = useState({ fileName: "", documentType: "" });
    const [upFile, setUpFile] = useState('');

    const handleClose = () => {
        setFocusShip();

        document.getElementById("window-wrapper").style.opacity = "0"

        setTimeout(() => {
            document.getElementById("window-wrapper").style.display = "none"
            document.querySelector("body").style.overflow = "auto"
        }, 150);
    }


    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('shipmentId', focusShip._id);
        formData.append('clientId', focusShip.userId);
        formData.append('documentType', docData.documentType);
        formData.append('document', upFile);

        uploadDocument(formData)
            .then((response) => {
                if(response.document) {
                    handleClose()
                }
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
            });
    }

    useEffect(() => {
        getShipments()
            .then((response) => {
                setShips(response);
                setShownShips(response);
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
            });
    }, [])

    return (
        <>
            <div
                id="window-wrapper"
                className="flex justify-center items-center"
                data-fixed="true"

                onClick={ e => {
                    if(e.target.id !== "window-wrapper") return
                    handleClose()
                }}
            >
                <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: "645px" }}>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enter Document Information</h2>
                    
                    <form onSubmit={ handleSubmit } className="space-y-4 flex flex-col gap-3">
                        {/* Document Category */}
                        <div>
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">Document Type</label>
                            <select
                                name="documentType"
                                value={ docData.documentType }
                                onChange={ e => setDocData({ ...docData, documentType: e.target.value }) }
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="Master Air Waybill (MAWB)">Master Air Waybill (MAWB)</option>
                                <option value="House Air Waybill (HAWB)">House Air Waybill (HAWB)</option>
                                <option value="Commercial Invoice">Commercial Invoice</option>
                                <option value="Packing List">Packing List</option>
                                <option value="Shipper's Letter of Instruction (SLI)">Shipper's Letter of Instruction (SLI)</option>
                                <option value="Dangerous Goods Declaration (DGD) / Shipper's Declaration for Dangerous Goods">Dangerous Goods Declaration (DGD) / Shipper's Declaration for Dangerous Goods</option>
                                <option value="Certificate of Origin (COO)">Certificate of Origin (COO)</option>
                                <option value="Export/Import Licenses">Export/Import Licenses</option>
                                <option value="Security Declaration">Security Declaration</option>
                                <option value="Customs Declaration (Export/Import)">Customs Declaration (Export/Import)</option>
                                <option value="Proof of Delivery (POD)">Proof of Delivery (POD)</option>
                                <option value="Master Bill of Lading (MBL)">Master Bill of Lading (MBL)</option>
                                <option value="House Bill of Lading (HBL)">House Bill of Lading (HBL)</option>
                                <option value="Booking Confirmation">Booking Confirmation</option>
                                <option value="Container Load Plan / Container Loading List">Container Load Plan / Container Loading List</option>
                                <option value="Dangerous Goods Manifest">Dangerous Goods Manifest</option>
                                <option value="Arrival Notice">Arrival Notice</option>
                                <option value="Delivery Order">Delivery Order</option>
                                <option value="Bill of Lading (BOL) / Freight Bill / Waybill">Bill of Lading (BOL) / Freight Bill / Waybill</option>
                                <option value="CMR (Convention on the Contract for the International Carriage of Goods by Road)">CMR (Convention on the Contract for the International Carriage of Goods by Road)</option>
                                <option value="Load Sheet / Manifest">Load Sheet / Manifest</option>
                                <option value="Border Crossing Documents">Border Crossing Documents</option>
                                <option value="Permits / Licenses">Permits / Licenses</option>
                                <option value="Delivery Note">Delivery Note</option>
                            </select>
                        </div>

                        {/* Document Type */}
                        <div>
                            <label htmlFor="status" className="text-sm font-medium text-gray-700">Document Category</label>
                            <select
                                name="documentCategory"
                                value={ docData.documentCategory }
                                onChange={ e => setDocData({ ...docData, documentCategory: e.target.value }) }
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="financial">Financial</option>
                                <option value="operational">Operational</option>
                            </select>
                        </div>

                        {/* File Upload */}
                        <div>
                            {
                                focusShip &&

                                <FileUpload
                                    setUpFile={ setUpFile }
                                />
                            }
                        </div>

                        <div className="flex justify-end gap-4 mt-6">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
                            <button className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none" onClick={() => {
                                
                            }}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="flex flex-col items-center bg-gray rounded-lg">
                <div className="mx-autp items-center flex flex-col justify-between md:flex-nowrap flex-wrap px-4" style={{ width: "1000px" }}>
                    <form className="md:flex hidden flex-row items-center lg:ml-auto w-full gap-6">
                        <div className="relative flex w-full flex-wrap items-stretch">
                            <span className="z-10 h-full leading-snug font-normal  text-center text-xl absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                                <i className="fas fa-search"></i>
                            </span>

                            <input
                                type="text"
                                placeholder="Search by #ID"
                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                                
                                value={ query }
                                onChange={ e => setQuery(e.target.value) }
                            />
                        </div>
            
                        <button className="bg-lightBlue-500 text-white py-2 px-6 rounded shadow-md">Search</button>
                    </form>
        
                    <div className="w-full mt-3 flex gap-4">
                        <div className="flex-1">
                            <label className="block  text-sm font-medium text-gray-700 mb-1">
                                Status
                            </label>
            
                            <select onChange={ e => {
                                setStatus(e.target.value)
                
                                setShownShips(
                                    ships.filter(el => (
                                        el._id.includes(query) &&
                                        (status.length !== 0 ? el.status === status : true) &&
                                        (mode.length !== 0 ? el.mode === mode : true) &&
                                        (service.length !== 0 ? el.service === service : true)
                                    ))
                                )
                            }} className="w-full rounded-lg">
                                <option value="requested">Requested</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="delivered">Delivered</option>
                                <option value="in transit">In Transit</option>
                            </select>
                        </div>
            
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Mode
                            </label>
            
                            <select onChange={ e => {
                                setMode(e.target.value)
                
                                setShownShips(
                                    ships.filter(el => (
                                        el._id.includes(query) &&
                                        (status.length !== 0 ? el.status === status : true) &&
                                        (mode.length !== 0 ? el.mode === mode : true) &&
                                        (service.length !== 0 ? el.service === service : true)
                                    ))
                                )
                            } } className="w-full rounded-lg">
                                <option value="fcl">FCL</option>
                                <option value="lcl">LCL</option>
                                <option value="air">AIR</option>
                            </select>
                        </div>
                        
                        <div className="flex-1">
                            <label className="block  text-sm font-medium text-gray-700 mb-1">
                                Incoterm
                            </label>
            
                            <select onChange={ e => {
                                setService(e.target.value)
                
                                setShownShips(
                                    ships.filter(el => (
                                        el._id.includes(query) &&
                                        (status.length !== 0 ? el.status === status : true) &&
                                        (mode.length !== 0 ? el.mode === mode : true) &&
                                        (service.length !== 0 ? el.service === service : true)
                                    ))
                                )
                            } } className="w-full rounded-lg">
                                <option value="FOB">FOB</option>
                                <option value="CIF">CIF</option>
                                <option value="EXW">EXW</option>
                                <option value="DDP">DDP</option>
                                <option value="DDU">DDU</option>
                            </select>
                        </div>
                    </div>
                </div>
        
                <div className="px-3 w-full flex justify-center mt-8">
                    <div style={{ width: "1000px" }}>
                        {shownShips.length > 0 ? (
                            shownShips.map((shipment, index) =>
                                <>
                                    { getCard({ quote: shipment, index }) }
                                    <button onClick={() => {
                                        setFocusShip(shipment);

                                        document.querySelector("body").style.overflow = "hidden"
                                        document.getElementById("window-wrapper").style.display = "flex"

                                        setTimeout(() => {
                                        document.getElementById("window-wrapper").style.opacity = "1"
                                        }, 1);
                                    }}>Add Document</button>
                                </>
                            )
                        ) : (
                            <div className="col-span-full">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                    <p className="text-red-600">No shipments available.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default OpAgentShipments;