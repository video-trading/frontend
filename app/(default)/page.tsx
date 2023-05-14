export const metadata = {
  title: "Home - Creative",
  description: "Page description",
};

import Hero from "@/components/home/hero";
import Inspiration from "@/components/home/inspiration";
import Carousel from "@/components/home/carousel";
import Creatives from "@/components/home/creatives";
import Pricing from "@/components/home/pricing";
import Testimonials from "@/components/home/testimonials";
import Faqs from "@/components/home/faqs";
import Blog from "@/components/home/blog";
import Cta from "@/components/home/cta";
import { CategoryService } from "@/src/services/CategoryService";
import { VideoService } from "@/src/services/VideoService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/authOptions";
import CategoryDisplay from "@/components/home/CategoryDisplay";
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
      <Creatives />
      {/* <Pricing /> */}
      {/* <Faqs /> */}
      {/* <Blog /> */}
      <Cta />
    </>
  );
}
