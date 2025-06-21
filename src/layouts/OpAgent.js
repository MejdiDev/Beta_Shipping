import React from "react";
import { Switch, Route } from "react-router-dom";

import opOfficerRoutes from "../components/Navbars/navRoutes/opOfficerRoutes.json";

// components
import Navbar from "components/Navbars/Navbar";
import Clientfooter from "components/Footers/FooterClient";

// views
import OpAgentDashboard from "views/opAgent/OpAgentDashboard";
import OpAgentShipments from "views/opAgent/OpAgentShipments";

export default function OpAgent() {
  return (
    <>
      <Navbar
        routes={ opOfficerRoutes }
      />

      <div className="relative  bg-blueGray-100 mt-20 w-full">
        
        <div className="mx-auto w-full -m-24 py-8">
          <Switch>

            <Route path="/operationalOfficer/" exact component={OpAgentDashboard} />
            <Route path="/operationalOfficer/shipments" exact component={OpAgentShipments} />
           
          </Switch>

          <div className=" mt-20 w-full">
            <Clientfooter />
          </div>
        </div>
        
      </div>
    </>
  );
  
}
