import CTA from "@/components/home/CTA";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PopularCourses from "@/components/home/PopularCourses";
import Testimonials from "@/components/home/Testimonials";

export default function Home() {
  return (
    <main className="space-y-8 md:space-y-16 lg:space-y-24">
      <Hero />
      <Features />
      <PopularCourses />
      <Testimonials />
      <CTA />
    </main>
  );
}
