import HistoryDetail from "@/components/history/HistoryDetail";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import { authOptions } from "@/src/authOptions";
import { VideoService } from "@/src/services/VideoService";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import React from "react";

export async function generateMetadata({ params }: any) {
  return {
    title: "Video Detail",
  };
}

export const revalidate = 10;

export default async function MyVideoDetailPage({ params }: any) {
  const { id } = params;
  const session = await getServerSession(authOptions);
  const accessToken = (session as any)?.accessToken;

  if (!session) {
    return redirect("/signin");
  }

  const video = await VideoService.getMyVideoById(accessToken, id);
  const routes = [
    {
      name: "My Videos",
      href: "/my/videos",
      current: false,
    },
    {
      name: video.title.length > 0 ? video.title : video.id,
      href: `/my/videos/${video.id}`,
      current: true,
    },
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto space-y-10">
      <Breadcrumbs routes={routes} />
      <HistoryDetail video={video} />
    </div>
  );
}
