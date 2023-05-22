import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import Link from "next/link";
import ContainedButton from "../shared/ContainedButton";

export default function NotPurchasablePage() {
  const { t } = useTranslation("tx");

  return (
    <div className="bg-white lg: mt-60">
      <div className="my-auto mx-auto">
        <div className="relative mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 p-4 justify-center items-center">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("not-purchasable-title")}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {t("not-purchasable-description")}
            </p>
            <Link
              href={`/`}
              className="mt-8 inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-lg text-sky-800 bg-sky-100 hover:bg-sky-200"
            >
              Back to home
            </Link>
          </div>
          <div>
            <div className="mt-10">
              {/* Decorative image grid */}
              <div className="">
                <Image
                  src={"/images/under-constraction.png"}
                  alt="under constraction"
                  width={600}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
