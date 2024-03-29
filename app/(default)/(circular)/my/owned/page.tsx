import HistoryHeader from "@/components/history/HistoryHeader";
import HistoryList from "@/components/history/HistoryList";
import Paginator from "@/components/shared/Pagination";
import { authOptions } from "@/src/authOptions";
import { VideoService } from "@/src/services/VideoService";
import { getServerSession } from "next-auth";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";

export const metadata = {
  title: "My Videos",
};

export default async function MyVideoPage({ searchParams }: any) {
  const { t } = useTranslation("my");
  const currentPage = searchParams.page ?? "1";
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!accessToken) {
    return redirect("/signin");
  }

  const myVideos = await VideoService.getMyOwned(
    accessToken,
    parseInt(currentPage)
  );

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <HistoryHeader
          title={t("my-owned-history")}
          description={t("my-owned-history-description")}
        />
        <div className="mt-16">
          <HistoryList items={myVideos.items} />
          <div className="w-full justify-end flex pr-10 lg:pr-96">
            <Paginator
              total={myVideos.metadata.totalPages}
              page={myVideos.metadata.page}
              basePath="/my/owned"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
