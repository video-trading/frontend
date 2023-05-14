import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { classNames } from "@/src/classNames";
import { Profile } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface Props {
  user: Profile;
}

export default function Avatar({ user }: Props) {
  const { t } = useTranslation("common");

  const menus = [
    {
      name: t("account-settings"),
      link: "/account",
    },
    {
      name: t("my-videos"),
      link: "/my/videos",
    },
    {
      name: t("transactions"),
      link: "/my/transactions",
    },
    {
      name: t("rewards"),
      link: "/my/rewards",
    },
    {
      name: t("sign-out"),
      onClick: () => signOut(),
    },
  ];

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-full  h-10 w-10 bg-gray-400 border-gray-800">
          <p className="capitalize text-white">{(user.name ?? "")[0]}</p>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute mt-2  z-10  w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {menus.map((menu) => (
              // render menu items
              // based on the menu type
              // if menu type is link
              // render link
              // else
              // render button
              <Menu.Item>
                {({ active }) =>
                  menu.link ? (
                    <Link
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                      onClick={menu.onClick}
                      href={menu.link as any}
                    >
                      {menu.name}
                    </Link>
                  ) : (
                    <button
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block w-full px-4 py-2 text-left text-sm"
                      )}
                      onClick={menu.onClick}
                    >
                      {menu.name}
                    </button>
                  )
                }
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
