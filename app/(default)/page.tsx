export const metadata = {
  title: "品视交易网",
  description: "欢迎来到品视交易网",
  openGraph: {
    images: ["https://files.vxvhk.com/logo.png"],
    description: "欢迎来到品视交易网",
    title: "品视交易网",
  },
};

import CategoryDisplay from "@/components/home/CategoryDisplay";
import Creatives from "@/components/home/creatives";
import Cta from "@/components/home/cta";
import Hero from "@/components/home/hero";
import Testimonials from "@/components/home/testimonials";
import VideoDisplay from "@/components/home/VideoDisplay";

export default async function Home() {
  return (
    <>
      {/*@ts-ignore */}
      <Hero />
      <Testimonials />
      {/*@ts-ignore */}
      <CategoryDisplay />
      {/*@ts-ignore */}
      <VideoDisplay />
      {/*@ts-expect-error*/}
      <Creatives />
      {/* <Pricing /> */}
      {/* <Faqs /> */}
      {/* <Blog /> */}
      <Cta />
      <img
        src="https://files.vxvhk.com/logo.png"
        height={500}
        width={1000}
        className="mx-auto"
      />
    </>
  );
}
