import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";
import PopularCourses from "@/components/home/PopularCourses";

export default function Home() {
  return (
    <main className="wrapper space-y-28">
      <Hero />
      <Features />
      <PopularCourses />
    </main>
  );
}
