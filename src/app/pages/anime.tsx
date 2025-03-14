"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimeData } from "@/api/fetch";
import type { AnimeType } from "@/types/type";
import { OverlayDetail } from "@/components/overlay";

interface AnimeProps {
  topAnime: AnimeType[];
}

export default function Anime({ topAnime }: AnimeProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [animeData, setAnimeData] = useState<AnimeType[]>([]);
  const [metadata, setMetadata] = useState({
    title: "AniKaze - ",
    description: "Search for your favorite anime.",
  });
  const [selectedAnime, setSelectedAnime] = useState<AnimeType | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const handleAnimeClick = (anime: AnimeType) => {
    setSelectedAnime(anime);
    setShowOverlay(true);
  };

  const handleCloseOverlay = () => {
    setShowOverlay(false);
    setSelectedAnime(null);
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm) {
      const searchData = await AnimeData(`anime`, `q=${searchTerm}`);
      setAnimeData(searchData.data);
      if (searchData.data.length > 0) {
        setMetadata({
          title: `AniKaze - ${searchTerm}`,
          description: searchData.data[0].synopsis,
        });
      }
    } else {
      setAnimeData([]);
    }
  };

  useEffect(() => {
    document.title = metadata.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metadata.description);
    }
  }, [metadata]);

  return (
    <div className={`w-full h-auto bg-gray-600`}>
      <div className="w-full h-auto">
        <div className="bg-[#2f2f2f] flex justify-center items-center">
          <form onSubmit={handleSearch} className="w-full flex justify-center">
            <input
              type="text"
              name="search"
              id="search"
              className="px-5 py-3 bg-slate-600 rounded-full w-[30%]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for anime..."
            />
            <button type="submit">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-search">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </form>
        </div>

        <div className="w-full grid grid-cols-5">
          {!animeData.length
            ? topAnime.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="flex cursor-pointer items-center justify-center h-auto w-full pb-4 pl-6 pr-4 pt-6 rounded-lg">
                  <div className="relative rounded-lg w-full">
                    <Image
                      width={320}
                      height={160}
                      layout="responsive"
                      src={anime.images.webp.large_image_url}
                      alt={anime.title}
                      className="object-cover h-[20rem] w-[16rem]"
                    />
                    <div className="w-full absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <p className="truncate text-white">{anime.title}</p>
                    </div>
                  </div>
                </div>
              ))
            : animeData.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="flex cursor-pointer items-center justify-center w-full pb-4 pl-6 pr-4 pt-6 rounded-lg">
                  <div className="relative rounded-lg w-full">
                    <Image
                      width={320}
                      height={160}
                      layout="responsive"
                      src={anime.images.webp.large_image_url}
                      alt={anime.title}
                      className="object-cover h-[20rem] w-auto"
                    />
                    <div className="w-full absolute bottom-0 left-0 p-2 bg-gradient-to-t from-black to-transparent">
                      <p className="truncate text-white">{anime.title}</p>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {showOverlay && selectedAnime && (
        <OverlayDetail anime={selectedAnime} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}
