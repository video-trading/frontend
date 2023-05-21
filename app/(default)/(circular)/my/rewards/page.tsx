import HistoryHeader from "@/components/history/HistoryHeader";
import Paginator from "@/components/shared/Pagination";
import TokenList from "@/components/token/TokenList";
import TransactionList from "@/components/tx/TransactionList";
import { authOptions } from "@/src/authOptions";
import { TokenService } from "@/src/services/TokenService";
import { TransactionService } from "@/src/services/TransactionService";
import { getServerSession } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Rewards",
};

export default async function Page({ searchParams }: any) {
  const { t } = useTranslation("reward");
  const currentPage = searchParams.page ?? "1";
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;
  const page = parseInt(currentPage);

  if (!accessToken) {
    return redirect("/signin");
  }

  const tokenHistory = await TokenService.listMyTokenHistory(accessToken, page);
  return (
    <div className="mt-20 space-y-10">
      <HistoryHeader
        title={t("token-list-title")}
        description={t("token-list-description")}
      />
      <TokenList items={tokenHistory.items} />
      <div className="w-full justify-end flex pr-10 lg:pr-96">
        <Paginator
          total={tokenHistory.metadata.totalPages}
          page={currentPage}
          basePath={"/my/rewards"}
        />
      </div>
    </div>
  );
}
