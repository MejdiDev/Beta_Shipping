import CardTable from "components/Cards/CardTable";
import HeaderStats from "components/Headers/HeaderStats";
import { useEffect, useState } from "react";
import { getLeadColor } from "services/ApiSalesAgent";
import { getAgentLeads } from "services/ApiSalesAgent";

const LeadsPage = () => {
    const [leads, setLeads] = useState([])

    const getData = () => {
        getAgentLeads()
            .then((response) => {
                setLeads(response);
            })
            .catch((error) => {
                console.error("Error fetching quotes:", error);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="flex flex-col flex-wrap mt-4">
                <HeaderStats
                    stats={[
                        { bg: "#3fccc1", num: leads.filter(el => el.status === "new").length, title: "New", icon: "fa fa-plus"},
                        { bg: "#fe9a3b", num: leads.filter(el => el.status === "qualified").length, title: "Qualified", icon: "fa fa-check"},
                        { bg: "#374658", num: leads.filter(el => el.status === "contacted").length, title: "Contacted", icon: "fa fa-phone"},
                        { bg: "#f44336", num: leads.filter(el => el.status === "lost").length, title: "Lost", icon: "fa fa-times"}
                    ]}
                />

                <div className="w-full mb-12 -mt-24 flex justify-center" style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
                    <CardTable
                        model="Lead"
                        editable={ true }
                        
                        leads={ leads }
                        getData={ getData }

                        fields={[
                            "name",
                            "email",
                            "phone",
                            
                            {
                                label: "status",
                                colorFct: getLeadColor
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default LeadsPage;