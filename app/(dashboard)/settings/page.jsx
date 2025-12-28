"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";

const timezones = ["UTC", "EST", "CST", "MST", "PST", "CET", "IST"];
const reminderWindows = ["15 minutes", "1 hour", "6 hours", "1 day"];

export default function SettingsPage() {
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [defaultVisibility, setDefaultVisibility] = useState("private");
  const [timezone, setTimezone] = useState("UTC");
  const [reminderWindow, setReminderWindow] = useState("1 hour");
  const [autoCloseDays, setAutoCloseDays] = useState(7);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saveState, setSaveState] = useState("idle");

  const summary = useMemo(
    () => [
      {
        label: "Visibility",
        value:
          defaultVisibility === "private"
            ? "Private by default"
            : "Public by default",
      },
      {
        label: "Alerts",
        value: `${emailAlerts ? "Email" : "No email"}${
          smsAlerts ? " + SMS" : ""
        }`,
      },
      { label: "Timezone", value: timezone },
      { label: "Reminders", value: reminderWindow },
      { label: "Auto-close", value: `${autoCloseDays} days` },
    ],
    [
      defaultVisibility,
      emailAlerts,
      smsAlerts,
      timezone,
      reminderWindow,
      autoCloseDays,
    ]
  );

  const handleSave = () => {
    setSaveState("saving");
    setTimeout(() => setSaveState("saved"), 700);
    setTimeout(() => setSaveState("idle"), 2000);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-950 to-black px-6 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <header className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-4 shadow-xl shadow-black/50">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
              Settings
            </p>
            <h1 className="text-2xl font-semibold text-white">
              Voting workspace preferences
            </h1>
            <p className="text-sm text-slate-400">
              Tune how new polls behave, how reminders go out, and your security
              defaults.
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:from-cyan-400 hover:to-blue-400"
            disabled={saveState === "saving"}
          >
            <CheckCircle2 className="h-4 w-4" />
            {saveState === "saving"
              ? "Saving..."
              : saveState === "saved"
              ? "Saved"
              : "Save changes"}
          </button>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-5">
            <SettingsCard
              title="Poll defaults"
              icon={<SlidersHorizontal className="h-4 w-4" />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldLabel
                  label="Default visibility"
                  hint="Who can view a new poll"
                />
                <div className="flex gap-2">
                  {[
                    { key: "private", label: "Private" },
                    { key: "public", label: "Public" },
                  ].map((option) => (
                    <button
                      key={option.key}
                      onClick={() => setDefaultVisibility(option.key)}
                      className={`flex-1 rounded-xl border px-3 py-2 text-sm transition ${
                        defaultVisibility === option.key
                          ? "border-cyan-400 bg-cyan-500/15 text-white"
                          : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                <FieldLabel
                  label="Auto-close polls"
                  hint="Days until a poll auto-closes"
                />
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={autoCloseDays}
                  onChange={(event) =>
                    setAutoCloseDays(Number(event.target.value))
                  }
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
                />
              </div>
            </SettingsCard>

            <SettingsCard
              title="Notifications"
              icon={<Clock3 className="h-4 w-4" />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldLabel
                  label="Email alerts"
                  hint="Send results and updates"
                />
                <ToggleRow checked={emailAlerts} onChange={setEmailAlerts} />

                <FieldLabel label="SMS alerts" hint="Send critical reminders" />
                <ToggleRow checked={smsAlerts} onChange={setSmsAlerts} />

                <FieldLabel
                  label="Reminder cadence"
                  hint="When to nudge voters"
                />
                <SelectRow
                  value={reminderWindow}
                  onChange={(event) => setReminderWindow(event.target.value)}
                  options={reminderWindows}
                />

                <FieldLabel label="Timezone" hint="For scheduling closes" />
                <SelectRow
                  value={timezone}
                  onChange={(event) => setTimezone(event.target.value)}
                  options={timezones}
                />
              </div>
            </SettingsCard>

            <SettingsCard
              title="Security"
              icon={<ShieldCheck className="h-4 w-4" />}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <FieldLabel
                  label="Two-factor auth"
                  hint="Protect sensitive actions"
                />
                <ToggleRow checked={twoFactor} onChange={setTwoFactor} />

                <FieldLabel label="API token" hint="Regenerate if leaked" />
                <button
                  type="button"
                  className="w-full rounded-xl border border-red-300/50 bg-red-500/10 px-3 py-2 text-sm font-semibold text-red-100 transition hover:border-red-300 hover:bg-red-500/20"
                >
                  Regenerate token
                </button>
              </div>
            </SettingsCard>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Snapshot
              </p>
              <h2 className="mt-1 text-lg font-semibold text-white">
                Your current defaults
              </h2>
              <div className="mt-4 space-y-3">
                {summary.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-white/5 px-3 py-2 text-sm text-slate-200"
                  >
                    <span className="text-slate-400">{item.label}</span>
                    <span className="font-semibold text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              {saveState === "saved" && (
                <div className="mt-4 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-100">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Settings updated</span>
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
              <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
                Tips
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-300">
                <li>
                  Keep default visibility private; share links selectively.
                </li>
                <li>Short reminder windows drive higher participation.</li>
                <li>Regenerate your API token if you suspect exposure.</li>
              </ul>
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}

function SettingsCard({ title, icon, children }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/40">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-cyan-200">
          {icon}
        </div>
        <span>{title}</span>
      </div>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function FieldLabel({ label, hint }) {
  return (
    <div className="flex flex-col gap-0.5 text-sm text-slate-200">
      <span className="font-semibold text-white">{label}</span>
      <span className="text-xs text-slate-400">{hint}</span>
    </div>
  );
}

function ToggleRow({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${
        checked
          ? "border-emerald-300/60 bg-emerald-500/15 text-white"
          : "border-white/10 bg-white/5 text-slate-200 hover:border-white/20"
      }`}
    >
      <span>{checked ? "Enabled" : "Disabled"}</span>
      <span
        className={`inline-flex h-5 w-10 items-center rounded-full p-1 transition ${
          checked ? "bg-emerald-400/80" : "bg-slate-600"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </span>
    </button>
  );
}

function SelectRow({ value, onChange, options }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white focus:border-cyan-400 focus:outline-none"
    >
      {options.map((opt) => (
        <option key={opt} value={opt} className="bg-slate-900 text-slate-100">
          {opt}
        </option>
      ))}
    </select>
  );
}
