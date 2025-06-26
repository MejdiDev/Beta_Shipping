import React, { useEffect, useState } from "react";

// components
import { getClients } from "services/ApiAdmin";
import CardTable from "components/Cards/CardTable";
import HeaderStats from "components/Headers/HeaderStats";
import { getRoleColor } from "services/ApiAdmin";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  const getRoleLabel = role => {
    switch(role) {
      case "client":
        return "Client"

      case "salesAgent":
        return "Sales"

      case "operationalOfficer":
        return "Operations"

      case "Manager":
        return "Manager"

      default:
        return role
    }
  }

  const getData = () => {
    getClients()
      .then((response) => {
          setUsers(response);
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
      <div className="relative bg-blueGray-100">
        <HeaderStats
            stats={[
                { bg: "#3fccc1", num: users.filter(el => el.role === "client").length, title: "Clients", icon: "fa fa-file"},
                { bg: "#fe9a3b", num: users.filter(el => el.role === "salesAgent").length, title: "Accepted", icon: "fa fa-check"},
                { bg: "#374658", num: users.filter(el => el.role === "operationalOfficer").length, title: "Officers", icon: "fa fa-box"},
                { bg: "#f44336", num: users.filter(el => el.role === "manager").length, title: "Managers", icon: "fa fa-times"}
              ]}
        />

        <div className="w-full mb-12 -mt-24 flex justify-center" style={{ paddingLeft: "3.5rem", paddingRight: "3.5rem" }}>
            <CardTable
                model="User"
                editable={ true }

                leads={ users }
                getData={ getData }

                fields={[
                    "name",
                    "email",
                    "phone",

                    {
                      label: "role",
                      formatFct: getRoleLabel,
                      colorFct: getRoleColor
                    }
                ]}
            />
        </div>
      </div>
    </>
  );
}
