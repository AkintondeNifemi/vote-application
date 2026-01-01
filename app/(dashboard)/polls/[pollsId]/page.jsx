import PollsIdHeader from "@/components/dashboard/polls/id/header";
import PollsIdBody from "@/components/dashboard/polls/id/body";
import { BASE_URL } from "@/libs/config/configuration";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function PollDetailsPage({ params }) {
  const { pollsId } = await params;
  const request = await fetch(`${BASE_URL}/api/polls/${pollsId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Cookie: (await cookies()).toString(),
    },
  });
  const response = await request.json();
  if (!request.ok || response?.error) return redirect("/polls");
  const {poll}= response;
  const pollData = {
    id: 1,
    title: "Q1 2025 Development Priorities",
    description:
      "Help us decide what features and improvements should be our top priorities for Q1 2025.",
    status: "Active",
    startDate: "2025-01-15T10:00:00",
    endDate: "2025-01-22T18:00:00",
    createdAt: "2025-01-10T10:00:00",
    position: "Chief Technology Officer",
    totalVoters: 50,
    votedCount: 24,
    rules: {
      emailPrefix: "@company.com",
      departmentCodes: ["eng", "product", "sales"],
    },
    candidates: [
      {
        id: 1,
        name: "Michael Chen",
        role: "Senior Engineering Manager",
        email: "michael.chen@company.com",
        department: "Engineering",
        votes: 10,
        percentage: 42,
      },
      {
        id: 2,
        name: "Alexandra Rodriguez",
        role: "Director of Product",
        email: "alex.rodriguez@company.com",
        department: "Product",
        votes: 8,
        percentage: 33,
      },
      {
        id: 3,
        name: "James Williams",
        role: "VP of Engineering",
        email: "james.williams@company.com",
        department: "Engineering",
        votes: 6,
        percentage: 25,
      },
    ],
    voters: [
      {
        id: 1,
        name: "Sarah Johnson",
        email: "sarah.j@company.com",
        department: "Engineering",
        voted: true,
        votedAt: "2025-01-16T14:30:00",
        blocked: false,
      },
      {
        id: 2,
        name: "David Lee",
        email: "david.l@company.com",
        department: "Product",
        voted: true,
        votedAt: "2025-01-16T15:20:00",
        blocked: false,
      },
      {
        id: 3,
        name: "Emma Wilson",
        email: "emma.w@company.com",
        department: "Sales",
        voted: false,
        votedAt: null,
        blocked: false,
      },
      {
        id: 4,
        name: "John Smith",
        email: "john.s@company.com",
        department: "Engineering",
        voted: false,
        votedAt: null,
        blocked: true,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 transition-colors">
      <PollsIdHeader pollData={poll} />
      <PollsIdBody pollData={pollData} />
    </main>
  );
}
