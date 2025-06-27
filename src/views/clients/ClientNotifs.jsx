import CardNotifs from "components/Cards/CardNotifs";
import { useEffect, useState } from "react";
import { getNotifs } from "services/ApiClient";

const ClientNotifs = () => {
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
        <div className="flex justify-center">
            <div className="py-8 w-full" style={{ maxWidth: "1300px", width: "calc(100dvw - 40px)" }}>
                <div className="container mx-auto pt-6 rounded-lg border-2 bg-white pt-4">
                    <div className="flex justify-between items-center border-b-2 px-6 pb-4">
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

                    <div style={{ backgroundColor: "#fcfdff" }} className="px-6 py-6 rounded-b-lg">
                        {
                            filteredNotifs.length > 0 ? 

                            <>
                                {
                                    filteredNotifs.map((notif, idx) => (
                                        <CardNotifs isFinal={idx === ( filteredNotifs.length - 1 )} key={notif._id} notification={notif} />
                                    ))
                                }
                            </>

                            :

                            <div className="col-span-full">
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                    <p className="text-red-600">No Notifications available.</p>
                                </div>
                            </div>

                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ClientNotifs;