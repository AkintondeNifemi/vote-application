import { Clock } from "lucide-react";
export default function InvitationHeader({ pollData }) {
  return (
    <div className="p-8 sm:p-12 text-center border-b border-gray-100 dark:border-slate-700">
      <div className="mb-6">
        <span className="inline-block text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 rounded-full">
          YOU&apos;RE INVITED
        </span>
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
        {pollData.title}
      </h1>
      <p className="text-gray-600 dark:text-slate-400 text-lg mb-6">
        Vote for all that apply
      </p>
      <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-slate-400">
        <Clock className="h-4 w-4" />
        <span className="font-bold text-blue-600 dark:text-blue-400">
          {new Date(pollData.startDate) > new Date()
            ? `Vote starting in ${Math.ceil(
                (new Date(pollData?.startDate) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}`
            : new Date(pollData.endDate) > new Date()
            ? `Voting ends in ${Math.ceil(
                (new Date(pollData?.endDate) - new Date()) /
                  (1000 * 60 * 60 * 24)
              )}`
            : "Voting closed"}{" "}
          days
        </span>
      </div>
    </div>
  );
}
