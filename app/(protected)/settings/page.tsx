import { logout } from "@/action/logout";
import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { publicRoutes } from "@/routes";

export default async function Page() {
  const session = await auth();
  return (
    <div>
      <h1 className="text-white">{JSON.stringify(session)}</h1>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button variant={"default"}>LOGOUT</Button>
      </form>
    </div>
  );
}
