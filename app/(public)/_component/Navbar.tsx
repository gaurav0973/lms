"use client"
import Image from "next/image"
import Link from "next/link"
import Logo from "@/public/logo.png"
import { ThemeToggle } from '../../../components/ui/themeToggle';
import { authClient } from "@/lib/auth-client";
import { buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";

const navigationItems = [
    { name: "Home", href: "/" },
    { name: "Courses", href: "/courses" },
    { name: "Dashboard", href: "/admin" },
]

function Navbar() {

    const {data : session, isPending} = authClient.useSession();
    // console.log(session)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
        <div className="container flex min-h-16 item-center mx-auto px-4 md:px-6 lg:px-8 ">
            <Link href="/" className="flex items-center space-x-2 mr-4">
                <Image src={Logo} alt="Logo" className="size-9" />
                <span className="font-bold">ApnaLMS</span>
            </Link>

            {/* desktop navigation */}
            <nav className="hidden md:flex items-center justify-between w-full ml-4">
                <div className="flex items-center space-x-4">
                    {navigationItems.map((item) => (
                        <Link key={item.name} href={item.href}
                        className="text-sm font-medium transition-colors hover:text-primary hover:underline hover:underline-offset-4">
                            {item.name}
                        </Link>
                    ))} 
                </div>

                <div className="flex items-center space-x-4">
                    <ThemeToggle />
                    {
                        isPending ? null : session ? (
                            <UserDropdown  email={session.user.email} name={session.user.name} image={session.user.image || ""} />
                        ) : (
                            <>
                                <Link href="/login" className={buttonVariants({
                                    variant: "secondary",
                                })}>
                                    Sign In
                                </Link>
                                <Link href="/login" className={buttonVariants()}>
                                    Get Started
                                </Link>
                            </>
                        )
                    }
                </div>
            </nav>
        </div>

    </header>
  )
}
export default Navbar