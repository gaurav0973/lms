"use client";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function Home() {
  const route = useRouter()
  const {data: session} = authClient.useSession() 
  
  
  async function signOut(){
    await authClient.signOut({
      fetchOptions:{
        onSuccess: ()=>{
          route.push("/")
          toast.success("Signed Out successfully")

        }
      }
    })
  }
  return (
    <div>
      <h1 className="text-xl font-bold text-red-700">Home</h1>
      <ThemeToggle />
      {
        session ? (
          <div>
            <p>{session.user.name}</p>
            <Button onClick={signOut} className="mt-4">Sign Out</Button>
          </div>
        ) : (
          <Button>Login</Button>
        )
      }
    </div>
  );
}
export default Home;
