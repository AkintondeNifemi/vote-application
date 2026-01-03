import Link from "next/link";
import { ArrowRight, Clock, Users } from "lucide-react";
import { useEffect, useState } from "react";

export default function VoteTab({ pollData, poll, pollId }) {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const totalCandidates = positions.reduce(
    (sum, pos) => sum + (pos.candidates?.length || 0),
    0
  );
  useEffect(() => {
    async function fetchPositions() {
      setLoading(true);
      try {
        const request = await fetch(`/api/polls/${pollId}/contestant/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred.");
          setLoading(false);
          return setPositions([]);
        }
        setPositions(response?.contestant || []);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error("Network Error");
      }
    }
    fetchPositions();
  }, [pollId]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl p-4 sm:p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-1">
          Cast Your Votes
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-3">
          Choose a position to view candidates and submit your vote.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-700 dark:text-slate-300">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-slate-700">
            <Users className="h-4 w-4" />
            <span>
              {positions.length} position{positions.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-slate-700">
            <ArrowRight className="h-4 w-4" />
            <span>
              {totalCandidates} candidate{totalCandidates !== 1 ? "s" : ""}{" "}
              available
            </span>
          </div>
          {poll?.endDate && (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-slate-700">
              <Clock className="h-4 w-4" />
              <span>Closes {new Date(poll.endDate).toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>

      {positions.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-10 text-center">
          <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            No positions available yet
          </p>
          <p className="text-gray-600 dark:text-slate-400">
            Once positions are added, you can cast your vote here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {positions.map((position) => {
            const candidateCount = position.candidates?.length || 0;
            const href = `/polls/${position?.pollId || ""}/vote/${
              position._id
            }`;

            return (
              <div key={position._id} className="group">
                <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all duration-200 h-full">
                  <div className="p-5 sm:p-6 space-y-4 h-full flex flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white capitalize">
                          {position.position}
                        </h3>
                        {position.description && (
                          <p className="text-sm text-gray-600 dark:text-slate-400 mt-1 line-clamp-2">
                            {position.description}
                          </p>
                        )}
                      </div>
                      <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-slate-700 text-xs font-semibold text-gray-700 dark:text-slate-200">
                        {candidateCount} candidate
                        {candidateCount !== 1 ? "s" : ""}
                      </span>
                    </div>

                    {candidateCount === 0 && (
                      <p className="text-sm text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-lg px-3 py-2">
                        No candidates yet
                      </p>
                    )}

                    <Link
                      href={href}
                      className="mt-auto w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={candidateCount === 0}
                    >
                      {candidateCount === 0 ? "No candidates" : "Vote"}
                      {candidateCount > 0 && <ArrowRight className="h-4 w-4" />}
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Info Message */}
      <div className="bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl p-4">
        <p className="text-sm text-gray-700 dark:text-slate-300">
          You can vote once per position. Select a position to see its
          candidates.
        </p>
      </div>
    </div>
  );
}
