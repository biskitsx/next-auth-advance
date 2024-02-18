import Image from "next/image";
import {Button} from '@/components/ui/button'
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"]
})
export default function Home() {
  return (
    <main>
        <div className="text-center flex flex-col gap-6">
          <h1 className={cn("text-6xl font-semibold text-white drop-shadow-lg", font.className)}>Auth 🔐</h1>
          <p className="text-white text-lg">A simple authentication service</p>
          <LoginButton>
            <Button variant={"secondary"} size={"lg"}>Sign in</Button>
          </LoginButton>
        </div>

    </main>
  );
}