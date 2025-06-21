import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AdminDashboard from "views/admin/AdminDashboard";

export default function Admin() {
  return (
    <>
      <div className="relative bg-blueGray-100">
        <AdminNavbar />
        
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route path="/admin/" exact component={AdminDashboard} />

            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}
