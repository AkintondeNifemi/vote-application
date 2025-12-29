"use client";

import { Plus, Calendar, FileText, Settings } from "lucide-react";

export default function CreatePollPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700 px-6 py-12 sm:py-16 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-600 dark:bg-blue-700 text-white">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Create a New Poll
              </h1>
            </div>
          </div>
          <p className="text-gray-600 dark:text-slate-400 text-base leading-relaxed max-w-2xl">
            Set up your poll by providing a clear title, detailed description,
            defining the voting timeline, and configuring access rules to
            control participation.
          </p>
        </div>
      </div>

      <div className="px-6 py-12 bg-white dark:bg-slate-950 transition-colors">
        <div className="max-w-3xl mx-auto">
          <form className="space-y-6">
            {/* Poll Details Section */}
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                  <FileText className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Poll Details
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Poll Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="What should be our Q1 priority?"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    placeholder="Provide context and details about this poll..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent resize-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Timeline Section */}
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400">
                  <Calendar className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Timeline
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Access & Settings Section */}
            <div className="bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-7">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                  <Settings className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Access & Settings
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Email Prefix{" "}
                    <span className="text-gray-500 dark:text-slate-500 font-normal text-xs">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., @company.com"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
                    Restrict voting to specific email domains
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Department Codes{" "}
                    <span className="text-gray-500 dark:text-slate-500 font-normal text-xs">
                      (Optional)
                    </span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., eng, product, sales"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all"
                  />
                  <p className="text-xs text-gray-500 dark:text-slate-500 mt-2">
                    Comma-separated list of allowed departments
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-3">
                    Poll Status <span className="text-red-500">*</span>
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 focus:border-transparent transition-all">
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6">
              <button
                type="button"
                className="flex-1 px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-xl text-gray-700 dark:text-slate-300 font-semibold hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Create Poll
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
