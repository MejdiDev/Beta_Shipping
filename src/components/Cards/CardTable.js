import { DeleteLead } from "services/ApiSalesAgent";

import { useState } from "react";
import DelTab from "./LeadTabs/DelTab";
import EditTab from "./LeadTabs/EditTab";
import { EditLead } from "services/ApiSalesAgent";
import { AddLead } from "services/ApiSalesAgent";
import { capitalizeWords } from "services/ApiQuote";
import EditTaskTab from "./TaskTabs/EditTaskTab";
import { AddTask } from "services/ApiSalesAgent";
import { DeleteTask } from "services/ApiSalesAgent";
import { EditTask } from "services/ApiSalesAgent";

import { EditClient } from "services/ApiSalesAgent";
import { AddClient } from "services/ApiSalesAgent";

import EditClientTab from "./ClientTabs/EditClientTab";


export default function CardTable({ model, leads, getData, fields, editable=false }) {
  let [focusId, setFocusId] = useState()
  let [tab, setTab] = useState()

  let [formData, setFormData] = useState()

  const handleDelete = id => {
    document.querySelector("body").style.overflow = "hidden"
    document.getElementById("window-wrapper").style.display = "flex"

    setTimeout(() => {
      document.getElementById("window-wrapper").style.opacity = "1"
    }, 1);

    setFocusId(id);
  }

  const handleEdit = lead => {
    document.querySelector("body").style.overflow = "hidden"
    document.getElementById("window-wrapper").style.display = "flex"

    setTimeout(() => {
      document.getElementById("window-wrapper").style.opacity = "1"
    }, 1);

    setFocusId(lead._id);
    setFormData(lead);
  }

  const handleClose = () => {
    document.getElementById("window-wrapper").style.opacity = "0"

    setTimeout(() => {
      document.getElementById("window-wrapper").style.display = "none"
      document.querySelector("body").style.overflow = "auto"
    }, 150);
  }

  return (
    <>
      <div
        id="window-wrapper"
        className="flex justify-center items-center"
        data-fixed="true"

        onClick={ e => {
          if(e.target.id !== "window-wrapper") return
          handleClose()
        }}
      >
        
        {
          tab && tab.includes("del_") &&
          <DelTab
            handleClose={ handleClose }
            DeleteLead={ tab === "del_lead" ? DeleteLead : DeleteTask }

            getData={ getData }

            focusId={ focusId }
            setFocusId={ setFocusId }
          />
        }

        {
          ( tab === "add_lead" || tab === "edit_lead" ) &&
          <EditTab
            handleClose={ handleClose }

            EditLead={ tab === "edit_lead" ? EditLead : AddLead }

            getData={ getData }
            
            setFocusId={ setFocusId }

            formData={ formData }
            setFormData={ setFormData }
          />
        }

        {
          ( tab === "add_task" || tab === "edit_task" ) &&
          <EditTaskTab
            handleClose={ handleClose }

            EditLead={ tab === "edit_task" ? EditTask : AddTask }

            getData={ getData }
            
            setFocusId={ setFocusId }

            formData={ formData }
            setFormData={ setFormData }
          />
        }

        {
          ( tab === "add_client" || tab === "edit_client" ) &&
          <EditClientTab
            handleClose={ handleClose }

            EditLead={ tab === "edit_task" ? EditClient : AddClient }

            getData={ getData }
            
            setFocusId={ setFocusId }

            formData={ formData }
            setFormData={ setFormData }
          />
        }
      </div>
      
      <div
        className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg pt-4"
      >
        <div className="flex justify-between items-center w-full mb-4 px-6">
          <h2 className="text-xl font-semibold">Manage { model + "s" }</h2>
          { editable &&
            <button onClick={() => {
              setTab("add_" + model.toLowerCase())
              setFormData()

              document.querySelector("body").style.overflow = "hidden"
              document.getElementById("window-wrapper").style.display = "flex"

              setTimeout(() => {
                document.getElementById("window-wrapper").style.opacity = "1"
              }, 1);
            }} className="text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none">Add { model }</button>
          }
        </div>

        <div className="block w-full flex justify-center">
          <table className="table-alt items-center w-full bg-transparent border-collapse shadow-lg rounded-xl overflow-hidden">
            <thead>
              <tr>
                {
                  fields.map((field, index) => (
                    field.label ?

                    <th key={index} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      { field.label }
                    </th>

                    :

                    <th key={index} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                      { field }
                    </th>
                  ))
                }

                <th
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-blueGray-50 text-blueGray-500 border-blueGray-100">
                  Actions
                </th>
              </tr>
            </thead>
            
            <tbody className="bg-white">
              
              {
                leads.map((lead, index) => (
                  <tr key={index}>
                    {
                      fields.map((field, index) => (
                        index === 0 ? 

                        <th key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4 text-left flex items-center">
                          <span className="ml-3 font-bold text-blueGray-600" >
                            { lead[field] }
                          </span>
                        </th>

                        :

                        ((typeof field === 'object' && field !== null && !Array.isArray(field)) ?
                          <td className={"border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 " + (field.colorFct && "text-white")}>
                            <p style={{ backgroundColor: (field.colorFct && field.colorFct(lead[field.label])), padding: "5px 10px", borderRadius: "1rem", width: "100px", textAlign: "center" }}>{ capitalizeWords( field.formatFct ? field.formatFct(lead[field.label]) : lead[field.label] ) }</p>
                          </td>

                          :

                          <td key={index} className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                            { lead[field] }
                          </td>
                        )
                      ))
                    }

                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-md whitespace-nowrap p-4">
                      { editable &&

                        <div className="flex gap-3">
                          <button className="flex-1 outline-none" onClick={() => {
                            setTab("edit_" + model.toLowerCase())
                            handleEdit(lead)
                          }}>
                            <i className="fa fa-pen" aria-hidden="true" style={{ color: "#3fccc1", fontSize: "25px" }}></i>
                          </button>

                          <button className="flex-1 outline-none" onClick={() => {
                            setTab("del_" + model.toLowerCase())
                            handleDelete(lead._id)
                          }}>
                            <i className="fa fa-trash" aria-hidden="true" style={{ color: "#f44336", fontSize: "25px" }}></i>
                          </button>
                        </div>
                      }

                      {
                        !editable &&
                        <button className="flex-1 outline-none" >
                          <i className="fa fa-info-circle" style={{ color: "#374658", fontSize: "25px" }}></i>
                        </button>
                      }
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
