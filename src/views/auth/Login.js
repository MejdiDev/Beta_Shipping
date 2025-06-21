import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { loginUser } from "services/ApiUser";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await loginUser({ email, password });
      
      localStorage.setItem("userId", res.user._id);
      localStorage.setItem("lastCheckedNotifs", new Date().toISOString());

      //Redirect based on user role
      switch (res.user.role) {
        case "client":
          history.push("/client/clientpage");
          break;
        case "admin":
          history.push("/admin");
          break;
        case "salesAgent":
          history.push("/salesAgent");
          break;
        case "financialOfficer":
          history.push("/financialOfficer");
          break;
        case "operationalOfficer":
          history.push("/operationalOfficer");
          break;
        default:
          alert("Role not recognized");
      }
    } catch (error) {
      setError(error.message || "Login failed, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-auto">
      <form onSubmit={handleLogin}>
        {error && (
          <div className="text-red-500 text-center mb-3 font-semibold">
            {error}
          </div>
        )}
        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold  mt-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="relative w-full mb-3">
          <label
            className="block uppercase text-blueGray-600 text-xs font-bold  mt-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="mt-1 rounded-lg  border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 w-full"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="text-center mt-6">
          <button
            className="bg-lightBlue-500 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded-lg shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
