import { auth } from "@/lib/auth"
import LoginForm from "./_components/LoginForm"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


async function LoginPage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if(session){
        redirect("/")
    }
  return <LoginForm />
}
export default LoginPage