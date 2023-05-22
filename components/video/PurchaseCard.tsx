"use client";

import { classNames } from "@/src/classNames";
import { Dialog, RadioGroup } from "@headlessui/react";
import { QuestionMarkCircleIcon } from "@heroicons/react/20/solid";
import { ShieldCheckIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { useParams, useRouter } from "next/navigation";
import ContainedButton from "../shared/ContainedButton";
import VideoTransactionsDialog from "./VideoTransactionsDialog";
import { z } from "zod";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {
  purchaseOptions: {
    name: string;
    description: string;
    disabled?: boolean;
    link: string;
  }[];
}
const queryClient = new QueryClient();

export function PurchaseCard({ purchaseOptions }: Props) {
  const { t } = useTranslation("common");
  const router = useRouter();
  const [selected, setSelected] = useState();
  const [showModal, setShowModal] = useState(false);
  const videoId = useParams().id;

  return (
    <QueryClientProvider client={queryClient}>
      <section aria-labelledby="options-heading">
        <form>
          <div className="sm:flex sm:justify-between">
            {/* Size selector */}
            <RadioGroup value={selected} onChange={(e) => setSelected(e)}>
              {purchaseOptions.length > 0 && (
                <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                  {t("purchase-options")}
                </RadioGroup.Label>
              )}
              <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {purchaseOptions.map((option, index) => (
                  <RadioGroup.Option
                    as="div"
                    key={option.name}
                    value={index}
                    disabled={option.disabled}
                    className={({ active }) =>
                      classNames(
                        active ? "ring-2 ring-indigo-500" : "",
                        "relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                      )
                    }
                  >
                    {({ active, checked }) => (
                      <>
                        <RadioGroup.Label
                          as="p"
                          className="text-base font-medium text-gray-900"
                        >
                          {option.name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="p"
                          className="mt-1 text-sm text-gray-500"
                        >
                          {option.description}
                        </RadioGroup.Description>
                        <div
                          className={classNames(
                            active ? "border" : "border-2",
                            checked
                              ? "border-indigo-500"
                              : "border-transparent",
                            "pointer-events-none absolute -inset-px rounded-lg"
                          )}
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </RadioGroup.Option>
                ))}
              </div>
            </RadioGroup>
          </div>
          {purchaseOptions.length > 0 && (
            <div className="mt-4">
              <a
                href="#"
                className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
              >
                <span>Which option shall I choose?</span>
                <QuestionMarkCircleIcon
                  className="ml-2 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
              </a>
            </div>
          )}
          <div className="mt-10 space-y-4">
            {purchaseOptions.length > 0 && (
              <ContainedButton
                onClick={async () => {
                  if (selected === undefined) return;
                  const link = purchaseOptions[selected].link;
                  router.push(link as any);
                }}
                disabled={selected === undefined}
              >
                {t("purchase-button")}
              </ContainedButton>
            )}
            <button
              type="button"
              className="flex w-full items-center justify-center rounded-md border bg-indigo-50 px-3.5 py-2.5 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
              onClick={() => setShowModal(true)}
            >
              {t("view-video-transaction-history")}
            </button>
          </div>
          {purchaseOptions.length > 0 && (
            <div className="mt-6 text-center">
              <a href="#" className="group inline-flex text-base font-medium">
                <ShieldCheckIcon
                  className="mr-2 h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="text-gray-500 hover:text-gray-700">
                  Lifetime Guarantee
                </span>
              </a>
            </div>
          )}
        </form>

        <VideoTransactionsDialog
          open={showModal}
          onClose={() => setShowModal(false)}
          videoId={z.string().parse(videoId)}
        />
      </section>
    </QueryClientProvider>
  );
}
