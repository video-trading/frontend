import TransactionReceipt from "@/components/tx/TransactionReceipt";
import { TransactionService } from "@/src/services/TransactionService";
import React from "react";

export const metadata = {
  title: "Transaction Detail",
};

export default async function TransactionDetail({ params }: any) {
  const tx = await TransactionService.getTransactionById(params.id);

  return (
    <div className="mt-20 max-w-5xl mx-auto">
      <TransactionReceipt transaction={tx} />
    </div>
  );
}
