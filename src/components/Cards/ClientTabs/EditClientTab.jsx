const EditClientTab = ({ formData={ title: "", assignedTo: "", priority: "", status: "", dueDate: new Date(), description: "" }, setFormData, handleClose, EditLead, setFocusId, getData }) => {
    const formatInputDate = dateStr => {
        const dateObj = new Date(dateStr);
        const formattedDate = dateObj.toISOString().split('T')[0];

        return formattedDate;
    }
    return (
        <div className="bg-white rounded-lg shadow-lg p-6" style={{ width: "645px" }}>
            <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">Enter Lead Information</h2>
            
            <form className="space-y-4 flex flex-col gap-3">
                {/* {error && (
                    <div className="text-red-500 text-center mb-3 font-semibold">
                    {error}
                    </div>
                )} */}

                <div className="flex gap-4 mb-4">
                    {/* First Name Input */}
                    <div className="flex-1">
                        <label className="text-sky-blue text-sm font-bold mt-2" htmlFor="name">
                            First Name
                        </label>
                        <input
                            value={ formData.name }
                            onChange={ e => setFormData({ ...formData, name: e.target.value }) }
                            type="text"
                            name="name"
                            className="mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                            placeholder="First Name"
                            required
                        />
                    </div>

                    {/* Last Name Input */}
                    <div className="flex-1">
                        <label className="text-sky-blue text-sm font-bold mt-2" htmlFor="last">
                            Last Name
                        </label>
                        <input
                            value={ formData.last }
                            onChange={ e => setFormData({ ...formData, last: e.target.value }) }
                            type="text"
                            name="last"
                            className="mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                            placeholder="Last Name"
                        />
                    </div>
                </div>
                
                {/* Email Input */}
                <div>
                    <label className="block uppercase text-sky-blue text-xs font-bold mt-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        value={ formData.email }
                        onChange={ e => setFormData({ ...formData, email: e.target.value }) }
                        type="email"
                        name="email"
                        className="mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                        placeholder="Email"
                        required
                    />
                </div>

                {/* Phone Input */}
                <div>
                    <label className="block uppercase text-sky-blue text-xs font-bold mt-2" htmlFor="phone">
                        Phone Number
                    </label>
                    <input
                        value={ formData.phone }
                        onChange={ e => setFormData({ ...formData, phone: e.target.value }) }
                        type="text"
                        name="phone"
                        className="mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
                        placeholder="Phone Number"
                    />
                </div>
            </form>

            <div className="flex justify-end gap-4 mt-6">
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg bg-red-600 outline-none" onClick={() => handleClose()}>Cancel</button>
                <button className="bg-green-500 text-white px-4 py-2 rounded-lg bg-lightBlue-600 outline-none" onClick={() => {
                    EditLead(!formData.salesAgent ? { ...formData, salesAgent: localStorage.getItem(' formDataId') } : formData)
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

export default EditClientTab;