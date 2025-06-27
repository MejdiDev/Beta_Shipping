import { toastErr } from "services/ApiAll";
import { toastSucc } from "services/ApiAll";

const DelTab = ({ handleClose, DeleteLead, focusId, setFocusId, getData }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg py-5 px-8 text-center" style={{ width: "645px" }}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Important Alert</h2>
          <p className="text-gray-600 mb-6">This is a simple alert dialog with two buttons. You can choose to confirm or cancel.</p>
          <div className="flex justify-end gap-4">
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
            <button onClick={ () => {
              DeleteLead(focusId)
                .then(() => {
                  toastSucc("Deleted Successfully !");
                  getData()
                })
                .catch((error) => {
                    toastErr(error.messsage);
                    console.error("Error fetching Notifications:", error);
                });

              handleClose()
              setFocusId()
            } } className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none">Confirm</button>
          </div>
        </div>
    );
}

export default DelTab;