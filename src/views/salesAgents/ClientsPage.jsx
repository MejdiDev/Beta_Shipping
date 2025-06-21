import CardTable from "components/Cards/CardTable";
import HeaderStats from "components/Headers/HeaderStats";
import { useEffect, useState } from "react";
import { getClients } from "services/ApiSalesAgent";
import { getRoleColor } from "services/ApiSalesAgent";

const ClientsPage = () => {
    const [clients, setClients] = useState([])
        
    const getData = () => {
        getClients()
            .then((response) => {
                setClients(response)
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
                        // { bg: "#3fccc1", num: clients.filter(el => el.status === "pending").length, title: "Pending", icon: "fa fa-spinner"},
                        // { bg: "#fe9a3b", num: clients.filter(el => el.status === "in progress").length, title: "In Progress", icon: "fa fa-tasks"},
                        // { bg: "#f44336", num: clients.filter(el => el.status === "overdue").length, title: "Overdue", icon: "fa fa-exclamation-triangle"},
                        // { bg: "#374658", num: clients.filter(el => el.status === "completed").length, title: "Completed", icon: "fa fa-check"}
                    ]}
                />

                <div className="w-full mb-12 -mt-24 flex justify-center" style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
                    <CardTable
                        model="Client"
                        leads={ clients }

                        fields={[
                            "name",
                            "last",
                            "email",
                            "phone"
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default ClientsPage;