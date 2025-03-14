import Image from "next/image";
import type { AnimeType } from "../types/type";

interface AnimeOverlayProps {
  anime: AnimeType;
  onAnimeClick: (anime: AnimeType) => void;
}

interface OverlayDetailProps {
  anime: AnimeType;
  onClose: () => void;
}

const AnimeSwiper: React.FC<AnimeOverlayProps> = ({ anime, onAnimeClick }) => {
  const handleClick = () => {
    onAnimeClick(anime);
  };

  return (
    <div
      className="flex cursor-pointer items-center justify-center w-full"
      onClick={handleClick}>
      <div className="relative rounded-lg w-full">
        <Image
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="object-cover w-auto h-[20rem]"
          height={320}
          width={200}
        />
        <div className="w-full absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent">
          <p className="truncate text-white">{anime.title}</p>
        </div>
      </div>
    </div>
  );
};

const OverlayDetail: React.FC<OverlayDetailProps> = ({ anime, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="w-[80%] h-[90%] bg-slate-700 rounded-xl flex p-8">
        <Image
          src={anime.images.webp.large_image_url}
          alt={anime.title}
          className="object-cover w-auto h-full rounded-lg"
          height={400}
          width={320}
        />
        <div className="ml-8 flex-1 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full">
            Close
          </button>
          <h1 className="text-3xl font-bold mb-4">{anime.title}</h1>
          <h2 className="text-xl text-gray-300 mb-6">{anime.title_japanese}</h2>
          <p className="text-gray-200 mb-6">{anime.synopsis}</p>
          <div className="flex space-x-4">
            <span className="bg-blue-500 px-3 py-1 rounded-full">
              Episodes: {anime.episodes}
            </span>
            {anime.genres.map((genre) => (
              <span
                key={genre.mal_id}
                className="bg-green-500 px-3 py-1 rounded-full">
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AnimeSwiper, OverlayDetail };
