"use client";
import ResultHeader from "@/components/dashboard/results/resultId/header";
import ResultPosition from "@/components/dashboard/results/resultId/position";
import PrintTemplate from "@/components/dashboard/results/resultId/printTemplate";
import { useState, useEffect } from "react";
import { Printer, Download } from "lucide-react";

export default function ResultIdContainer({ poll: polls, pollId }) {
  const [poll, setPoll] = useState(polls || {});

  useEffect(() => {
    const streamRequest = new EventSource(`/api/polls/${pollId}/stream`, {
      withCredentials: true,
    });

    streamRequest.onmessage = (event) => {
      try {
        const parsedData = JSON.parse(event.data);
        setPoll(parsedData.poll);
      } catch (err) {
        toast.error("Abnormal Network. Please refresh the page.");
      }
    };
    streamRequest.onerror = () => {
      toast.error("Connection lost. Please refresh the page.");
      streamRequest.close();
    };
    return () => {
      streamRequest.close();
    };
  }, [pollId]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    alert("PDF export coming soon!");
  };

  return (
    <>
      <div className="no-print">
        <ResultHeader poll={poll} />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 no-print">
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Position Results
            </h2>
            <div className="flex gap-3 no-print">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
              >
                <Printer className="h-4 w-4" />
                Print
              </button>
              <button
                onClick={handleExportPDF}
                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                <Download className="h-4 w-4" />
                Export PDF
              </button>
            </div>
          </div>
          <ResultPosition poll={poll} />
        </div>
      </div>
      <PrintTemplate poll={poll} />
      <style jsx>{`
        @media print {
          .no-print {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
