import React, { useState } from "react";

const Incentive = () => {
  const [incentives, setIncentives] = useState([
    {
      id: 1,
      recipient: "John Doe",
      region: "Asia",
      type: "Bonus",
      amount: 500,
      date: "2024-12-01",
      status: "Paid",
    },
  ]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [newIncentive, setNewIncentive] = useState({
    recipient: "",
    region: "",
    type: "Bonus",
    amount: "",
    date: "",
    status: "Unpaid",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewIncentive({ ...newIncentive, [name]: value });
  };

  const handleAddIncentive = () => {
    setIncentives([...incentives, { id: Date.now(), ...newIncentive }]);
    setNewIncentive({
      recipient: "",
      region: "",
      type: "Bonus",
      amount: "",
      date: "",
      status: "Unpaid",
    });
    setIsFormVisible(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incentives</h1>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
        onClick={() => setIsFormVisible(!isFormVisible)}
      >
        {isFormVisible ? "Close Form" : "Add New Incentive"}
      </button>

      {isFormVisible && (
        <div className="bg-gray-100 p-4 rounded shadow-md mb-6">
          <h2 className="text-xl font-bold mb-4">Add New Incentive</h2>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Recipient</label>
            <input
              type="text"
              name="recipient"
              value={newIncentive.recipient}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Region</label>
            <select
              name="region"
              value={newIncentive.region}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Region</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="America">America</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Incentive Type</label>
            <select
              name="type"
              value={newIncentive.type}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Bonus">Bonus</option>
              <option value="Reward">Reward</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Amount</label>
            <input
              type="number"
              name="amount"
              value={newIncentive.amount}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Date</label>
            <input
              type="date"
              name="date"
              value={newIncentive.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold">Status</label>
            <select
              name="status"
              value={newIncentive.status}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            >
              <option value="Unpaid">Unpaid</option>
              <option value="Paid">Paid</option>
            </select>
          </div>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleAddIncentive}
          >
            Submit
          </button>
        </div>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Recipient</th>
            <th className="border border-gray-300 p-2">Region</th>
            <th className="border border-gray-300 p-2">Type</th>
            <th className="border border-gray-300 p-2">Amount</th>
            <th className="border border-gray-300 p-2">Date</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {incentives.map((incentive) => (
            <tr key={incentive.id}>
              <td className="border border-gray-300 p-2">{incentive.recipient}</td>
              <td className="border border-gray-300 p-2">{incentive.region}</td>
              <td className="border border-gray-300 p-2">{incentive.type}</td>
              <td className="border border-gray-300 p-2">${incentive.amount}</td>
              <td className="border border-gray-300 p-2">{incentive.date}</td>
              <td className="border border-gray-300 p-2">{incentive.status}</td>
              <td className="border border-gray-300 p-2">
                <button className="text-green-500 mr-2">Edit</button>
                <button className="text-red-500">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Incentive;
