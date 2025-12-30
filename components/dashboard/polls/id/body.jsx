"use client";

import { useState } from "react";
import {
  UserPlus,
  UserX,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  Mail,
  Building,
} from "lucide-react";
import PollsIdBodyTabs from "./tabs";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function PollsIdBody({ pollData }) {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <>
      <PollsIdBodyTabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Poll Timeline */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Poll Timeline
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
                    Start Date
                  </p>
                  <p className="text-base text-gray-900 dark:text-white font-medium">
                    {formatDate(pollData.startDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600 dark:text-slate-400 mb-2">
                    End Date
                  </p>
                  <p className="text-base text-gray-900 dark:text-white font-medium">
                    {formatDate(pollData.endDate)}
                  </p>
                </div>
              </div>
            </div>

            {/* Voting Rules */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Voting Rules
              </h2>
              <div className="space-y-4">
                {pollData.rules.emailPrefix && (
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        Email Domain
                      </p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {pollData.rules.emailPrefix}
                      </p>
                    </div>
                  </div>
                )}
                {pollData.rules.departmentCodes.length > 0 && (
                  <div className="flex items-start gap-3">
                    <Building className="h-5 w-5 text-purple-600 dark:text-purple-400 mt-0.5" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                        Allowed Departments
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {pollData.rules.departmentCodes.map((dept) => (
                          <span
                            key={dept}
                            className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full uppercase"
                          >
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Results Preview */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
                Current Results
              </h2>
              <div className="space-y-4">
                {pollData.candidates.map((candidate, index) => (
                  <div key={candidate.id}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl font-bold text-gray-400 dark:text-slate-600">
                          #{index + 1}
                        </span>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {candidate.name}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-slate-400">
                            {candidate.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
                          {candidate.votes}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-slate-500">
                          {candidate.percentage}%
                        </p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div
                        className="bg-linear-to-r from-blue-600 to-blue-500 h-2 rounded-full transition-all"
                        style={{ width: `${candidate.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === "candidates" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Manage Candidates
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <Plus className="h-4 w-4" />
                Add Candidate
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {pollData.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4">
                      <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                        {candidate.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {candidate.name}
                        </h3>
                        <p className="text-sm text-blue-600 dark:text-blue-400">
                          {candidate.role}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <Edit className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                      </button>
                      <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                        <Trash2 className="h-4 w-4 text-red-600 dark:text-red-400" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-500 dark:text-slate-500" />
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {candidate.email}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-gray-500 dark:text-slate-500" />
                      <p className="text-sm text-gray-600 dark:text-slate-400">
                        {candidate.department}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-600 dark:text-slate-400">
                        Current Votes
                      </span>
                      <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                        {candidate.votes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Voters Tab */}
        {activeTab === "voters" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Manage Voters
              </h2>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
                <Plus className="h-4 w-4" />
                Add Voter
              </button>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 overflow-hidden">
              <div className="overflow-x-auto -mx-4 sm:mx-0">
                <div className="inline-block min-w-full align-middle">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-slate-700/50 border-b border-gray-200 dark:border-slate-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                          Voter
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                          Department
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                          Voted At
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-bold text-gray-600 dark:text-slate-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                      {pollData.voters.map((voter) => (
                        <tr
                          key={voter.id}
                          className="hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors"
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <p className="font-semibold text-gray-900 dark:text-white">
                                {voter.name}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-slate-400">
                                {voter.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2.5 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full uppercase">
                              {voter.department}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {voter.blocked ? (
                              <span className="px-2.5 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                                <UserX className="h-3 w-3" />
                                Blocked
                              </span>
                            ) : voter.voted ? (
                              <span className="px-2.5 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                                <CheckCircle className="h-3 w-3" />
                                Voted
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 text-xs font-semibold rounded-full">
                                Pending
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-slate-400">
                            {voter.votedAt ? formatDate(voter.votedAt) : "—"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!voter.blocked ? (
                                <button className="p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                  <UserX className="h-4 w-4 text-red-600 dark:text-red-400" />
                                </button>
                              ) : (
                                <button className="p-2 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors">
                                  <UserPlus className="h-4 w-4 text-green-600 dark:text-green-400" />
                                </button>
                              )}
                              <button className="p-2 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                <Trash2 className="h-4 w-4 text-gray-600 dark:text-slate-400" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              Poll Settings
            </h2>

            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
                General Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                    Poll Title
                  </label>
                  <input
                    type="text"
                    value={pollData.title}
                    readOnly
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                    Description
                  </label>
                  <textarea
                    value={pollData.description}
                    readOnly
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 dark:text-slate-200 mb-2">
                    Status
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-xl bg-white dark:bg-slate-700/50 text-gray-900 dark:text-white">
                    <option value="Active">Active</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded-2xl p-4 sm:p-6">
              <h3 className="text-lg font-bold text-red-900 dark:text-red-300 mb-2">
                Danger Zone
              </h3>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                These actions are permanent and cannot be undone.
              </p>
              <button className="px-4 py-2 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white font-semibold rounded-lg transition-colors">
                Delete Poll
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
