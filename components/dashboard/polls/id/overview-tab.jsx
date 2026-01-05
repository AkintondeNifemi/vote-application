/* eslint-disable @next/next/no-img-element */
import { Award, Crown, Users } from "lucide-react";

export default function OverviewTab({ poll }) {
  const userMap = (poll?.voters || []).reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});

  const positionsData = (poll?.contestants || []).map((contestant) => {
    const enrichedCandidates = (contestant.candidates || [])
      .map((candidate) => ({
        ...candidate,
        name: userMap[candidate.userId]?.name || "Unknown",
        email: userMap[candidate.userId]?.email || "N/A",
        image: userMap[candidate.userId]?.image || null,
        department: userMap[candidate.userId]?.department || null,
        faculty: userMap[candidate.userId]?.faculty || null,
      }))
      .sort((a, b) => b.votes - a.votes);

    return {
      ...contestant,
      candidates: enrichedCandidates,
      totalVotes: enrichedCandidates.reduce((sum, c) => sum + c.votes, 0),
    };
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
        Poll Overview
      </h2>

      <div className="space-y-6">
        {positionsData.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm p-12">
            <div className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="h-20 w-20 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                  <Award className="h-10 w-10 text-gray-400 dark:text-slate-500" />
                </div>
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  No Positions Added Yet
                </h3>
                <p className="text-gray-600 dark:text-slate-400 max-w-md mx-auto">
                  Create positions for this poll to start adding candidates and
                  collecting votes.
                </p>
              </div>
            </div>
          </div>
        ) : (
          positionsData.map((position) => {
            const topThree = position.candidates.slice(0, 3);

            return (
              <div
                key={position._id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                <div className="bg-gray-50 dark:bg-slate-800 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3 mb-2 capitalize">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-indigo-600 flex items-center justify-center shrink-0">
                          <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className="truncate">{position.position}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 ml-10 sm:ml-13 line-clamp-2">
                        {position.description}
                      </p>
                    </div>
                    {/* <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex-1 sm:flex-initial min-w-0">
                        <span className="text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide whitespace-nowrap">
                          Candidates
                        </span>
                        <span className="font-bold text-indigo-900 dark:text-indigo-100 text-base sm:text-lg">
                          {position.candidates.length}
                        </span>
                      </div>
                    </div> */}
                  </div>
                </div>

                <div className="p-6 bg-gray-50/50 dark:bg-slate-900/30 space-y-4">
                  {position.candidates.length === 0 ? (
                    <div className="py-10 text-center bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600">
                      <Users className="h-12 w-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-gray-700 dark:text-slate-200 font-semibold text-base">
                        No candidates added yet
                      </p>
                      <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
                        Add candidates to see them here.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {topThree.map((candidate, idx) => (
                          <div
                            key={candidate._id}
                            className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 shadow-xs"
                          >
                            {candidate.image ? (
                              <img
                                src={candidate.image}
                                alt={candidate.name}
                                className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl object-cover border border-gray-200 dark:border-slate-600"
                              />
                            ) : (
                              <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-semibold text-lg sm:text-xl">
                                {candidate.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white truncate">
                                  {candidate.name}
                                </span>
                              </div>
                              <div className="space-y-1 text-xs text-gray-600 dark:text-slate-300">
                                <div className="flex gap-1">
                                  <span className="text-[11px] uppercase tracking-wide text-gray-500 dark:text-slate-400">
                                    Email:
                                  </span>
                                  <span
                                    className="truncate font-medium text-gray-900 dark:text-white"
                                    title={candidate.email}
                                  >
                                    {candidate.email}
                                  </span>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                  {/* IDs removed per request */}
                                </div>
                                {(candidate.department ||
                                  candidate.faculty) && (
                                  <div className="flex gap-2 flex-wrap text-[11px] font-semibold">
                                    {candidate.department && (
                                      <span className="inline-flex items-center rounded-md bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 text-emerald-700 dark:text-emerald-100">
                                        {candidate.department}
                                      </span>
                                    )}
                                    {candidate.faculty && (
                                      <span className="inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 text-indigo-700 dark:text-indigo-100">
                                        {candidate.faculty}
                                      </span>
                                    )}
                                  </div>
                                )}
                                <p className="text-[11px] font-semibold text-gray-700 dark:text-slate-200">
                                  Votes: {candidate.votes}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {position.candidates.length > 3 && (
                        <div className="space-y-2 border border-gray-200 dark:border-slate-700 rounded-xl p-3 sm:p-4 bg-white dark:bg-slate-800">
                          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide">
                            Other candidates
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                            {position.candidates.slice(3).map((candidate) => (
                              <div
                                key={candidate._id}
                                className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-slate-700 px-3 py-2 bg-white dark:bg-slate-800"
                              >
                                <span className="text-sm text-gray-800 dark:text-slate-200 truncate">
                                  {candidate.name}
                                </span>
                                <div className="text-right">
                                  <p
                                    className="text-xs text-gray-500 dark:text-slate-400 truncate"
                                    title={candidate.email}
                                  >
                                    {candidate.email}
                                  </p>
                                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                    {candidate.votes}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
