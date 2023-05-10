import CreateStepper from "@/components/create/Stepper";
import UploadForm from "@/components/create/UploadForm";
import { getSteps } from "@/src/getSteps";

export const metadata = {
  title: "Create",
};

export default function Page() {
  const steps = getSteps();

  return (
    <div className="space-y-10">
      <CreateStepper currentStep={0} steps={steps} />
      <div className="border rounded-3xl p-10">
        <UploadForm />
      </div>
    </div>
  );
}
