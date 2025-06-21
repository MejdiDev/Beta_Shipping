import CardNotifs from "components/Cards/CardNotifs";
import { useEffect, useState } from "react";
import { getNotifs } from "services/ApiSalesAgent";

const SalesAgentNotifs = () => {
    const [notifs, setNotifs] = useState([])

    const [filter, setFilter] = useState('all'); // 'all', 'read', or 'unread'
    const [filteredNotifs, setFilteredNotifs] = useState(notifs);

    const getData = () => {
        getNotifs()
            .then((response) => {
                setNotifs(response);
            })
            .catch((error) => {
                console.error("Error fetching quotes:", error);
            });
    }
    
    useEffect(() => {
        const filtered = notifs.filter((notif) => {
        if (filter === 'all') return true;
        return filter === 'read' ? notif.read : !notif.read;
        });
        setFilteredNotifs(filtered);
    }, [filter, notifs]);

    useEffect(() => {
        getData()
        localStorage.setItem("lastCheckedNotifs", new Date().toISOString())
    }, [])

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                <label htmlFor="filter" className="mr-2 text-gray-700">
                    Filter by Status:
                </label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="p-2 rounded-lg bg-white border border-gray-300"
                >
                    <option value="all">All</option>
                    <option value="unread">Unread</option>
                    <option value="read">Read</option>
                </select>
                </div>
                <i className="fas fa-filter text-gray-600 text-xl"></i>
            </div>

            <div>
                {filteredNotifs.map((notif) => (
                    <CardNotifs key={notif._id} notification={notif} userName={""} />
                ))}
            </div>
        </div>
    );
}

export default SalesAgentNotifs;