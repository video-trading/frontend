import TransactionReceipt from "@/components/tx/TransactionReceipt";
import { TransactionService } from "@/src/services/TransactionService";
import React from "react";

export default async function TransactionDetail({ params }: any) {
  const tx = await TransactionService.getTransactionById(params.id);

  return (
    <div className="mt-2 max-w-3xl mx-auto">
      <TransactionReceipt transaction={tx} />
    </div>
  );
}
