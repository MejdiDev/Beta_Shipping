import React, { useEffect, useState } from "react";

// components
import { getClients } from "services/ApiAdmin";

export default function AdminQuotesPage() {
  const [users, setUsers] = useState([]);

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
      
    </>
  );
}
