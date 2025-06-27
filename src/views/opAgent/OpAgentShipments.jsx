import getCard from "components/Cards/CardQuoteShip";
import { useEffect, useState } from "react";
import { getShipments } from "services/ApiOperationalOfficer";

import { useDropzone } from 'react-dropzone';
import { uploadDocument } from "services/ApiOpOfficer";
import FCLTab from "views/clients/requestTabs/FCLTab";
import LCLTab from "views/clients/requestTabs/LCLTab";
import AIRTab from "views/clients/requestTabs/AIRTab";
import { toastErr } from "services/ApiAll";
import { initFormData } from "views/clients/clientrequest";
import { validateForm } from "views/clients/clientrequest";
import { addShipment } from "services/ApiOperationalOfficer";
import { toastSucc } from "services/ApiAll";
import { getClients } from "services/ApiOperationalOfficer";

export const formatShips = data => {
    return data.map(el => {
        if(el.quoteRequestId) return { ...el.quoteRequestId.detailsId, shipmentType: el.quoteRequestId.shipmentType, status: el.status, clientId: el.clientId }
        else if(el.detailsId) return { ...el.detailsId, shipmentType: el.shipmentType, status: el.status, clientId: el.clientId }
    })
}

const docTypeOpt = [
    "Master Air Waybill (MAWB)",
    "House Air Waybill (HAWB)",
    "Commercial Invoice",
    "Packing List",
    "Shipper's Letter of Instruction (SLI)",
    "Dangerous Goods Declaration (DGD) / Shipper's Declaration for Dangerous Goods",
    "Certificate of Origin (COO)",
    "Export/Import Licenses",
    "Security Declaration",
    "Customs Declaration (Export/Import)",
    "Proof of Delivery (POD)",
    "Master Bill of Lading (MBL)",
    "House Bill of Lading (HBL)",
    "Booking Confirmation",
    "Container Load Plan / Container Loading List",
    "Dangerous Goods Manifest",
    "Arrival Notice",
    "Delivery Order",
    "Bill of Lading (BOL) / Freight Bill / Waybill",
    "CMR (Convention on the Contract for the International Carriage of Goods by Road)",
    "Load Sheet / Manifest",
    "Border Crossing Documents",
    "Permits / Licenses",
    "Delivery Note"
];

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
    const [clients, setClients] = useState([]);

    const [shownShips, setShownShips] = useState([]);

    const [focusShip, setFocusShip] = useState();
    
    const [query, setQuery] = useState("");

    const [docType, setDocType] = useState("");
    const [docCategory, setDocCategory] = useState("");

    const [docData, setDocData] = useState({ fileName: "", documentType: "" });
    const [upFile, setUpFile] = useState('');

    const [floatingTab, setFloatingTab] = useState();
    const [activeTab, setActiveTab] = useState("FCL");

    const [formData, setFormData] = useState(initFormData);

    const handleChange = (e, mode) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [mode]: {
            ...formData[mode],
            [name]: value,
        },
        }));
    };

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
        formData.append('clientId', focusShip.clientId);
        formData.append('documentType', docData.documentType);
        formData.append('document', upFile);

        uploadDocument(formData)
            .then((response) => {
                if(response.document) {
                    toastSucc(response.message);
                    handleClose();
                }
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
                toastErr(error.message);
            });
    }
    
    const getShipData = () => {
        getShipments()
            .then((response) => {
                const resShips = formatShips(response.shipments)
                
                setShips(resShips)
                setShownShips(resShips);
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
                toastErr(error.message)
            });
    }

    const handleAddShip = () => {
        if(!validateForm({ formData, activeTab })) return

        addShipment({ shipDetails: formData[ activeTab.toLowerCase() ], shipmentType: activeTab })
            .then((response) => {
                toastSucc(response.message)

                getShipData()
                handleClose()
            })
            .catch((error) => {
                console.error("Error adding shipment:", error);
                toastErr(error.message)
            });
    }

    useEffect(() => {
        getShipData();

        getClients()
            .then((response) => {
                setClients(response)
            })
            .catch((error) => {
                console.error("Error fetching shipments:", error);
                toastErr(error.message)
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

                style={{
                    paddingTop: (floatingTab === 'addShip' ? "calc(80px + 18rem)" : "80px")
                }}
            >
                {
                    floatingTab === 'addShip' &&
                    
                    <div className="py-4 px-2 pb-4" style={{ backgroundColor: "white", borderRadius: ".65rem", maxWidth: "700px", width: "100%" }}>
                        <div className="flex flex-col items-center">
                            {/* Tabs Navigation */}
                            <div className="flex justify-center ml-3 mr-3 mb-3 w-full">
                                <nav className="flex w-full max-w-2xl mx-auto rounded-lg overflow-hidden bg-gray p-2">
                                    {[
                                    { tab: "FCL", label: "FCL" },
                                    { tab: "LCL", label: "LCL" },
                                    { tab: "AIR", label: "AIR" },
                                    ].map(({ tab, label }, idx, arr) => (
                                        <>
                                            <button
                                                type="button"
                                                key={tab}
                                                onClick={() => setActiveTab(tab)}
                                                className={`flex-1 px-6 border-2 py-2 text-sm font-medium capitalize transition-all duration-200 focus:outline-none
                                                    ${
                                                        activeTab === tab
                                                        ? "bg-white text-black border-b-2 border-transparent rounded-lg"
                                                        : "bg-gray-100 text-gray-500 hover:bg-red-200 border-b-2 border-transparent"
                                                    }
                                                    ${idx === 0 ? "rounded-l-lg" : ""}
                                                    ${idx === arr.length - 1 ? "rounded-r-lg" : ""}
                                                `}
                                                style={{ outline: "none" }}
                                            >
                                                {label}
                                            </button>

                                            {
                                                (idx !== 2) && (
                                                    <div className="border-1 border-gray-300 bg-black h-10 mx-4"></div>
                                                )
                                            }
                                        </>
                                    ))}
                                </nav>
                            </div>
                            
                            {activeTab === "FCL" &&
                                <div className="w-full">
                                    <FCLTab
                                        formData={ formData }
                                        handleChange={ e => handleChange(e, 'fcl') }
                                    />
                                </div>
                            }
                            
                            {activeTab === "LCL" &&
                                <div className="w-full">
                                    <LCLTab
                                        formData={ formData }
                                        handleChange={ e => handleChange(e, 'lcl') }
                                    />
                                </div>
                            }
                            
                            {activeTab === "AIR" &&
                                <div className="w-full">
                                    <AIRTab
                                        formData={ formData }
                                        handleChange={ e => handleChange(e, 'air') }
                                    />
                                </div>
                            }

                            <div className="border-t border-gray-300 w-full flex w-full flex-1 pt-4"></div>

                            <div className="mb-6 w-full px-4">
                                <label htmlFor="clientId" className="text-sm font-medium text-gray-700">Assigned To Client:</label>
                                <select
                                    name="clientId"
                                    value={ formData[activeTab.toLowerCase()].clientId }
                                    onChange={ e => {
                                        setFormData((prev) => ({
                                            ...prev,
                                            [activeTab.toLocaleLowerCase()]: {
                                                ...formData[activeTab.toLocaleLowerCase()],
                                                clientId: e.target.value,
                                            },
                                        }));
                                    }}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select a client</option>

                                    {
                                        clients.map(client => (
                                            <option key={ client._id } value={ client._id }>
                                                { client.name + (client.last ? client.last : "") }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex justify-end gap-3">
                            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
                            <button
                                className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none"
                                onClick={ handleAddShip }
                            >Confirm</button>
                        </div>
                    </div>
                }

                {   floatingTab === 'addDoc' &&

                    <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: "645px" }}>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enter Document Information</h2>
                        
                        <form onSubmit={ handleSubmit } className="space-y-4 flex flex-col gap-3">
                            {/* Document Category */}
                            <div>
                                <label htmlFor="documentType" className="text-sm font-medium text-gray-700">Document Type</label>
                                <select
                                    name="documentType"
                                    value={ docData.documentType }
                                    onChange={ e => setDocData({ ...docData, documentType: e.target.value }) }
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    {
                                        docTypeOpt.map((docType, index) => (
                                            <option key={ index } value={ docType }>
                                                { docType }
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>

                            {/* Document Type */}
                            <div>
                                <label htmlFor="documentCategory" className="text-sm font-medium text-gray-700">Document Category</label>
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
                                <button className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none" >Submit</button>
                            </div>
                        </form>
                    </div>
                }
            </div>

            <div className="flex flex-col items-center bg-gray rounded-lg py-8">
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
                                Document Type
                            </label>
            
                            <select onChange={ e => {
                                setDocType(e.target.value)
                
                                setShownShips(
                                    ships.filter(el => (
                                        el._id.includes(query) &&
                                        (docType.length !== 0 ? el.documentType === docType : true) &&
                                        (docCategory.length !== 0 ? el.documentCategory === docCategory : true)
                                    ))
                                )
                            }} className="w-full rounded-lg">
                                {
                                    docTypeOpt.map((docType, index) => (
                                        <option key={ index } value={ docType }>
                                            { docType }
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
            
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Document Category
                            </label>
            
                            <select onChange={ e => {
                                setDocCategory(e.target.value)
                
                                setShownShips(
                                    ships.filter(el => (
                                        el._id.includes(query) &&
                                        (docType.length !== 0 ? el.documentType === docType : true) &&
                                        (docCategory.length !== 0 ? el.documentCategory === docCategory : true)
                                    ))
                                )
                            }} className="w-full rounded-lg">
                                <option value="financial">Financial</option>
                                <option value="operational">Operational</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="mt-8 w-full px-3" style={{ maxWidth: "1000px" }}>
                    <button
                        className="w-full bg-lightBlue-500 text-white py-2 px-6 rounded shadow-md"
                        onClick={() => {
                            setFloatingTab('addShip')

                            document.querySelector("body").style.overflow = "hidden"
                            document.getElementById("window-wrapper").style.display = "flex"

                            setTimeout(() => {
                            document.getElementById("window-wrapper").style.opacity = "1"
                            }, 1);
                        }}
                    >Add Shipment</button>
                </div>
        
                <div className="px-3 w-full flex justify-center mt-8">
                    <div style={{ width: "1000px" }}>
                        {shownShips.length > 0 ? (
                            shownShips.map((shipment, index) =>
                                <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-8 flex flex-col">

                                    { getCard({ quote: shipment, index, to: ('/operationalOfficer/shipment/' + shipment._id) }) }

                                    <div className="border-1 border-gray-300 bg-black h-1 mx-4"></div>

                                    <button
                                        className="py-4 outline-none"

                                        onClick={() => {
                                            setFloatingTab('addDoc')

                                            setFocusShip(shipment);

                                            document.querySelector("body").style.overflow = "hidden"
                                            document.getElementById("window-wrapper").style.display = "flex"

                                            setTimeout(() => {
                                            document.getElementById("window-wrapper").style.opacity = "1"
                                            }, 1);
                                    }}>Add Document</button>

                                </div>
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