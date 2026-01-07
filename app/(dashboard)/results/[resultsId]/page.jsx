import ResultHeader from "@/components/dashboard/results/resultId/header";
import ResultPosition from "@/components/dashboard/results/resultId/position";
import { BASE_URL } from "@/libs/config/configuration";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page({ params }) {
  const { resultsId } = await params;
  const request = await fetch(`${BASE_URL}/api/polls/${resultsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request?.ok || response?.error) return redirect("/dashboard/results");
  // Static sample poll data
  const { poll } = response;
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <ResultHeader poll={poll} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
            Position Results
          </h2>
          <ResultPosition poll={poll} />
        </div>
      </div>
    </main>
  );
}
