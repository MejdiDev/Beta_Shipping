import CardPageVisits from "components/Cards/CardPageVisits";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";
import HeaderStats from "components/Headers/HeaderStats";
import { useEffect, useState } from "react";
import { getQuotes } from "services/ApiSalesAgent";

const SalesAgentDashboard = () => {
    const [quotes, setQuotes] = useState([])

    useEffect(() => {
        getQuotes()
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
                        { bg: "#374658", num: quotes.length, title: "Total", icon: "fa fa-box"},
                        { bg: "#3fccc1", num: quotes.filter(el => el.status === "pending").length, title: "Pending", icon: "fa fa-file"},
                        { bg: "#fe9a3b", num: quotes.filter(el => el.status === "quoted").length, title: "Accepted", icon: "fa fa-check"},
                        { bg: "#f44336", num: quotes.filter(el => el.status === "rejected").length, title: "Rejected", icon: "fa fa-times"}
                    ]}
                />

                <div className="px-4 md:px-10 mx-auto w-full -m-24 mb-24">
                    <div className="flex flex-wrap mt-4">
                        <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                            <CardPageVisits />
                        </div>

                        <div className="w-full xl:w-4/12 px-4">
                            <CardSocialTraffic />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SalesAgentDashboard;