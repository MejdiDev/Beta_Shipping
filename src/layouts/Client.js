import React from "react";
import { Switch, Route } from "react-router-dom";

import  { Toaster } from 'react-hot-toast';

// components

import Navbar from "components/Navbars/Navbar";
import Clientfooter from "components/Footers/FooterClient"

// views
import clientpage from "views/clients/clientpage";
import Clientrequest from "views/clients/clientrequest";
import quotes from "views/clients/quotes";
import Shipments from "views/clients/Shipments";
import Documents from "views/clients/Documents";
import profileSettings from "views/clients/profileSettings";

import clientRoutes from "../components/Navbars/navRoutes/client.json";
import ClientOffer from "views/clients/ClientOffer";
import ClientNotifs from "views/clients/ClientNotifs";

export default function Client() {
  return (
    <>
      <Toaster />
      
      <Navbar
        routes={ clientRoutes }
      />

      <div className="relative  bg-blueGray-100 mt-20 w-full">
        
        <div className="mx-auto w-full -m-24">
          <Switch>

            <Route path="/client/" exact component={clientpage} />
            <Route path="/client/offer/:id" exact component={ClientOffer} />
            <Route path="/client/notifications" exact component={ClientNotifs} />

            <Route path="/client/clientrequest" exact component={Clientrequest} />

            <Route path="/client/quotes" exact component={quotes} />
            <Route path="/client/shipments" exact component={Shipments} />
            <Route path="/client/documents" exact component={Documents} />

            <Route path="/client/profile" exact component={profileSettings} />
           
          </Switch>
          <div className=" mt-20 w-full">
            <Clientfooter />
          </div>
        </div>
        
      </div>
      
      
    </>
  );
  
}
