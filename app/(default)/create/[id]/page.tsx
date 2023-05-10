import DescriptionForm from "@/components/create/DescriptionForm";
import CreateStepper from "@/components/create/Stepper";
import { getSteps } from "@/src/getSteps";

export const metadata = {
  title: "Create",
};

export default function Page() {
  const steps = getSteps();

  return (
    <div className="space-y-10">
      <CreateStepper currentStep={1} steps={steps} />
      <div className="border rounded-3xl p-10">
        <DescriptionForm />
      </div>
    </div>
  );
}
