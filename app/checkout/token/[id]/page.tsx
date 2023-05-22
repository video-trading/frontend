import NotPurchasablePage from "@/components/payment/NotPurchasablePage";
import TokenPaymentCard from "@/components/payment/TokenPaymentCard";
import VideoPurchaseSummary from "@/components/payment/VideoPurchaseSummary";
import { authOptions } from "@/src/authOptions";
import { PaymentService } from "@/src/services/PaymentService";
import { getServerSession } from "next-auth/next";
import useTranslation from "next-translate/useTranslation";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Check out",
};

export default async function Page({ params }: any) {
  const { t } = useTranslation("common");
  const session = await getServerSession(authOptions);
  const accessToken = (session as any).accessToken;
  const videoId = params.id;

  if (!session) {
    redirect("/unauthorized");
  }

  const paymentInfo = await PaymentService.getCheckoutWithTokenPaymentInfo(
    accessToken,
    videoId
  );

  if (!paymentInfo.video.purchasable) {
    return <NotPurchasablePage />;
  }

  return (
    <>
      <main className="relative h-screen">
        <div className="h-80 lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
          <video
            src="https://files.vxvhk.com/checkout.mp4"
            autoPlay
            loop
            muted
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div>
          <VideoPurchaseSummary {...paymentInfo}>
            <TokenPaymentCard accessToken={accessToken} videoId={videoId} />
          </VideoPurchaseSummary>
        </div>
      </main>
    </>
  );
}
