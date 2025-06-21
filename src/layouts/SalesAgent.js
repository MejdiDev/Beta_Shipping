import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Navbar from "components/Navbars/Navbar";
import Clientfooter from "components/Footers/FooterClient"

// views
import LeadsPage from "views/salesAgents/LeadsPage";
import SalesAgentDashboard from "views/salesAgents/SalesAgentDashboard";
import TasksPage from "views/salesAgents/TasksPage";
import ClientsPage from "views/salesAgents/ClientsPage";

import salesAgentRoutes from "../components/Navbars/navRoutes/salesAgent.json";
import SalesAgentNotifs from "views/salesAgents/SalesAgentNotifs";
import SalesAgentOffer from "views/salesAgents/SalesAgentOffer";


export default function SalesAgent() {
  return (
    <>
      <Navbar
        routes={ salesAgentRoutes }
      />

      <div className="relative bg-blueGray-100 mt-20 w-full">
        
        <div
        
        className="mx-auto w-full -m-24 py-8 pt-0">
          <Switch>
            <Route path="/salesAgent/" exact component={SalesAgentDashboard} />
            <Route path="/salesAgent/offer/:id" exact component={SalesAgentOffer} />
            <Route path="/salesAgent/notifications" exact component={SalesAgentNotifs} />
            
            <Route path="/salesAgent/leads" exact component={LeadsPage} />
            <Route path="/salesAgent/tasks" exact component={TasksPage} />
            <Route path="/salesAgent/clients" exact component={ClientsPage} />
           
          </Switch>

          <div className=" mt-20 w-full">
            <Clientfooter >

            </Clientfooter>
          </div>
        </div>
      </div>
    </>
  );
}