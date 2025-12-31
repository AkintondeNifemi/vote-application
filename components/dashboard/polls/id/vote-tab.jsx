/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import Image from "next/image";

export default function VoteTab({ pollData }) {
  const positions = [
    {
      id: 1,
      title: "Chief Technology Officer",
      description: "Lead the technical strategy and innovation",
    },
    {
      id: 2,
      title: "Head of Product",
      description: "Direct product vision and roadmap",
    },
    {
      id: 3,
      title: "VP of Operations",
      description: "Oversee operational excellence",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800/50 rounded-2xl p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Cast Your Votes
        </h2>
        <p className="text-gray-600 dark:text-slate-400 mb-4">
          Select a position below to vote for your preferred candidate.
        </p>
        <div className="flex items-center gap-2 text-sm text-blue-700 dark:text-blue-300">
          <Clock className="h-4 w-4" />
          <span>Voting closes on January 22, 2025 at 6:00 PM</span>
        </div>
      </div>

      {/* Positions Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {positions.map((position) => (
          <Link
            key={position.id}
            href={`./vote/${position.id}`}
            className="group"
          >
            <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
              {/* Image Background */}
              <div className="h-48 relative overflow-hidden bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=400&fit=crop"
                  alt={position.title}
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {position.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-slate-400 mb-6">
                  {position.description}
                </p>

                {/* Vote Button */}
                <button className="w-full px-4 py-3 bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-700 dark:to-blue-800 dark:hover:from-blue-800 dark:hover:to-blue-900 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2">
                  Vote Now
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Info Message */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4">
        <p className="text-sm text-amber-900 dark:text-amber-300">
          <span className="font-semibold">Note:</span> You can vote for one
          candidate per position. Click on a position to view available
          candidates and cast your vote.
        </p>
      </div>
    </div>
  );
}
