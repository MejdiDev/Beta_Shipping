import CardTable from "components/Cards/CardTable";
import HeaderStats from "components/Headers/HeaderStats";
import { useEffect, useState } from "react";
import { formatDate } from "services/ApiQuote";
import { getTasks } from "services/ApiSalesAgent";
import { getTaskColor } from "services/ApiSalesAgent";
import { getPriorityColor } from "services/ApiSalesAgent";

const TasksPage = () => {
    const [tasks, setTasks] = useState([])
    
    const getData = () => {
        getTasks()
            .then((response) => {
                setTasks(response.map(el => {
                    return { ...el, "assigned to": el.assignedTo.name + " " + el.assignedTo.last}
                }));
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
                        { bg: "#3fccc1", num: tasks.filter(el => el.status === "pending").length, title: "Pending", icon: "fa fa-spinner"},
                        { bg: "#fe9a3b", num: tasks.filter(el => el.status === "in progress").length, title: "In Progress", icon: "fa fa-tasks"},
                        { bg: "#f44336", num: tasks.filter(el => el.status === "overdue").length, title: "Overdue", icon: "fa fa-exclamation-triangle"},
                        { bg: "#374658", num: tasks.filter(el => el.status === "completed").length, title: "Completed", icon: "fa fa-check"}
                    ]}
                />

                <div className="w-full mb-12 -mt-24 flex justify-center" style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
                    <CardTable
                        model="Task"
                        editable={ true }

                        leads={ tasks }
                        getData={ getData }

                        fields={[
                            "title",
                            "assigned to",

                            {
                                label: "priority",
                                colorFct: getPriorityColor
                            },

                            {
                                label: "dueDate",
                                formatFct: formatDate
                            },
                            
                            {
                                label: "status",
                                colorFct: getTaskColor
                            },
                        ]}
                    />
                </div>
            </div>
        </>
    );
}

export default TasksPage;