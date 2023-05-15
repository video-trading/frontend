import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export default function TBDPage() {
  const { t } = useTranslation("common");

  return (
    <div className="bg-white lg: mt-60">
      <div className="my-auto mx-auto">
        <div className="relative mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 p-4 justify-center items-center">
          <div className="sm:max-w-lg">
            <h1 className="font text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              {t("under-constraction")}
            </h1>
            <p className="mt-4 text-xl text-gray-500">
              {t("under-constraction-description")}
            </p>
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
              {/* <a
                href="/"
                className="inline-block rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-center font-medium text-white hover:bg-indigo-700"
              >
                Shop Collection
              </a> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
