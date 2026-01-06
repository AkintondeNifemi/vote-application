import { Mail } from "lucide-react";
export default function SettingsContactPage({ user }) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white p-4 sm:p-5 shadow-md dark:border-slate-700 dark:bg-slate-800 dark:shadow-xl dark:shadow-black/40">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-cyan-700 dark:bg-slate-700 dark:text-cyan-300">
            <Mail className="h-4 w-4" />
          </div>
          <span>Contact</span>
        </div>
        <button className="inline-flex w-full items-center justify-center rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition hover:border-gray-300 hover:bg-gray-50 sm:w-auto dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:border-slate-500 dark:hover:bg-slate-600">
          Update contact
        </button>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {[
          { label: "Primary email", value: user?.email },
          { label: "Account ID", value: user?._id },
          {
            label: "Auth provider",
            value: user?.googleId ? "Google" : "Email",
          },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-xl border border-gray-200 bg-white px-3 py-3 dark:border-slate-700 dark:bg-slate-900"
          >
            <p className="text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
              {item.label}
            </p>
            <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
              {item.value || "Not set"}
            </p>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
        Google is the authentication provider for all account.
      </p>
    </div>
  );
}
