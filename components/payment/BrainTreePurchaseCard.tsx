"use client";

import React, { useCallback } from "react";

import { DropInUI } from "braintree-react";
import { PaymentService } from "@/src/services/PaymentService";
import { useRouter } from "next/navigation";
import LoadingButton from "../shared/LoadingButton";

interface Props {
  paymentToken: string;
  videoId: string;
  accessToken: string;
}

export default function BrainTreePurchaseCard({
  paymentToken,
  videoId,
  accessToken,
}: Props) {
  const router = useRouter();
  const checkout = useCallback(
    async (nonce: string) => {
      try {
        const transactionHistory = await PaymentService.checkout(
          accessToken,
          nonce,
          videoId
        );
        //@ts-ignore
        router.push(`tx/${transactionHistory.id}`);
      } catch (e) {
        alert(e);
      }
    },
    [accessToken, videoId, router]
  );

  return (
    <DropInUI
      token={paymentToken}
      amount={30}
      renderSubmitButton={({ onClick, isLoading, disabled }) => (
        <LoadingButton
          type="button"
          loading={isLoading}
          disabled={disabled}
          className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mt-1"
          onClick={onClick}
        >
          Pay
        </LoadingButton>
      )}
      onSubmitted={async (nonce, error) => {
        if (error || !nonce) {
          alert(error);
          return;
        }
        await checkout(nonce);
      }}
    />
  );
}
