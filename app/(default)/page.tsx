export const metadata = {
  title: "Home - Creative",
  description: "Page description",
};

import Hero from "@/components/hero";
import Inspiration from "@/components/inspiration";
import Carousel from "@/components/carousel";
import Creatives from "@/components/creatives";
import Pricing from "@/components/pricing";
import Testimonials from "@/components/testimonials";
import Faqs from "@/components/faqs";
import Blog from "@/components/blog";
import Cta from "@/components/cta";
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
