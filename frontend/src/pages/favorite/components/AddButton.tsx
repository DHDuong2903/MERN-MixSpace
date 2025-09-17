import { Button } from "@/components/ui/button";
import { useFavoriteStore } from "@/stores/useFavoriteStore";
import { Song } from "@/types";
import { Heart } from "lucide-react";

interface AddButtonProps {
  song: Song;
}

const AddButton = ({ song }: AddButtonProps) => {
  const { favorites, addFavorite, removeFavorite } = useFavoriteStore();

  const isFav = favorites.some((f) => f._id === song._id);

  const handleClick = () => {
    if (isFav) removeFavorite(song._id);
    else addFavorite(song._id);
  };

  return (
    <Button
      size="icon"
      onClick={handleClick}
      className={`
        absolute bottom-3 right-12 cursor-pointer
        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
        transition-all hover:scale-105
        ${isFav ? "bg-red-500 text-white hover:bg-red-500" : "bg-zinc-700 text-white hover:bg-red-500"}
      `}
    >
      <Heart className="size-5" />
    </Button>
  );
};

export default AddButton;
