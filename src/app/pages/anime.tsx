"use client";
import { useEffect, useState } from "react";
import { AnimeData } from "@/api/fetch";
import type { AnimeType } from "@/types/type";

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
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="search"
              id="search"
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
          {!animeData.length || searchTerm === ""
            ? topAnime.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="w-[90%] flex justify-center pl-8 pr-4 py-3">
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className="h-[20rem] w-auto object-cover"
                  />
                  <h2>{anime.title}</h2>
                </div>
              ))
            : animeData.map((anime) => (
                <div
                  key={anime.mal_id}
                  className="w-[90%] flex justify-center pl-8 pr-4 py-3">
                  <img
                    src={anime.images.webp.large_image_url}
                    alt={anime.title}
                    className="h-[20rem] w-auto object-cover"
                  />
                  <h2>{anime.title}</h2>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
