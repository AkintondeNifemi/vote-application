import { CheckCircle2, Clock, Trophy, Users } from "lucide-react";
export default function ResultHeader({ poll }) {
  return (
    <div className="bg-linear-to-r from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 border-b border-gray-200 dark:border-slate-700 px-4 sm:px-6 py-6 sm:py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                  poll.status === "Active"
                    ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400"
                    : "bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400"
                }`}
              >
                {new Date() < new Date(poll?.startDate)
                  ? "Upcoming"
                  : new Date() < new Date(poll?.endDate)
                  ? "Active"
                  : "Completed"}
              </span>
              <span className="text-sm text-gray-600 dark:text-slate-400">
                {new Date(poll.startDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}{" "}
                -{" "}
                {new Date(poll.endDate).toLocaleDateString("en-US", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              {poll.title}
            </h1>
            <p className="text-gray-600 dark:text-slate-400 text-base sm:text-lg max-w-3xl">
              {poll.description}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Users className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Total Voters
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {poll.voters?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Votes Cast
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {poll.completedVoters?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Positions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {poll.contestants?.length || 0}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-600 dark:text-slate-400">
                  Participation
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {Math.round(
                    (poll.completedVoters?.length / poll.voters?.length) * 100
                  ) || 0}
                  %
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
