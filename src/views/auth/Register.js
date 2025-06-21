import React, { useState } from "react";
import { addUser } from "services/ApiUser"; // Update path as needed


export default function Register() {
  // Initialize user state with empty object
  const [user, setUser] = useState({
    name: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: ""
  });

  // Add these missing state declarations
  const [loading, setLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState(null); // eslint-disable-line no-unused-vars

  // Handle input changes
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    
    try {
      // Basic validation
      if (!user.name || !user.email || !user.password) {
        setError("Please fill in all required fields");
        return;
      }

      if (user.password !== user.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      if (!agreeToTerms) {
        setError("Please agree to the Privacy Policy");
        return;
      }

      setLoading(true);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = user;
      await addUser(userData);
      
      // Success handling
      alert("Registration successful!");
      
      // Reset form
      setUser({
        name: "",
        last: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "client"
      });
      setAgreeToTerms(false);
      
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="text-red-500 text-center mb-3 font-semibold">
          {error}
        </div>
      )}

      <div className="flex gap-4">
        {/* First Name Input */}
        <div className="flex-1 inline-block ">
          <label
            className="flex text-sky-blue  text-sm font-bold  mt-2 "
            htmlFor="name"
          >
            First Name
          </label>
          <input
            value={ user.name }
            onChange={ handleChange }

            type="text"
            name="name"
            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="First Name"
            required
          />
        </div>

        {/* Last Name Input */}
        <div className="flex-1 inline-block">
          <label
            className="flex text-sky-blue text-sm font-bold  mt-2 "
            htmlFor="last"
          >
            Last Name
          </label>
          <input
            value={ user.last }
            onChange={ handleChange }

            type="text"
            name="last"
            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="Last Name"
          />
        </div>
      </div>

      <div className="flex">

        <div className="flex-1 inline-block pr-4">
          <label
            className="block uppercase text-sky-blue text-xs font-bold mt-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            value={ user.email }
            onChange={ handleChange }

            type="email"
            name="email"
            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="Email"
            required
          />
        </div>

        <div className="flex-1 inline-block ">
          <label
            className="flex uppercase text-sky-blue text-xs font-bold  mt-2"
            htmlFor="phone"
          >
            Phone Number
          </label>
          <input
            value={ user.phone }
            onChange={ handleChange }

            type="text"
            name="phone"
            className="mt-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="Phone Number"
          />
        </div>
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-sky-blue text-xs font-bold  mt-3"
          htmlFor="password"
        >
          Password
        </label>
        <input
          value={ user.password }
          onChange={ handleChange }

          type="password"
          name="password"
          className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
          placeholder="Password"
          required
        />
      </div>

      <div className="relative w-full mb-3">
        <label
          className="block uppercase text-sky-blue text-xs font-bold  mt-3"
          htmlFor="confirmPassword"
        >
          Confirm Password
        </label>
        <input
          value={ user.confirmPassword }
          onChange={ handleChange }

          type="password"
          name="confirmPassword"
          className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
          placeholder="Confirm Password"
          required
        />
      </div> {/* Phone Input - NEW */}
      

      <div>
        <label className="inline-flex items-center cursor-pointer">
          <input
            id="customCheckLogin"
            type="checkbox"
            className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150 bg-gray border border-gray-300"

            style={{ cursor: "pointer" }}

            value={ agreeToTerms }
            onChange={ e => setAgreeToTerms(!agreeToTerms) }
          />
          <span className="ml-2 text-sm font-semibold text-blueGray-600">
            I agree with the{" "}
            <a
              href="#pablo"
              className="text-lightBlue-500"
              onClick={(e) => e.preventDefault()}
            >
              Privacy Policy
            </a>
          </span>
        </label>
      </div>

      <div className="text-center mt-6">
        <button
          className="bg-lightBlue-500 text-white active:bg-lightBlue-600 text-sm font-bold uppercase px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150 disabled:opacity-50"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>
    </form>
  );
}
