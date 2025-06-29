import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { formatDate } from "services/ApiQuote";
import { getPriorityColor } from "services/ApiSalesAgent";
import { getClients } from "services/ApiAdmin";
import { getRoleColor } from "services/ApiAdmin";
import { getRoleLabel } from "services/ApiAdmin";

export default function CardPageUsers() {
  const [users, setUsers] = useState([])
  
  useEffect(() => {
      getClients()
        .then(response => {
            setUsers(response.slice(0, 5))
        })
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
                Manage Users
              </h3>
            </div>
            <div className="relative w-full max-w-full flex-grow flex-1 text-right">
              <Link to="/admin/users">
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
                  Name
                </th>

                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Email
                </th>
                
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Phone
                </th>
                
                <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {
                users.map((user, index) => (
                  <tr key={index}>

                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-left">
                      { user.name + (user.last || "") }
                    </th>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { user.email }
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      { user.phone }
                    </td>

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <p style={{ backgroundColor: getRoleColor(user.role), padding: "5px 10px", borderRadius: "1rem", width: "100px", textAlign: "center", color: "white" }}>{ getRoleLabel(user.role) }</p>
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