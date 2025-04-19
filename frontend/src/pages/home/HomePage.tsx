import Topbar from "@/components/Topbar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const { fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs, madeForYouSongs, trendingSongs, isLoading } =
    useMusicStore();

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
  }, [fetchFeaturedSongs, fetchMadeForYouSongs, fetchTrendingSongs]);
  return (
    <div className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <div>
        <ScrollArea className="h-[calc(100vh-180px)] overflow-y-auto">
          <div className="p-4 sm:p-6">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
            <FeaturedSection />

            <div className="space-y-8">
              <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
              <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default HomePage;
