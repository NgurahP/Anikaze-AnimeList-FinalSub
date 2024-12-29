"use client";
import { useState } from "react";

interface Anime {
  score: number;
  title_english: string | undefined;
  mal_id: number;
  title: string;
  title_japanese: string;
  synopsis: string;
  images: {
    webp: {
      image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    images: {
      large_image_url: string | null;
      maximum_image_url: string;
    };
  };
}

export default function Anime() {
  // const [query, setQuery] = useState("");

  // const handleSearch = (e) => {
  //   e.preventDefault();
  //   onSearch(query);
  // };
  return (
    <div className={`w-full h-screen`}>
      <div className="w-full h-screen">
        <div className="bg-[#2f2f2f] flex justify-center items-center">
          <form  method="post">
            <input
              type="text"
              
              name="search"
              id="search"
              
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
      </div>
      {/* <div className="search-results">
        {searchResults.length > 0 ? (
          searchResults.map((anime: Anime) => (
            <div key={anime.mal_id} className="anime-item">
              <img
                src={anime.images.webp.image_url}
                alt={anime.title_english}
                className="w-full h-96 object-cover"
              />
              <div className="font-bold truncate">{anime.title}</div>
              <div className="">{anime.score}</div>
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div> */}
    </div>
  );
}
