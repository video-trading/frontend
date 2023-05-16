import { UserService } from "@/src/services/UserService";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";

export default async function Creatives() {
  const { t } = useTranslation("features");
  const users = await UserService.listUsers();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {t("follow-us-title")}
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t("follow-us-subtitle")}
            {t("follow-us-description")}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {users.map((user) => (
            <li key={user.name}>
              <Image
                className="aspect-[3/2] w-full rounded-2xl object-cover"
                src={"/images/user.jpg"}
                alt=""
                width={300}
                height={300}
              />
              <h3 className="mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900">
                {user.name}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
