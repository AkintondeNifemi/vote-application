"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";

export default function VotersAddButton({ onAdd }) {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");

  const closeModal = () => {
    setOpen(false);
    setUserId("");
    setError("");
  };

  const handleSubmit = () => {
    if (!userId.trim()) {
      setError("User ID is required");
      return;
    }
    setError("");
    if (typeof onAdd === "function") {
      onAdd(userId.trim());
    }
    closeModal();
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-all flex items-center gap-2 w-full sm:w-auto justify-center shadow-sm hover:shadow"
      >
        <Plus className="h-4 w-4" />
        Add Voter
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur">
          <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 shadow-2xl p-6 sm:p-7 relative">
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Add Voter
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  Provide the user ID of the voter you want to include in this
                  poll.
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-gray-500 cursor-pointer hover:text-gray-800 dark:text-slate-400 dark:hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200">
                User ID
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-gray-900 dark:text-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g. 69541172141b7f27d67277d6"
              />
              {error && (
                <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                  {error}
                </p>
              )}
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-end gap-3 w-full">
              <button
                type="button"
                onClick={closeModal}
                className="w-full cursor-pointer sm:w-auto px-4 py-2 rounded-lg text-sm font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 border border-gray-200 dark:border-slate-700 text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full sm:w-auto px-5 cursor-pointer py-2 rounded-lg text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow text-center"
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
