import { auth } from "@/auth";
import DashboardNavigations from "@/components/dashboard/dashboardNavigations";

export default async function Layout({ children }) {
  const session = await auth();
  console.log(session);

  return (
    <>
      <DashboardNavigations session={session}>{children} </DashboardNavigations>
    </>
  );
}
