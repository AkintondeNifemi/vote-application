import { useState } from "react";
import { UserPlus } from "lucide-react";
export default function AddVoters() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newVoterEmail, setNewVoterEmail] = useState("");
  return (
    <>
      <button
        onClick={() => setShowAddModal(true)}
        className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold text-sm transition-colors shadow-sm"
      >
        <UserPlus className="h-4 w-4" />
        Add User
      </button>
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg max-w-md w-full">
            <div className="p-6 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                Add New Voter
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={newVoterEmail}
                  onChange={(e) => setNewVoterEmail(e.target.value)}
                  placeholder="voter@example.com"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition"
                />
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 dark:border-slate-700 flex gap-3 justify-end">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewVoterEmail("");
                }}
                className="px-4 py-2 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-slate-300 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  // Handle add user logic here
                  console.log("Adding voter:", newVoterEmail);
                  setShowAddModal(false);
                  setNewVoterEmail("");
                }}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-colors"
              >
                Add Voter
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
