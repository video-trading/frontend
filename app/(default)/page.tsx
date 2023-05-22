export const metadata = {
  title: "Home - Creative",
  description: "Page description",
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
    </>
  );
}
