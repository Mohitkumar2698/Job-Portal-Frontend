import { lazy, Suspense } from "react";
import Hero from "../components/Hero";

// Lazy load below-the-fold components
const SlidingLogos = lazy(() => import("../components/SlidingLogos"));
const Categories = lazy(() => import("../components/Categories"));
const HowItWorks = lazy(() => import("../components/HowItWorks"));

// Simple loading component
const SectionLoader = () => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const Home = () => {
  return (
    <div className="bg-gray-900">
      <Hero />
      <Suspense fallback={<SectionLoader />}>
        <SlidingLogos />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <Categories />
      </Suspense>
      <Suspense fallback={<SectionLoader />}>
        <HowItWorks />
      </Suspense>
    </div>
  );
};

export default Home;
