import CardPageShipments from "components/Cards/CardPageShipments";
import CardTasksOpAgent from "components/Cards/CardTasksOpAgent";
import HeaderStats from "components/Headers/HeaderStats";
import { useEffect, useState } from "react";
import { getShipments } from "services/ApiOperationalOfficer";

const OpAgentDashboard = () => {
    const [quotes, setQuotes] = useState([])
    
    useEffect(() => {
        getShipments()
            .then((response) => {
                setQuotes(response);
            })
            .catch((error) => {
                console.error("Error fetching quotes:", error);
            });
    }, [])

    return (
        <>
            <div className="relative bg-blueGray-100">
                <HeaderStats
                    stats={[
                        { bg: "#3fccc1", num: quotes.filter(el => el.status === "active").length, title: "Active", icon: "fa fa-file"},
                        { bg: "#fe9a3b", num: quotes.filter(el => el.status === "accepted").length, title: "Accepted", icon: "fa fa-check"},
                        { bg: "#374658", num: quotes.filter(el => el.status === "delivered").length, title: "Delivered", icon: "fa fa-box"},
                        { bg: "#f44336", num: quotes.filter(el => el.status === "rejected").length, title: "Rejected", icon: "fa fa-times"}
                    ]}
                />

                <div className="px-4 md:px-10 mx-auto w-full -m-24 mb-24">
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <CardPageShipments />
                        </div>

                        <div className="w-full xl:w-4/12 px-4">
                            <CardTasksOpAgent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OpAgentDashboard;