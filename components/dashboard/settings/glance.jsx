import { BadgeCheck, Bell, Phone, ShieldCheck } from "lucide-react";
const formatDate = (dateString) => {
  if (!dateString) return "Not set";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
export default function SettingsGlance({ user }) {
  return (
    <aside className="space-y-4 sm:space-y-5">
      <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
          At a glance
        </h2>
        <div className="mt-3 space-y-3">
          {[
            {
              label: "Status",
              value: user?.googleId ? "Verified via Google" : "Email only",
              icon: (
                <BadgeCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-300" />
              ),
            },
            {
              label: "Poll roles",
              value:
                user?.voteInformation?.length > 0
                  ? `${user?.voteInformation?.length} assigned`
                  : "None",
              icon: (
                <Bell className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
              ),
            },
            {
              label: "Recovery",
              value: user?.googleId ? "Google account" : "None",
              icon: (
                <Phone className="h-4 w-4 text-indigo-700 dark:text-indigo-300" />
              ),
            },
            {
              label: "Member since",
              value: formatDate(user?.createdAt),
              icon: (
                <ShieldCheck className="h-4 w-4 text-amber-700 dark:text-amber-300" />
              ),
            },
          ].map((item) => (
            <div
              key={item.label}
              className="flex items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            >
              <div className="flex items-center gap-2 text-slate-600 min-w-0 dark:text-slate-300">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </div>
              <span className="truncate font-semibold text-slate-900 max-w-[60%] sm:max-w-none dark:text-white">
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
