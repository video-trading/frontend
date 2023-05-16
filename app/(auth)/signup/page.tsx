import LeftPanel from "@/components/auth/signup/LeftPanel";
import Image from "next/image";

export default function SignIn() {
  return (
    <>
      <div className="flex min-h-full flex-1">
        <LeftPanel />
        <RightPanel />
      </div>
    </>
  );
}

function RightPanel() {
  return (
    <div className="relative hidden w-0 flex-1 lg:block">
      <Image
        className="h-full w-full"
        src="/images/sign-in.jpeg"
        alt="Sign in"
        width={4000}
        height={4000}
      />
    </div>
  );
}
