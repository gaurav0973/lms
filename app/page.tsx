"use client";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

function Home() {

  const {data: session} = authClient.useSession() 
  return (
    <div>
      <h1 className="text-xl font-bold text-red-700">Home</h1>
      <ThemeToggle />
      {
        session ? (
          <p>{session.user.name}</p>
        ) : (
          <Button>Login</Button>
        )
      }
    </div>
  );
}
export default Home;
