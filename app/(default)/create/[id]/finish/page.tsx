import DescriptionForm from "@/components/create/DescriptionForm";
import CreateStepper from "@/components/create/Stepper";
import { getSteps } from "@/src/getSteps";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Create",
};

export default function Page({ params }: any) {
  const steps = getSteps();
  const id = params.id;

  return (
    <div className="space-y-10">
      <CreateStepper currentStep={2} steps={steps} />
      <div className="border rounded-3xl p-10 flex flex-col justify-center items-center">
        <h1 className="text-lg font-bold">Video has been uploaded</h1>
        <Image
          src={"/images/congrats.webp"}
          height={300}
          width={300}
          alt="Finish"
        />
        {/*@ts-expect-errors */}
        <Link href={"/my/videos/" + id} className="text-sky-600">
          Check the video status
        </Link>
      </div>
    </div>
  );
}
