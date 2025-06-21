import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { formatDate } from "services/ApiQuote";
import { getPriorityColor } from "services/ApiSalesAgent";
import { getTasks } from "services/ApiSalesAgent";

export default function CardSocialTraffic() {
  const [tasks, setTasks] = useState([])
  
  useEffect(() => {
      getTasks()
        .then(response => setTasks(response.filter(el => el.status !== "completed")))
        .catch((error) => {
          console.error("Error requesting quote:", error);
          alert("Failed to request quote. Please try again.");
        });
  }, [])

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Pending Tasks
              </h3>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
              <Link to="/salesAgent/tasks">
                <button
                  className="bg-lightBlue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                >
                  See all
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="block w-full overflow-x-auto">
          <table className="items-center w-full bg-transparent border-collapse table-alt rounded-b-lg overflow-hidden">
            <thead className="thead-light">
              <tr>
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Title
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Priority
                </th>
                
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Due Date
                </th>
              </tr>
            </thead>

            <tbody>
              {
                tasks.map((task, index) => (
                  <tr key={index}>

                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-left">
                      { task.title }
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <p style={{ backgroundColor: getPriorityColor(task.priority), padding: "5px 10px", borderRadius: "1rem", width: "70px", textAlign: "center", color: "white" }}>{ task.priority }</p>
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { formatDate(task.dueDate) }
                    </td>

                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
