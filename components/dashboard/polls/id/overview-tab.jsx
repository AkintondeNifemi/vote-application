/* eslint-disable @next/next/no-img-element */
import {
  Mail,
  Building,
  Calendar,
  Clock,
  TrendingUp,
  Award,
  Crown,
  Users,
  BarChart3,
  CheckCircle,
  Zap,
  AlertCircle,
} from "lucide-react";

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

const formatDateShort = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const calculateDuration = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 1) {
    const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
    return `${diffHours} hour${diffHours > 1 ? "s" : ""}`;
  }
  return `${diffDays} day${diffDays > 1 ? "s" : ""}`;
};

const getVotingStatus = (startDate, endDate) => {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (now < start)
    return { status: "upcoming", label: "Not Started", color: "amber" };
  if (now > end) return { status: "closed", label: "Closed", color: "red" };
  return { status: "active", label: "Active", color: "emerald" };
};

const getMedalColor = (position) => {
  if (position === 0)
    return "bg-linear-to-br from-amber-400 to-amber-600 text-white";
  if (position === 1)
    return "bg-linear-to-br from-slate-300 to-slate-400 text-gray-800";
  if (position === 2)
    return "bg-linear-to-br from-orange-400 to-orange-500 text-white";
  return "bg-gray-200 dark:bg-slate-600 text-gray-700 dark:text-slate-300";
};

const getProgressGradient = (position) => {
  if (position === 0) return "bg-linear-to-r from-emerald-500 to-emerald-600";
  if (position === 1) return "bg-linear-to-r from-blue-500 to-blue-600";
  return "bg-linear-to-r from-purple-500 to-purple-600";
};

export default function OverviewTab({ poll }) {
  // Create a user lookup map from voters
  const userMap = (poll?.voters || []).reduce((acc, user) => {
    acc[user._id] = user;
    return acc;
  }, {});

  // Transform contestants data to include user details
  const positionsData = (poll?.contestants || []).map((contestant) => {
    const enrichedCandidates = (contestant.candidates || [])
      .map((candidate) => ({
        ...candidate,
        name: userMap[candidate.userId]?.name || "Unknown",
        email: userMap[candidate.userId]?.email || "N/A",
        image: userMap[candidate.userId]?.image || null,
      }))
      .sort((a, b) => b.votes - a.votes);

    return {
      ...contestant,
      candidates: enrichedCandidates,
      totalVotes: enrichedCandidates.reduce((sum, c) => sum + c.votes, 0),
    };
  });

  const totalVotes = positionsData.reduce(
    (sum, pos) => sum + pos.totalVotes,
    0
  );
  const totalCandidates = positionsData.reduce(
    (sum, pos) => sum + pos.candidates.length,
    0
  );
  const totalPositions = positionsData.length;
  const votingStatus = getVotingStatus(poll.startDate, poll.endDate);

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Voting Timeline
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="relative bg-linear-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/20 dark:to-blue-900/10 rounded-xl p-5 border border-blue-200 dark:border-blue-800/30">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600 rounded-l-xl"></div>
            <p className="text-xs font-semibold text-blue-700 dark:text-blue-400 uppercase tracking-wide mb-2">
              Start Date
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatDateShort(poll.startDate)}
            </p>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-3">
              Voting begins
            </p>
          </div>
          <div className="relative bg-linear-to-br from-red-50 to-red-100/50 dark:from-red-900/20 dark:to-red-900/10 rounded-xl p-5 border border-red-200 dark:border-red-800/30">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-600 rounded-l-xl"></div>
            <p className="text-xs font-semibold text-red-700 dark:text-red-400 uppercase tracking-wide mb-2">
              End Date
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatDateShort(poll.endDate)}
            </p>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-3">
              Voting closes
            </p>
          </div>
        </div>
      </div>

      {/* Results by Position */}
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
            const positionTotalVotes = position.totalVotes;

            return (
              <div
                key={position._id}
                className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
              >
                {/* Position Header */}
                <div className="bg-linear-to-r from-gray-50 via-gray-50 to-white dark:from-slate-700/50 dark:via-slate-700/40 dark:to-slate-800 px-4 sm:px-6 py-4 sm:py-5 border-b border-gray-200 dark:border-slate-700">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2 sm:gap-3 mb-2 capitalize">
                        <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shrink-0">
                          <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                        </div>
                        <span className="truncate">{position.position}</span>
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 ml-10 sm:ml-13 line-clamp-2">
                        {position.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-indigo-100 dark:bg-indigo-900/30 px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg flex-1 sm:flex-initial min-w-0">
                        <span className="text-[10px] sm:text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide whitespace-nowrap">
                          Candidates
                        </span>
                        <span className="font-bold text-indigo-900 dark:text-indigo-100 text-base sm:text-lg">
                          {position.candidates.length}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Candidates for this position */}
                <div className="p-6 bg-gray-50/50 dark:bg-slate-900/30">
                  {position.candidates.length === 0 ? (
                    <div className="py-16 text-center bg-white dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600">
                      <Users className="h-14 w-14 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                      <p className="text-gray-500 dark:text-slate-400 font-semibold text-lg">
                        No candidates yet
                      </p>
                      <p className="text-gray-400 dark:text-slate-500 text-sm mt-1">
                        Candidates will appear here once added
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {position.candidates.map((candidate, index) => {
                        const votePercentage =
                          positionTotalVotes > 0
                            ? (
                                (candidate.votes / positionTotalVotes) *
                                100
                              ).toFixed(1)
                            : 0;
                        const isWinner = index === 0 && positionTotalVotes > 0;

                        return (
                          <div
                            key={candidate._id}
                            className={`relative group rounded-2xl transition-all duration-300 overflow-hidden ${
                              isWinner
                                ? "bg-linear-to-r from-amber-50 via-white to-amber-50/30 dark:from-amber-900/20 dark:via-slate-800 dark:to-amber-900/10 shadow-lg border-2 border-amber-400 dark:border-amber-600"
                                : "bg-white dark:bg-slate-800 shadow-sm hover:shadow-md border border-gray-200 dark:border-slate-700"
                            }`}
                          >
                            {/* Rank Stripe */}
                            <div
                              className={`absolute left-0 top-0 bottom-0 w-1 sm:w-1.5 ${
                                index === 0
                                  ? "bg-linear-to-b from-amber-400 to-amber-600"
                                  : index === 1
                                  ? "bg-linear-to-b from-slate-300 to-slate-500"
                                  : index === 2
                                  ? "bg-linear-to-b from-orange-400 to-orange-600"
                                  : "bg-linear-to-b from-gray-300 to-gray-500"
                              }`}
                            ></div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5 p-4 sm:p-5 pl-4 sm:pl-6">
                              {/* Rank Badge & Avatar - Horizontal on mobile */}
                              <div className="flex items-center gap-3 w-full sm:w-auto">
                                <div className="flex flex-col items-center gap-1 sm:gap-2">
                                  <div
                                    className={`h-10 w-10 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-lg sm:text-2xl shrink-0 shadow-lg ${getMedalColor(
                                      index
                                    )}`}
                                  >
                                    {index + 1}
                                  </div>
                                  {isWinner && (
                                    <Crown className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500 animate-bounce" />
                                  )}
                                </div>

                                {/* Avatar */}
                                {candidate.image ? (
                                  <img
                                    src={candidate.image}
                                    alt={candidate.name}
                                    className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl object-cover border-2 border-gray-200 dark:border-slate-600 shrink-0 shadow"
                                  />
                                ) : (
                                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-xl sm:text-2xl shrink-0 shadow">
                                    {candidate.name.charAt(0).toUpperCase()}
                                  </div>
                                )}
                              </div>

                              {/* Candidate Info */}
                              <div className="flex-1 min-w-0 space-y-2 sm:space-y-3 w-full">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                                  <div className="space-y-1 flex-1 min-w-0">
                                    <h3 className="font-bold text-base sm:text-xl text-gray-900 dark:text-white flex flex-wrap items-center gap-2">
                                      <span className="truncate">
                                        {candidate.name}
                                      </span>
                                      {isWinner && (
                                        <span className="inline-flex items-center gap-1 px-2 sm:px-3 py-0.5 sm:py-1 bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300 text-[10px] sm:text-xs font-bold rounded-full shadow-sm whitespace-nowrap">
                                          <TrendingUp className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                                          Leading
                                        </span>
                                      )}
                                    </h3>
                                    <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 flex items-center gap-1.5 truncate">
                                      <Mail className="h-3 w-3 sm:h-3.5 sm:w-3.5 shrink-0" />
                                      <span className="truncate">
                                        {candidate.email}
                                      </span>
                                    </p>
                                  </div>
                                  <div className="text-left sm:text-right space-y-1 shrink-0">
                                    <p className="text-3xl sm:text-4xl font-bold  bg-clip-text ">
                                      {candidate.votes}
                                    </p>
                                    <p className="text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 font-semibold uppercase tracking-wide">
                                      {votePercentage}% votes
                                    </p>
                                  </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-1.5 sm:space-y-2">
                                  <div className="relative h-2 sm:h-2.5 w-full bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                    <div
                                      className={`h-full rounded-full transition-all duration-700 ease-out ${getProgressGradient(
                                        index
                                      )} shadow-md`}
                                      style={{
                                        width: `${votePercentage}%`,
                                      }}
                                    >
                                      <div className="h-full w-full bg-white/20"></div>
                                    </div>
                                  </div>

                                  {/* Vote Stats */}
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-1 sm:gap-0 text-[10px] sm:text-xs text-gray-500 dark:text-slate-400">
                                    <span className="font-medium">
                                      Rank #{index + 1} of{" "}
                                      {position.candidates.length}
                                    </span>
                                    <span className="font-medium">
                                      {positionTotalVotes > 0
                                        ? `${candidate.votes} / ${positionTotalVotes} votes`
                                        : "No votes yet"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
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
