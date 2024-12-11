"use client";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Home from "@/pages/home";
import Anime from "@/pages/anime";

export default function Page() {
  const [currentSection, setCurrentSection] = useState("home");
  // const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const [perPage] = useState(25);
  const [topAnime, setTopAnime] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [season, setSeason] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  async function fetchData() {
    if (!isDataFetched) {
      try {
        const [topAnimeRes, carouselRes, seasonRes] = await Promise.all([
          fetch(`https://api.jikan.moe/v4/top/anime?limit=20`),
          fetch(
            `https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&limit=7`
          ),
          fetch(
            `https://api.jikan.moe/v4/anime?status=airing&order_by=popularity&limit=20`
          ),
        ]);

        const [topAnimeData, carouselData, seasonData] = await Promise.all([
          topAnimeRes.json(),
          carouselRes.json(),
          seasonRes.json(),
        ]);

        setTopAnime(topAnimeData.data);
        setCarousel(carouselData.data);
        setSeason(seasonData.data || []);
        setIsDataFetched(true); // Set flag to true after fetching data
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectSection = (section: string) => {
    setCurrentSection(section);
  };
  return (
    <div className={`w-full h-screen`}>
      <Navbar onSelectSection={handleSelectSection} />

      {currentSection === "home" && <Home topAnime={topAnime} carousel={carousel} season={season}/>}
      {currentSection === "anime" && <Anime />}

      {/* <div className="grid grid-cols-5 gap-2 justify-center items-center px-4">
        {loading ? (
          <p>Loading...</p>
          ) : (
            movies.map((movie: Anime) => (
              <ul key={movie.mal_id}>
              <li className="py-2">
              <img
              src={movie.images.webp.image_url}
              alt={movie.title_english}
              className="w-full h-96 object-cover"
              />
              <div className="font-bold truncate">{movie.title}</div>
              <div className="">{movie.score}</div>
              </li>
              </ul>
              ))
              )}
              </div>
              <div className="flex justify-center mb-4">
              <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}>
              Previous
              </button>
              <span className="mx-2">
              Page {currentPage} of {totalPages}
              </span>
              <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}>
              Next
              </button>
              </div> */}
    </div>
  );
}
