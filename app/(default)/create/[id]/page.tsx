import DescriptionForm from "@/components/create/DescriptionForm";
import CreateStepper from "@/components/create/Stepper";
import VideoStatusErrorPage from "@/components/create/VideoStatusErrorPage";
import { authOptions } from "@/src/authOptions";
import { getSteps } from "@/src/getSteps";
import { CategoryService } from "@/src/services/CategoryService";
import { VideoService, VideoStatus } from "@/src/services/VideoService";
import { getServerSession } from "next-auth";

export const metadata = {
  title: "Create",
};

export default async function Page({ params }: any) {
  const steps = getSteps();
  const session = await getServerSession(authOptions);
  const id = params.id;
  const video = await VideoService.getVideo(id, (session as any).accessToken);
  const categories = await CategoryService.getCategories();

  // check if video is UPLOADED
  if (video.status !== VideoStatus.UPLOADED) {
    return <VideoStatusErrorPage status={video.status} />;
  }

  return (
    <div className="space-y-10">
      <CreateStepper currentStep={1} steps={steps} />
      <div className="border rounded-3xl p-10">
        <DescriptionForm
          session={session}
          video={video}
          categories={categories}
        />
      </div>
    </div>
  );
}
