import { TrendingUp, Users, UserPlus, Settings } from "lucide-react";
export default function PollsIdBodyTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "overview", name: "Overview", icon: TrendingUp },
    { id: "candidates", name: "Candidates", icon: Users },
    { id: "voters", name: "Voters", icon: UserPlus },
    { id: "settings", name: "Settings", icon: Settings },
  ];
  return (
    <div className="border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex gap-1 overflow-x-auto scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 cursor-pointer font-semibold text-sm whitespace-nowrap border-b-2 transition-colors flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-500"
                    : "border-transparent text-gray-600 dark:text-slate-400 hover:text-gray-900 dark:hover:text-slate-300"
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
