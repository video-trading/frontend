import HistoryHeader from "@/components/history/HistoryHeader";
import Paginator from "@/components/shared/Pagination";
import TransactionList from "@/components/tx/TransactionList";
import { authOptions } from "@/src/authOptions";
import { TransactionService } from "@/src/services/TransactionService";
import { getServerSession } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Transactions",
};

export default async function Page({ searchParams }: any) {
  const { t } = useTranslation("tx");
  const currentPage = searchParams.page ?? "1";
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return redirect("/signin");
  }

  const transactions = await TransactionService.listMyTransactions(
    accessToken,
    currentPage
  );

  return (
    <div className="mt-20 space-y-10">
      <HistoryHeader
        title={t("transaction-list-title")}
        description={t("transaction-list-description")}
      />
      <TransactionList items={transactions.items} />
      <div className="w-full justify-end flex pr-10 lg:pr-96">
        <Paginator
          total={transactions.metadata.totalPages}
          page={currentPage}
          basePath={"/my/transactions"}
        />
      </div>
    </div>
  );
}
