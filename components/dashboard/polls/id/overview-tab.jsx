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

export default function OverviewTab({ pollData }) {
  // Group candidates by position/role
  const candidatesByPosition = pollData.candidates.reduce((acc, candidate) => {
    const position = candidate.role || "Other";
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(candidate);
    return acc;
  }, {});

  // Sort candidates within each position by votes
  Object.keys(candidatesByPosition).forEach((position) => {
    candidatesByPosition[position].sort((a, b) => b.votes - a.votes);
  });

  const totalVotes = pollData.candidates.reduce((sum, c) => sum + c.votes, 0);
  const votingStatus = getVotingStatus(pollData.startDate, pollData.endDate);

  return (
    <div className="space-y-6">
      {/* Timeline */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Voting Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                Start Date
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatDateShort(pollData.startDate)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center shadow-lg">
              <AlertCircle className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wide mb-1">
                End Date
              </p>
              <p className="text-lg font-bold text-gray-900 dark:text-white">
                {formatDateShort(pollData.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Results by Position */}
      <div className="space-y-6">
        {Object.entries(candidatesByPosition).map(([position, candidates]) => {
          const positionTotalVotes = candidates.reduce(
            (sum, c) => sum + c.votes,
            0
          );

          return (
            <div
              key={position}
              className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 shadow-sm overflow-hidden"
            >
              {/* Position Header */}
              <div className="bg-linear-to-r from-gray-50 to-gray-50 dark:from-slate-700/50 dark:to-slate-700/30 px-6 py-5 border-b border-gray-200 dark:border-slate-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-linear-to-br from-indigo-500 to-indigo-600 flex items-center justify-center">
                      <Award className="h-5 w-5 text-white" />
                    </div>
                    {position}
                  </h2>
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-slate-700/50 px-4 py-2 rounded-lg">
                    <span className="text-xs font-semibold text-gray-600 dark:text-slate-400 uppercase">
                      Votes
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white text-lg">
                      {positionTotalVotes}
                    </span>
                  </div>
                </div>
              </div>

              {/* Candidates for this position */}
              <div className="p-6">
                {candidates.length === 0 ? (
                  <div className="py-12 text-center">
                    <Users className="h-12 w-12 text-gray-300 dark:text-slate-600 mx-auto mb-3" />
                    <p className="text-gray-500 dark:text-slate-400 font-medium">
                      No candidates
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {candidates.map((candidate, index) => (
                      <div
                        key={candidate.id}
                        className="group relative bg-linear-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-xl border-2 border-gray-200 dark:border-slate-600 p-5 hover:shadow-xl hover:scale-105 transition-all duration-300"
                      >
                        {/* Rank Badge */}
                        <div className="absolute -top-3 -left-3">
                          <div
                            className={`h-12 w-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg ${getMedalColor(
                              index
                            )}`}
                          >
                            {index + 1}
                          </div>
                        </div>

                        {/* Crown for winner */}
                        {index === 0 && positionTotalVotes > 0 && (
                          <div className="absolute -top-3 -right-3">
                            <div className="h-10 w-10 rounded-full bg-amber-500 flex items-center justify-center shadow-lg">
                              <Crown className="h-5 w-5 text-white" />
                            </div>
                          </div>
                        )}

                        {/* Candidate Info */}
                        <div className="mt-4">
                          <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 truncate">
                            {candidate.name}
                          </h3>

                          {/* Leading Badge */}
                          {index === 0 && positionTotalVotes > 0 && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 text-xs font-bold rounded-full mb-3">
                              <TrendingUp className="h-3 w-3" />
                              Leading
                            </span>
                          )}

                          {/* Vote Count */}
                          <div className="mt-4 mb-3">
                            <div className="flex items-end justify-between mb-2">
                              <span className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase">
                                Votes
                              </span>
                              <span className="text-xs font-semibold text-gray-500 dark:text-slate-500">
                                {positionTotalVotes > 0
                                  ? (
                                      (candidate.votes / positionTotalVotes) *
                                      100
                                    ).toFixed(1)
                                  : 0}
                                %
                              </span>
                            </div>
                            <p className="text-3xl font-bold text-emerald-600 dark:text-emerald-400">
                              {candidate.votes}
                            </p>
                          </div>

                          {/* Progress Bar */}
                          <div className="relative h-2 w-full bg-gray-200 dark:bg-slate-600 rounded-full overflow-hidden shadow-sm">
                            <div
                              className={`h-full rounded-full transition-all duration-500 shadow-md ${getProgressGradient(
                                index
                              )}`}
                              style={{
                                width: `${
                                  positionTotalVotes > 0
                                    ? (candidate.votes / positionTotalVotes) *
                                      100
                                    : 0
                                }%`,
                              }}
                            >
                              <div className="h-full w-full bg-white/20 animate-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
