import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-8 md:py-12">
          {/* Top area */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between mb-12 md:mb-6">
            <div className="shrink-0 mr-4">
              {/* Logo */}
              <Link
                className="inline-flex group mb-8 sm:mb-0"
                href="/"
                aria-label="Cruip"
              >
                <Image
                  src={"/images/logov2.png"}
                  alt="logo"
                  height={50}
                  width={50}
                />
              </Link>
            </div>
          </div>
          {/* Bottom area */}
          <div className="text-center md:flex md:items-center md:justify-between mb-8 md:mb-6">
            {/* Social links */}

            {/* Left links */}
            <div className="text-sm font-medium md:order-1 space-x-6 mb-2 md:mb-0">
              <a
                className="text-gray-500 decoration-blue-500 decoration-2 underline-offset-2 hover:underline"
                href="/privacy"
              >
                Privacy &amp; Terms
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
