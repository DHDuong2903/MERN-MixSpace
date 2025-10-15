import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Pause, Play } from "lucide-react";

interface PlayButtonProps {
  song: Song;
  // optional: nếu được truyền, PlayButton sẽ phát toàn bộ danh sách này (dùng playAlbum)
  playList?: Song[];
  playIndex?: number;
}

const PlayButton = ({ song, playList, playIndex = 0 }: PlayButtonProps) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay, playAlbum } = usePlayerStore();
  const isCurrentSong = currentSong?._id === song._id;

  const handlePlay = () => {
    if (playList) {
      // phát tuần tự trong danh sách được truyền (dành cho Favorites)
      playAlbum(playList, playIndex);
      return;
    }

    if (isCurrentSong) togglePlay();
    else setCurrentSong(song);
  };

  return (
    <Button
      size={"icon"}
      onClick={handlePlay}
      className={`cursor-pointer absolute bottom-3 right-2 border-2 border-green-500/80 bg-zinc-800 hover:scale-105 transition-all 
				opacity-0 translate-y-2 group-hover:translate-y-0 ${
          isCurrentSong ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
    >
      {isCurrentSong && isPlaying ? (
        <Pause className="size-5 text-green-500/80" />
      ) : (
        <Play className="size-5 text-green-500/80" />
      )}
    </Button>
  );
};
export default PlayButton;
