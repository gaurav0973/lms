import { buttonVariants } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ReactNode } from "react"

function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center">

       <Link href="/" className={buttonVariants({
            variant: "outline",
            className: "absolute left-4 top-4"
       })}>
           <ArrowLeft className="h-4 w-4" /> Back
       </Link>

        <div className="flex w-full max-w-sm flex-col gap-6">

            <Link href="/">
                <h1 className="text-2xl font-bold text-center">Welcome to LMS</h1>
            </Link>
            {children}

            <div className="text-balance text-center text-xs text-muted-foreground">
                By clicking continue, you agree to our {" "}
                <span className="hover:text-primary hover:underline">Terms of service</span>{" "} and <span className="hover:text-primary hover:underline">Privacy Policy</span>
            </div>
      </div>
    </div>
  )
}
export default AuthLayout