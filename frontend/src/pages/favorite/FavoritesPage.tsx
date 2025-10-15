import { useEffect } from "react";
import Topbar from "@/components/Topbar";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import PlayButton from "../home/components/PlayButton";
import AddButton from "./components/AddButton";

const FavoritesPage = () => {
  const { favorites, isLoading, error, fetchFavorites } = useFavoriteStore();

  useEffect(() => {
    fetchFavorites();
  }, [fetchFavorites]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />

      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl font-bold mb-6">Your Favorites List</h1>

          {isLoading && <PlaylistSkeleton />}

          {error && <div className="p-4 text-red-500">{error}</div>}

          {!isLoading && !error && favorites.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full space-y-6 mt-40">
              <img src="/mixspace.png" alt="MixSpace" className="size-16 animate-bounce" />
              <div className="text-center">
                <h3 className="text-zinc-300 text-lg font-medium mb-1">There are no songs in the favorites list</h3>
                <p className="text-zinc-500 text-sm">Please add songs you like</p>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
            {favorites.map((song, index) => (
              <div
                key={song._id}
                className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden hover:bg-zinc-700/50 transition-colors group relative"
              >
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
                />
                <div className="flex-1 p-4">
                  <p className="font-medium truncate">{song.title}</p>
                  <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
                </div>

                {/* Play button */}
                <PlayButton song={song} playList={favorites} playIndex={index} />

                {/* Toggle Favorite */}
                <AddButton song={song} />
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default FavoritesPage;
