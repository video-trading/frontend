import { authOptions } from "@/src/authOptions";
import { TokenService } from "@/src/services/TokenService";
import { getServerSession } from "next-auth/next";
import Image from "next/image";
import Link from "next/link";
import HeaderAuthticationButtons from "../auth/HeaderAuthticationButtons";

async function getTotalToken(
  accessToken?: string
): Promise<number | undefined> {
  if (!accessToken) return undefined;
  return await TokenService.getTotalToken(accessToken);
}

export default async function Header({ nav = true }: { nav?: boolean }) {
  const session = await getServerSession(authOptions);
  const balance = await getTotalToken((session as any)?.accessToken);

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
          {nav && (
            <HeaderAuthticationButtons session={session} balance={balance} />
          )}
        </div>
      </div>
    </header>
  );
}
