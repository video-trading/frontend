import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import { signIn, signOut } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/src/authOptions";
import HeaderAuthticationButtons from "../auth/HeaderAuthticationButtons";
import Image from "next/image";

export default async function Header({ nav = true }: { nav?: boolean }) {
  const session = await getServerSession(authOptions);

  return (
    <header className="absolute w-full z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site branding */}
          <div className="shrink-0 mr-4">
            {/* Logo */}
            <Link className="block group" href="/" aria-label="Cruip">
              <Image
                src={"/images/logov2.png"}
                alt="logo"
                height={50}
                width={50}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          {nav && <HeaderAuthticationButtons session={session} />}
        </div>
      </div>
    </header>
  );
}
