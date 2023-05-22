"use client";
import { useFormik } from "formik";
import useTranslation from "next-translate/useTranslation";
import React from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import LoadingButton from "@/components/shared/LoadingButton";

export default function LeftPanel() {
  const { t } = useTranslation("common");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const result = await signIn("credentials", {
        ...values,

        // we want to get the signin result
        // by turning off the redirect
        redirect: false,
      });

      // somethimes next-auth returns an error object
      // even if the login was successful
      // so we need to check if the error is not "credentialSignin"
      if (result?.error && result.error !== "credentialSignin") {
        alert(result.error);
        return;
      }

      // if the login was successful
      // redirect to the home page
      window.location.href = "/";
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
            {t("sign-up-description")}
            <a
              href="/signup"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              {t("sign-up-title")}
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

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm leading-6 text-gray-700"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm leading-6">
                  <a
                    href="#"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>

              <div>
                <LoadingButton
                  loading={formik.isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  {t("sign-in")}
                </LoadingButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
