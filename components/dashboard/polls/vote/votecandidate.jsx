/* eslint-disable @next/next/no-img-element */
import { ArrowRight } from "lucide-react";
export default function VoteCandidate({ candidates, contestant }) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
        Select Your Candidate
      </h2>

      <div className="space-y-6">
        {candidates.map((candidate) => (
          <div
            key={candidate._id}
            className="bg-white dark:bg-slate-800 rounded-2xl border-2 border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
          >
            <div className="p-6 sm:p-8">
              <div className="flex items-start gap-6">
                {/* Avatar */}
                {candidate?.userId?.image ? (
                  <img
                    src={candidate.userId.image}
                    alt={candidate?.userId?.name}
                    className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover border border-gray-200 dark:border-slate-700"
                  />
                ) : (
                  <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0">
                    {candidate?.userId?.name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || "?"}
                  </div>
                )}

                {/* Content */}
                <div className="flex-1 min-w-0 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                        {candidate?.userId?.name}
                      </h3>
                      <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 capitalize">
                        {contestant?.position}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
                        Name
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white">
                        {candidate?.userId?.name}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-600 dark:text-slate-400 mb-1">
                        Email
                      </p>
                      <p className="text-sm text-gray-900 dark:text-white break-all">
                        {candidate?.userId?.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-gray-700 dark:text-slate-300 leading-relaxed">
                    Candidate ID: {candidate?._id}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-slate-500">
                    Votes: {candidate?.votes ?? 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <button
          className="px-8 py-4 rounded-xl font-bold text-lg transition-all duration-200 flex items-center gap-3 bg-gray-200 dark:bg-slate-700 text-gray-400 dark:text-slate-500 cursor-not-allowed"
          title="Wire up your submit handler"
        >
          Submit Your Vote
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
