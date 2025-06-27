import { toastErr } from "services/ApiAll";
import { toastSucc } from "services/ApiAll";

const EditTab = ({ formData={ name: "", email: "", phone: "", status: "new" }, setFormData, handleClose, EditLead, setFocusId, getData }) => {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6 text-center" style={{ width: "645px" }}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Lead Information</h2>
            
            <form className="flex flex-col gap-3">
                <div className="flex gap-4">
                    <div className="flex-1">
                        <label for="name" className="block text-left text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required

                            value={ formData.name }
                            onChange={ e => setFormData({ ...formData, name: e.target.value }) }
                        />
                    </div>
                    
                    <div className="flex-1">
                        <label for="email" className="block text-left text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                            required

                            value={ formData.email }
                            onChange={ e => setFormData({ ...formData, email: e.target.value }) }
                        />
                    </div>
                </div>

                <div>
                    <label for="phone" className="block text-left text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="Enter your phone number"
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        required

                        value={ formData.phone }
                        onChange={ e => setFormData({ ...formData, phone: e.target.value }) }

                        style={{ borderColor: "#71717a" }}
                    />
                </div>

                <div>
                    <label for="status" className="block text-left text-sm font-medium text-gray-700">Status</label>
                    <select
                        id="status"
                        name="status"
                        className="mt-1 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        required

                        value={ formData.status }
                        onChange={ e => setFormData({ ...formData, status: e.target.value }) }
                    >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>
                    </select>
                </div>
            </form>

            <div className="flex justify-end gap-4 mt-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none" onClick={() => {
                    EditLead(!formData.salesAgent ? { ...formData, salesAgent: localStorage.getItem('userId') } : formData)
                        .then(() => {
                            toastSucc("Edited Successfully !");
                            getData();
                        })
                        .catch((error) => {
                            toastErr(error.messsage);
                            console.error("Error fetching Notifications:", error);
                        });

                    handleClose()
                    setFocusId()
                }}>Submit</button>
            </div>
        </div>
    );
}

export default EditTab;