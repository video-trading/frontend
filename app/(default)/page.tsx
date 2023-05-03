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

export default async function Home() {
  const categories = await CategoryService.getCategories();
  const videos = await VideoService.getVideos(1);

  return (
    <>
      <Hero />
      <Testimonials />
      <Carousel categories={categories} />
      <Inspiration videos={videos.items} />
      <Creatives />
      {/* <Pricing /> */}
      {/* <Faqs /> */}
      {/* <Blog /> */}
      <Cta />
    </>
  );
}
