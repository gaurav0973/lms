"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { authClient } from "@/lib/auth-client";
import { Check, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export default function VerifyRequest(){
    const [otp, setOtp] = useState("")
    const [emailPending, startEmailTransition] = useTransition()
    const params = useSearchParams()
    const email = params.get("email") as string
    const router = useRouter()
    
    function verifyOtp(){
        startEmailTransition(async () => {
            await authClient.signIn.emailOtp({
                email: email,
                otp: otp,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Email verified successfully")
                        router.push("/")
                    },
                    onError: () => {
                        toast.error("Failed to verify email")
                    }
                }
            })
        })
    }

    return (
        <Card className="width-full">
            <CardHeader className="text-center">
                <CardTitle className="text-xl">Please check Your email </CardTitle>
                <CardDescription>
                    we have sent you a verification code to your email. Please enter the code to verify your email address.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                
                <div className="flex flex-col items-center gap-4">
                    <InputOTP
                    value={otp}
                    onChange={(value) => setOtp(value)} 
                    maxLength={6} className="gap-2">
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your email</p>
                </div>
                
                <Button 
                onClick={verifyOtp}
                className="mt-4 w-full" disabled={emailPending || otp.length < 6}>
                    {
                        emailPending ? (
                            <>
                                <Loader className="size-4 animate-spin"/>
                                <span>Verifying...</span>
                            </>
                        ) : (
                            <>
                                <Check className="size-4" />
                                <span>Verify Account</span>
                            </>
                        )
                    }
                </Button>
            </CardContent>
        </Card>
    )
}