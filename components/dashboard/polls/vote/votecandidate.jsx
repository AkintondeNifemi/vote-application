/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle } from "lucide-react";

const fallbackContestant = {
  position: "Vice President",
  description: "Choose the candidate you want to represent you.",
  candidates: [
    {
      _id: "cand-1",
      votes: 14,
      userId: {
        _id: "user-1",
        name: "Ayomide Areo",
        email: "ayomide@example.com",
        image:
          "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80",
      },
    },
    {
      _id: "cand-2",
      votes: 9,
      userId: {
        _id: "user-2",
        name: "Favour Adebayo",
        email: "favour@example.com",
      },
    },
  ],
};

export default function VoteCandidate({ candidates, contestant }) {
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  const getInitials = (value) => {
    if (!value || typeof value !== "string") return "?";
    return value
      .trim()
      .split(" ")
      .filter(Boolean)
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const maskId = (value) => {
    if (!value || typeof value !== "string") return "";
    if (value.length <= 9) return value;
    return `${value.slice(0, 4)}*****${value.slice(-4)}`;
  };

  const baseContestant =
    contestant && contestant.candidates?.length ? contestant : null;
  const safeContestant = baseContestant || fallbackContestant;
  const safeCandidates =
    candidates && candidates.length ? candidates : safeContestant.candidates;

  const totalVotes = safeCandidates.reduce(
    (sum, current) => sum + (Number(current?.votes) || 0),
    0
  );
  const positionLabel = safeContestant?.position || "Position";

  const handleSelect = (id) => {
    setSelectedCandidate(id);
  };

  const handleSubmit = () => {
    if (!selectedCandidate) return;
    console.log("Submit vote for", selectedCandidate);
  };

  return (
    <section className="max-w-5xl mx-auto px-5 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="rounded-3xl bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-8 shadow-xl border border-gray-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.12em] font-semibold text-gray-400">
              Vote
            </p>
            <h1 className="text-3xl font-bold leading-tight">
              Select your candidate
            </h1>
            <p className="text-sm text-gray-300 max-w-2xl">
              Review the profiles for the {positionLabel} role and choose the
              person you want to represent you. You can change your selection
              until you submit.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 w-full sm:w-auto sm:min-w-[260px]">
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-gray-400">Position</p>
              <p className="text-lg font-semibold">{positionLabel}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-xs text-gray-400">Total candidates</p>
              <p className="text-lg font-semibold">{safeCandidates.length}</p>
            </div>
            <div className="rounded-2xl bg-white/5 border border-white/10 p-4 col-span-2">
              <p className="text-xs text-gray-400">Votes recorded</p>
              <p className="text-lg font-semibold">{totalVotes}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {safeCandidates.map((candidate) => {
          const isSelected = selectedCandidate === candidate._id;
          return (
            <article
              key={candidate._id}
              onClick={() => handleSelect(candidate._id)}
              className={`group h-full rounded-2xl border bg-white/90 dark:bg-slate-900/80 backdrop-blur transition-all cursor-pointer shadow-sm hover:shadow-lg ${
                isSelected
                  ? "border-blue-600 ring-2 ring-blue-100 dark:ring-blue-900/60"
                  : "border-gray-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-slate-700"
              }`}
            >
              <div className="p-6 space-y-5 h-full flex flex-col">
                <div className="flex items-start gap-4">
                  {candidate?.userId?.image ? (
                    <img
                      src={candidate.userId.image}
                      alt={candidate?.userId?.name}
                      className="h-16 w-16 rounded-xl object-cover border border-gray-200 dark:border-slate-800"
                    />
                  ) : (
                    <div className="h-16 w-16 rounded-xl bg-gray-900 text-white flex items-center justify-center font-bold text-xl shrink-0">
                      {getInitials(candidate?.userId?.name)}
                    </div>
                  )}

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white leading-tight">
                          {candidate?.userId?.name}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 dark:text-slate-300 capitalize">
                          {positionLabel}
                        </p>
                      </div>
                      {isSelected ? (
                        <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-100 px-3 py-1 text-xs font-semibold">
                          <CheckCircle className="h-4 w-4" />
                          Selected
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-slate-200 px-3 py-1 text-xs font-semibold">
                          Tap to select
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 bg-gray-50 dark:bg-slate-800/60">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                          Email
                        </p>
                        <p className="text-gray-900 dark:text-white break-all">
                          {candidate?.userId?.email || "Not provided"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 bg-gray-50 dark:bg-slate-800/60">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                          Candidate ID
                        </p>
                        <p className="text-gray-900 dark:text-white truncate">
                          {maskId(candidate?._id)}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-sm">
                      <div className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 bg-white dark:bg-slate-900/80">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                          Votes
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {candidate?.votes ?? 0}
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 bg-white dark:bg-slate-900/80">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                          Status
                        </p>
                        <p className="text-base font-semibold text-gray-900 dark:text-white">
                          {isSelected ? "Preferred" : "Available"}
                        </p>
                      </div>
                      <div className="rounded-lg border border-gray-200 dark:border-slate-800 px-3 py-2 bg-white dark:bg-slate-900/80">
                        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400">
                          Profile
                        </p>
                        <p className="text-base font-semibold text-blue-600 dark:text-blue-200">
                          View summary
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleSelect(candidate._id)}
                  className={`mt-auto inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isSelected
                      ? "bg-blue-600 text-white shadow hover:bg-blue-700"
                      : "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
                  }`}
                >
                  {isSelected ? "Selected" : "Choose this candidate"}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white">
            Ready to submit?
          </p>
          <p className="text-sm text-gray-600 dark:text-slate-300">
            You can only vote once for this position. Confirm your choice before
            submitting.
          </p>
        </div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!selectedCandidate}
          className={`px-6 py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 inline-flex items-center gap-2 ${
            selectedCandidate
              ? "bg-blue-600 text-white hover:bg-blue-700 shadow"
              : "bg-gray-200 dark:bg-slate-800 text-gray-500 dark:text-slate-500 cursor-not-allowed"
          }`}
          title={selectedCandidate ? "Submit your vote" : "Select a candidate"}
        >
          Submit your vote
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
