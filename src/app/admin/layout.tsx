import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { SideBar } from "../components/Sidebar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <div className="bg-black size-[200px] rounded-xl flex justify-center items-center mx-auto mt-20">
            <Button variant="outline" className="">
              Sign in
            </Button>
          </div>
        </SignInButton>
      </SignedOut>
      <SignedIn>
        <main className="bg-[#404040] flex">{children}</main>
      </SignedIn>
    </div>
  );
}
