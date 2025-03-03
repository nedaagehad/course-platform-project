import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import AdminLink from "../AdminLink/AdminLink";

export default function Navbar() {
  return (
    <header className="w-full flex h-16 shadow bg-background z-10">
      <nav className="flex gap-4 w-full p-4">
        <Link
          className="mr-auto text-lg hover:underline px-2 flex items-center"
          href="/"
        >
          Home
        </Link>
        <SignedIn>
          <AdminLink />
          <Link
            className="hover:bg-accent/10 hover:underline flex items-center px-2"
            href="/courses"
          >
            My Courses
          </Link>
          <Link
            className="hover:bg-accent/10 hover:underline flex items-center px-2"
            href="/purchases"
          >
            Purchase History
          </Link>
          <div className="size-8 self-center flex items-center justify-center">
            <UserButton />
          </div>
        </SignedIn>
        <SignedOut>
          <Button className="h-full hover:cursor-pointer">
            <Link className="px-2 flex items-center" href="/sign-in">
              <SignInButton>
                <p className="hover:cursor-pointer">Sign In</p>
              </SignInButton>
            </Link>
          </Button>
        </SignedOut>
      </nav>
    </header>
  );
}
