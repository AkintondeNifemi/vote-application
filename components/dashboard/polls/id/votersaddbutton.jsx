import { Plus } from "lucide-react";
export default function VotersAddButton() {
  return (
    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-semibold rounded-lg transition-colors flex items-center gap-2 w-full sm:w-auto justify-center">
      <Plus className="h-4 w-4" />
      Add Voter
    </button>
  );
}
