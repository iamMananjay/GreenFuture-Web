import React, { useState } from "react";

const Regions = () => {
  const [regions, setRegions] = useState([
    {
      name: "Asia",
      companies: [{ name: "TechCorp", address: "Kathmandu, Nepal", industry: "Technology", contact: "1234567890", email: "info@techcorp.com", established: "2010", employees: "200" }],
    },
    {
      name: "Europe",
      companies: [{ name: "Innovate Ltd.", address: "London, UK", industry: "Finance", contact: "9876543210", email: "contact@innovate.com", established: "2005", employees: "500" }],
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [currentRegion, setCurrentRegion] = useState("");
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    address: "",
    industry: "",
    contact: "",
    email: "",
    established: "",
    employees: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCompanyDetails({ ...companyDetails, [name]: value });
  };

  const handleAddCompany = (e) => {
    e.preventDefault();
    setRegions((prev) =>
      prev.map((region) =>
        region.name === currentRegion
          ? { ...region, companies: [...region.companies, companyDetails] }
          : region
      )
    );
    setShowForm(false);
    setCompanyDetails({
      name: "",
      address: "",
      industry: "",
      contact: "",
      email: "",
      established: "",
      employees: "",
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Regions</h1>
      <div className="space-y-4">
        {regions.map((region) => (
          <div key={region.name} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{region.name}</h2>
            <ul className="list-disc pl-6">
              {region.companies.map((company, index) => (
                <li key={index}>
                  <strong>{company.name}</strong> - {company.address} <br />
                  <span className="text-gray-600 text-sm">
                    Industry: {company.industry}, Contact: {company.contact}, Email: {company.email}, Established: {company.established}, Employees: {company.employees}
                  </span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setCurrentRegion(region.name);
                setShowForm(true);
              }}
              className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
            >
              Add Company
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-bold mb-4">Add Company to {currentRegion}</h2>
            <form onSubmit={handleAddCompany}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={companyDetails.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={companyDetails.address}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="industry" className="block text-gray-700 mb-2">
                  Industry Type
                </label>
                <input
                  type="text"
                  id="industry"
                  name="industry"
                  value={companyDetails.industry}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="contact" className="block text-gray-700 mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  value={companyDetails.contact}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={companyDetails.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="established" className="block text-gray-700 mb-2">
                  Date Established
                </label>
                <input
                  type="date"
                  id="established"
                  name="established"
                  value={companyDetails.established}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="employees" className="block text-gray-700 mb-2">
                  Number of Employees
                </label>
                <input
                  type="number"
                  id="employees"
                  name="employees"
                  value={companyDetails.employees}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600 mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Add Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Regions;
