"use client";

import React from "react";

import { DropInUI } from "braintree-react";

export default function BrainTreePurchaseCard() {
  return (
    <DropInUI
      token={"sandbox_8yrzsvtm_s2bg8fs563crhqzk"}
      amount={30}
      renderSubmitButton={({ onClick, isLoading, disabled }) => (
        <button
          type="button"
          className="w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Pay
        </button>
      )}
      onSubmitted={async (nonce, error) => {}}
    />
  );
}
