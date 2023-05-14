"use client";

import useTranslation from "next-translate/useTranslation";
import { Editor } from "editor";
import "editor/src/style.css";
import { useFormik } from "formik";
import { GetVideoResponse, VideoService } from "@/src/services/VideoService";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  CategoryNode,
  CategoryService,
  GetCategoryResponse,
} from "@/src/services/CategoryService";
import TreeSelect from "mui-tree-select";
import { TextField } from "@mui/material";
import RadioButtons from "../shared/RadioButtons";
import LoadingButton from "../shared/LoadingButton";

interface Props {
  video: GetVideoResponse;
  session: Session;
  categories: GetCategoryResponse[];
}

export default function DescriptionForm({ video, session, categories }: Props) {
  const { t } = useTranslation("video");
  const { t: common } = useTranslation("common");
  const [isForSale, setIsForSale] = useState(false);

  const accessToken = (session as any).accessToken;
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      title: video.title,
      description: video.description,
      SalesInfo: video.SalesInfo,
      categoryId: video.categoryId,
    },
    validate: (values) => {
      const errors: any = {};

      if (!values.title) {
        errors.title = "Title is required";
      }

      if (!values.categoryId) {
        errors.categoryId = "Category is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      try {
        await VideoService.publishVideo(accessToken, video.id, {
          ...values,
          SalesInfo: isForSale ? values.SalesInfo : undefined,
        });
        router.push(`/create/${video.id}/finish`);
      } catch (e: any) {
        if (e.response?.data?.message) {
          alert(e.response?.data?.message);
          return;
        }
        console.log(e);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("video-description-title")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("video-description-description")}
          </p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("video-description-form-title")}
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    placeholder={t("video-description-title-placeholder")}
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                {t("video-description-form-description")}
              </label>
              <div
                className="mt-2 border rounded-2xl p-2"
                style={{ minHeight: 600 }}
              >
                <Editor
                  initialValue=""
                  editable={true}
                  onChange={(v) => formik.setFieldValue("description", v)}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                {t("video-description-form-description-help")}
              </p>
            </div>

            {/* category */}
            <div className="col-span-full">
              <label
                htmlFor="about"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category
              </label>
              <div className="mt-2 flex flex-row space-x-10 h-full">
                <TreeSelect
                  className="w-96"
                  getChildren={(node: CategoryNode | null) => {
                    if (node !== null) {
                      return node.subCategories;
                    }
                    return CategoryService.getCategoriesTree(categories);
                  }}
                  getParent={(node) => node.parent}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      className="focus:ring-0"
                      label={"Category"}
                      helperText={"Select a category"}
                      fullWidth
                    />
                  )}
                  getOptionLabel={(node) => node.name}
                  onChange={(e, v) => {
                    formik.setFieldValue("categoryId", v?.id);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        {/* pricing */}
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            {t("video-description-pricing-title")}
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            {t("video-description-pricing-description")}
          </p>

          <div className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-sm font-semibold leading-6 text-gray-900">
                {t("video-description-pricing")}
              </legend>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                {t("video-description-pricing-description")}
              </p>
              <div className="mt-6">
                <RadioButtons
                  className="space-y-6"
                  selections={[
                    t("video-description-is-for-sale-yes"),
                    t("video-description-is-for-sale-no"),
                  ]}
                  name="pricing"
                  onChange={(v) => {
                    if (v === t("video-description-is-for-sale-yes")) {
                      setIsForSale(true);
                    } else {
                      setIsForSale(false);
                    }
                  }}
                />
              </div>
            </fieldset>
            {isForSale && (
              <fieldset>
                <legend className="text-sm font-semibold leading-6 text-gray-900">
                  {t("video-description-pricing")}
                </legend>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  {t("video-description-pricing-description")}
                </p>
                <div className="mt-6">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    {t("video-description-form-price")}
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="number"
                        name="price"
                        id="price"
                        value={formik.values.SalesInfo?.price ?? 0}
                        onChange={(e) => {
                          formik.setFieldValue("SalesInfo", {
                            price:
                              e.target.value.length > 0
                                ? parseFloat(e.target.value)
                                : 0,
                          });
                        }}
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={t("video-description-title-placeholder")}
                      />
                    </div>
                  </div>
                </div>
              </fieldset>
            )}
          </div>
        </div>
      </div>

      {/* actions */}
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <LoadingButton
          type="submit"
          loading={formik.isSubmitting}
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-20 h-10"
        >
          {common("save")}
        </LoadingButton>
      </div>
    </form>
  );
}

function Select() {
  return (
    <div>
      <select
        id="location"
        name="location"
        className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
        defaultValue="Canada"
      >
        <option>United States</option>
        <option>Canada</option>
        <option>Mexico</option>
      </select>
    </div>
  );
}
