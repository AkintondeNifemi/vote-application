/* eslint-disable @next/next/no-img-element */
import { Plus, Edit, Trash2, Mail, Building } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CandidatesTab({ pollData, poll, pollId }) {
  const [candidates, setCandidate] = useState([]);
  useEffect(() => {
    async function fetchCandidates() {
      try {
        const request = await fetch(
          `/api/polls/${pollId}/contestant/candidate`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred");
          return setCandidate([]);
        }
        setCandidate(response?.candidate);
      } catch (err) {
        console.log(err);
        toast.error("Network Error");
        return setCandidate([]);
      }
    }
    fetchCandidates();
  }, [pollId]);
  return (
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
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                {candidate?.userId?.image ? (
                  <img
                    src={candidate?.userId?.image}
                    className="h-12 w-12 rounded-full border-gray-600 dark:border-white border "
                    alt={candidate?.userId?.name}
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0">
                    {candidate?.userId?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                )}
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {candidate?.userId?.name}
                  </h3>
                  <p className="text-sm capitalize text-blue-600 dark:text-blue-400">
                    {candidate?.position}
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
                  {candidate?.userId?.email}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Building className="h-4 w-4 text-gray-500 dark:text-slate-500" />
                <p className="text-sm text-gray-600 dark:text-slate-400">
                  {candidate?.userId?.department || "No departement yet"}
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
  );
}
