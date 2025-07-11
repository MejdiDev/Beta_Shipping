import React from "react";
import { Switch, Route } from "react-router-dom";

import  { Toaster } from 'react-hot-toast';

import opOfficerRoutes from "../components/Navbars/navRoutes/opOfficerRoutes.json";

// components
import Navbar from "components/Navbars/Navbar";
import Clientfooter from "components/Footers/FooterClient";

// views
import OpAgentDashboard from "views/opAgent/OpAgentDashboard";
import OpAgentShipments from "views/opAgent/OpAgentShipments";
import OpAgentShipmentPage from "views/opAgent/OpAgentShipmentPage";
import OpAgentTasks from "views/opAgent/OpAgentTasks";
import OpAgentNotifs from "views/opAgent/OpAgentNotifs";

export default function OpAgent() {
  return (
    <>
      <Toaster />

      <Navbar
        routes={ opOfficerRoutes }
      />

      <div className="relative  bg-blueGray-100 mt-20 w-full">
        
        <div className="mx-auto w-full -m-24">
          <Switch>

            <Route path="/operationalOfficer/" exact component={OpAgentDashboard} />
            <Route path="/operationalOfficer/tasks" exact component={OpAgentTasks} />

            <Route path="/operationalOfficer/notifications" exact component={OpAgentNotifs} />

            <Route path="/operationalOfficer/shipments" exact component={OpAgentShipments} />
            <Route path="/operationalOfficer/shipment/:id" exact component={OpAgentShipmentPage} />
            
          </Switch>

          <div className=" mt-20 w-full">
            <Clientfooter />
          </div>
        </div>
        
      </div>
    </>
  );
  
}
