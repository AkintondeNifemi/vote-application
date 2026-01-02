import { useEffect, useState } from "react";
import { Plus, Trash2, Award, Users } from "lucide-react";
import { toast } from "react-toastify";
import LoadingSpinner from "@/components/loadingspinner";

export default function PositionsTab({ pollData, pollId }) {
  const [position, setPosition] = useState([]);
  const [newPositionName, setNewPositionName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchPosition() {
      setLoading(true);
      try {
        const request = await fetch(`/api/polls/${pollId}/contestant/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        const response = await request.json();
        if (!request.ok || response?.error) {
          toast.error(response?.error || "An error occurred.");
          setLoading(false);
          return setPosition([]);
        }
        setPosition(response?.contestant);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        return toast.error("Network Error");
      }
    }
    fetchPosition();
  }, [pollId]);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-0">
      <div className="bg-white dark:bg-slate-800 rounded-lg p-4 sm:p-6 border border-gray-200 dark:border-slate-700">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-4">
          Create Position
        </h2>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            type="text"
            value={newPositionName}
            onChange={(e) => setNewPositionName(e.target.value)}
            placeholder="e.g., President, Vice President..."
            className="flex-1 px-3 sm:px-4 py-3 sm:py-2.5 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-slate-500 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-2.5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
            <Plus className="h-5 w-5" />
            <span className="sm:hidden">Add</span>
            <span className="hidden sm:inline">Add Position</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
          Positions ({position.length})
        </h2>

        {position.length === 0 ? (
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-6 sm:p-8 text-center border border-gray-200 dark:border-slate-700">
            <Award className="h-8 w-8 text-gray-400 dark:text-slate-600 mx-auto mb-2" />
            <p className="text-sm sm:text-base text-gray-600 dark:text-slate-400 font-medium">
              No positions created yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {position.map((p) => (
              <div
                key={p._id}
                className="bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition-shadow gap-3 sm:gap-0"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold capitalize text-gray-900 dark:text-white text-sm sm:text-base truncate">
                    {p?.position}
                  </h3>
                  <div className="flex items-center gap-1 text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-2 sm:mt-1">
                    <Users className="h-4 w-4 shrink-0" />
                    <span>{p?.candidates?.length || 0} people</span>
                  </div>
                </div>
                <button
                  className="w-full sm:w-auto px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors font-medium text-sm sm:font-normal sm:p-2"
                  title="Delete position"
                >
                  <span className="sm:hidden">Delete</span>
                  <Trash2 className="h-5 w-5 hidden sm:block" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
