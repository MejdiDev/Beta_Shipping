import { useEffect, useState } from "react";
import { getAllWithRole } from "services/ApiSalesAgent";

const EditTaskTab = ({ formData={ title: "", assignedTo: "", priority: "", status: "", dueDate: new Date(), description: "" }, setFormData, handleClose, EditLead, setFocusId, getData }) => {
    const [users, setUsers] = useState([]);
    
    const formatInputDate = dateStr => {
        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toISOString().split('T')[0];

        return formattedDate;
    }

    useEffect(() => {
        getAllWithRole()
            .then((response) => {
                setUsers(response);
            })
            .catch((error) => {
                console.error("Error fetching quotes:", error);
            });
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: "645px" }}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enter Lead Information</h2>
            
            <form className="space-y-4 flex flex-col gap-3">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value= {formData.title }
                        onChange={ e => setFormData({ ...formData, title: e.target.value }) }
                        placeholder="Enter the task title"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Assigned to */}
                <div>
                    <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-700">Assigned To</label>
                    <select
                        id="assignedTo"
                        name="assignedTo"
                        value={ formData.assignedTo }
                        onChange={ e => setFormData({ ...formData, assignedTo: e.target.value }) }
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select User</option>
                        {
                            users.map((user, index) => 
                                <option value={user._id}>{ user.name + (user.last ? user.last : "") }</option>
                            )
                        }
                    </select>
                </div>

                {/* Priority and Status */}
                <div className="flex gap-4">
                    {/* Priority */}
                    <div className="flex-1">
                        <label htmlFor="priority" className="text-sm font-medium text-gray-700">Priority</label>
                        <select
                            id="priority"
                            name="priority"
                            value={ formData.priority }
                            onChange={ e => setFormData({ ...formData, priority: e.target.value }) }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Priority</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex-1">
                        <label htmlFor="status" className="text-sm font-medium text-gray-700">Status</label>
                        <select
                            id="status"
                            name="status"
                            value={ formData.status }
                            onChange={ e => setFormData({ ...formData, status: e.target.value }) }
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Status</option>
                            <option value="pending">Pending</option>

                            <option value="in progress">In Progress</option>
                            <option value="overdue">Overdue</option>

                            <option value="completed">Completed</option>
                        </select>
                    </div>
                </div>

                {/* Due Date */}
                <div>
                    <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                    <input
                        type="date"
                        id="dueDate"
                        name="dueDate"

                        value={ formatInputDate(formData.dueDate) }
                        onChange={ e => setFormData({ ...formData, dueDate: e.target.value }) }

                        style={{ borderColor: "#71717a" }}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        name="description"
                        value={ formData.description }
                        onChange={ e => setFormData({ ...formData, description: e.target.value }) }
                        placeholder="Enter a detailed description"
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>
            </form>

            <div className="flex justify-end gap-4 mt-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none" onClick={() => {
                    EditLead(!formData.salesAgent ? { ...formData, salesAgent: localStorage.getItem('userId') } : formData)
                    .then(() => {
                        getData()
                    })

                    handleClose()
                    setFocusId()
                }}>Submit</button>
            </div>
        </div>
    );
}

export default EditTaskTab;