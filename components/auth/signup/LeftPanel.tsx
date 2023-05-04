"use client";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/shared/LoadingButton";
import { AuthenticationService } from "@/src/services/AuthenticationService";

export default function LeftPanel() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      name: "",
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      const { error } = await AuthenticationService.signUp(
        values.username,
        values.password,
        values.name,
        values.email
      );
      if (error) {
        alert(error);
      } else {
        router.push("/signin");
      }

      setLoading(false);
    },
  });

  return (
    <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div className="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {t("sign-in-title")}
          </h2>
          <p className="mt-2 text-sm leading-6 text-gray-500">
            Already have an account?{" "}
            <a
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("sign-in-title")}
            </a>
          </p>
        </div>

        <div className="mt-10">
          <div>
            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    required
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User name
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    required
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 p-3"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <LoadingButton
                  loading={loading}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("sign-up")}
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
