import { auth } from "@/auth";
import DashboardNavigations from "@/components/dashboard/dashboardNavigations";
// import { BASE_URL } from "@/libs/config/configuration";
// import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();
  if (!session?.user && !session) return redirect("/");

  // this line of code is optional
  // setInterval(async () => {
  //   const request = await fetch(`${BASE_URL}/api/cors/polls`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Cookie: (await cookies()).toString(),
  //     },
  //   });
  //   const response = await request.json();
  //   console.log(response);
  // }, 30000);

  return (
    <>
      <DashboardNavigations session={session}>{children} </DashboardNavigations>
    </>
  );
}
