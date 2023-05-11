import CreateStepper from "@/components/create/Stepper";
import UploadForm from "@/components/create/UploadForm";
import { authOptions } from "@/src/authOptions";
import { getSteps } from "@/src/getSteps";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Create",
};

export default async function Page() {
  const steps = getSteps();
  const session = await getServerSession(authOptions);

  if (!session) {
    return redirect("/signin");
  }

  return (
    <div className="space-y-10">
      <CreateStepper currentStep={0} steps={steps} />
      <div className="border rounded-3xl p-10">
        <UploadForm session={session} />
      </div>
    </div>
  );
}
