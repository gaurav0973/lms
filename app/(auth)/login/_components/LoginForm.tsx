"use client";
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { authClient } from "@/lib/auth-client"
import { GithubIcon, Loader, Loader2, Send } from "lucide-react"
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react"
import { toast } from "sonner"



function LoginForm() {
    const router = useRouter()
    const [githubPending, startGithubTransition] = useTransition()
    const [emailPending, startEmailTransition] = useTransition()
    const [email, setEmail] = useState("")


    async function sighInWithGithub(){
        startGithubTransition(async () => {
            await authClient.signIn.social({
            provider: "github",
            callbackURL: "/",
            fetchOptions:{
                onSuccess : () => {
                    toast.success("Signed in with Github, You will be redirected...")
                },
                onError : () => {
                    toast.error("Internal Server Error...")
                }
            }
        })
        })
    }

    async function signInWithEmail(){
        startEmailTransition(async () => {
            await authClient.emailOtp.sendVerificationOtp({
                email : email,
                type: "sign-in",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Verification code sent to your email")
                        router.push(`/verify-request?email=${email}`)
                    },
                    onError: () => {
                        toast.error("Failed to send verification code")
                    }
                }
            })
        })
    }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="text-xl">Welcome back!</CardTitle>
            <CardDescription className="text-sm text-gray-500">
                Please login to your account
            </CardDescription>
        </CardHeader> 
        <CardContent className="flex flex-col gap-4">
            <Button 
            disabled={githubPending}
            onClick={sighInWithGithub} 
            className="w-full" variant="outline">
                {
                    githubPending ? (
                        <>
                            <Loader className="size-4 animate-spin"/>
                            <span>Loading...</span>
                        </>
                    ) : (
                        <>
                            <GithubIcon className="size-4" />
                            Sign in with Github
                        </>
                    )
                }
            </Button>


            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-card px-2 text-muted-foreground">
                    Or continue with
                </span>
            </div>


            <div className="grid gap-3">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" placeholder="abc@gmail.com" 
                    required/>
                </div>
                <Button
                onClick={signInWithEmail}
                disabled={emailPending}
                >
                    {
                        emailPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin"/>
                                <span>Loading...</span>
                            </>
                        ) : (
                            <>
                                <Send className="size-4" />
                                <span>Send Verification Code</span>
                            </>
                        )
                    }
                </Button>
            </div>
        </CardContent>
    </Card>
  )
}
export default LoginForm