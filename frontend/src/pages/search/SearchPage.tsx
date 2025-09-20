import { useState, useEffect } from "react";
import Topbar from "@/components/Topbar";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import AddButton from "../favorite/components/AddButton";
import { SignedIn } from "@clerk/clerk-react";
import { usePlayerStore } from "@/stores/usePlayerStore";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);
  const { playAlbum } = usePlayerStore();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim()) {
        fetchSongs(query);
      } else {
        setSongs([]);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const fetchSongs = async (keyword: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/songs/search?q=${encodeURIComponent(keyword)}`);
      setSongs(res.data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlePlaySong = (index: number) => {
    playAlbum(songs, index);
  };

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />

      <div className="flex p-6 items-center gap-2 w-full">
        <Input
          className="focus-visible:ring-0 text-sm py-5 px-4"
          placeholder="Search for a song or artist..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="px-6">
        {loading && <p className="text-white">Searching...</p>}

        {!loading && songs.length > 0 && (
          <ScrollArea className="h-120 rounded-md border border-zinc-700 p-2">
            <ul className="space-y-3">
              {songs.map((song, idx) => (
                <li
                  key={song._id}
                  onClick={() => handlePlaySong(idx)}
                  className="relative flex items-center gap-3 p-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 cursor-pointer transition-colors group"
                >
                  <img src={song.imageUrl} alt={song.title} className="w-12 h-12 rounded-md object-cover" />
                  <div className="flex-1">
                    <p className="text-white font-medium">{song.title}</p>
                    <p className="text-sm text-zinc-300">{song.artist}</p>
                  </div>

                  <SignedIn>
                    <AddButton song={song} />
                  </SignedIn>
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}

        {!loading && songs.length === 0 && query && <p className="text-zinc-400">No songs found for "{query}"</p>}
      </div>
    </main>
  );
};

export default SearchPage;
