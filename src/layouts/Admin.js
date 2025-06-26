import React from "react";
import { Switch, Route } from "react-router-dom";

import  { Toaster } from 'react-hot-toast';

// components

import FooterAdmin from "components/Footers/FooterAdmin.js";

// views
import Settings from "views/admin/Settings.js";
import Tables from "views/admin/Tables.js";
import AdminDashboard from "views/admin/AdminDashboard";

import Navbar from "components/Navbars/Navbar";
import adminRoutes from "../components/Navbars/navRoutes/adminRoutes.json";

export default function Admin() {
  return (
    <>
      <Toaster />

      <Navbar
        routes={ adminRoutes }
      />

      <div className="relative bg-blueGray-100 mt-20 w-full pb-0 h-full">
        
        <div className="mx-auto w-full -mt-24 py-8 pt-0 pb-0 h-full" style={{ minHeight: "100dvh" }}>
          <Switch>
            <Route path="/admin/" exact component={AdminDashboard} />

            <Route path="/admin/settings" exact component={Settings} />
            <Route path="/admin/tables" exact component={Tables} />
          </Switch>
        </div>

        <FooterAdmin />
      </div>
    </>
  );
}
