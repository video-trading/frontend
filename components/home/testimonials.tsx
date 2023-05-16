import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  LockClosedIcon,
} from "@heroicons/react/20/solid";
import useTranslation from "next-translate/useTranslation";

export default function Testimonials() {
  const { t } = useTranslation("features");
  const features = [
    {
      name: t("feature-2-title"),
      description: t("feature-2-subtitle"),
      icon: CloudArrowUpIcon,
    },
    {
      name: t("feature-3-title"),
      description: t("feature-3-subtitle"),
      icon: LockClosedIcon,
    },
    {
      name: t("feature-4-title"),
      description: t("feature-4-subtitle"),
      icon: ArrowPathIcon,
    },
  ];

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            {t("feature-1-title")}
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("feature-1-subtitle")}
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t("feature-1-content")}
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <feature.icon
                    className="h-5 w-5 flex-none text-indigo-600"
                    aria-hidden="true"
                  />
                  {feature.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
