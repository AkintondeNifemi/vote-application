/* eslint-disable @next/next/no-img-element */
import LoadingSpinner from "@/components/loadingspinner";
import { Plus, Users, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function CandidatesTab({ pollData, poll, pollId }) {
  const [candidates, setCandidate] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchCandidates() {
      setLoading(true);
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
          setLoading(false);
          toast.error(response?.error || "An error occurred");
          return setCandidate([]);
        }
        setCandidate(response?.candidate);
        setLoading(false);
      } catch (err) {
        console.log(err);
        toast.error("Network Error");
        setLoading(false);
        return setCandidate([]);
      }
    }
    fetchCandidates();
  }, [pollId]);

  if (loading) return <LoadingSpinner />;
  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Candidates
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400">
            {candidates.length} candidate{candidates.length !== 1 ? "s" : ""}{" "}
            registered
          </p>
        </div>
        <button className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg hover:shadow-xl">
          <Plus className="h-5 w-5" />
          <span>Add Candidate</span>
        </button>
      </div>

      {/* Candidates List or Empty State */}
      {candidates.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 p-12 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gray-100 dark:bg-slate-700 mb-4">
            <Users className="h-8 w-8 text-gray-400 dark:text-slate-500" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No Candidates Yet
          </h3>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            Start adding candidates for your positions
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {candidates.map((candidate) => (
            <div
              key={candidate._id}
              className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col"
            >
              {/* Candidate Header */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-start gap-4">
                  {candidate?.userId?.image ? (
                    <img
                      src={candidate?.userId?.image}
                      className="h-14 w-14 rounded-full object-cover border border-gray-300 dark:border-slate-600 shrink-0"
                      alt={candidate?.userId?.name}
                    />
                  ) : (
                    <div className="h-14 w-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold shrink-0 text-sm">
                      {candidate?.userId?.name
                        ?.split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase() || "?"}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                      {candidate?.userId?.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-slate-400 capitalize truncate">
                      {candidate?.position}
                    </p>
                  </div>
                </div>
              </div>

              {/* Candidate Info */}
              <div className="px-6 py-4 space-y-3 flex-1">
                <div className="flex items-start gap-3">
                  <Mail className="h-4 w-4 text-gray-500 dark:text-slate-400 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-xs text-gray-500 dark:text-slate-500 uppercase font-semibold mb-1">
                      Email
                    </p>
                    <p className="text-sm text-gray-700 dark:text-slate-300 truncate break-all">
                      {candidate?.userId?.email}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 dark:text-slate-400 font-semibold uppercase mb-1">
                    Total Votes
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {candidate.votes || 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
