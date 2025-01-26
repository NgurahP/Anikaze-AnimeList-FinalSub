"use client";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Home from "@/pages/home";
import Anime from "@/pages/anime";
import Footer from "@/components/footer";

export default function Page() {
  const [currentSection, setCurrentSection] = useState("home");
  const [topAnime, setTopAnime] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [season, setSeason] = useState([]);
  // const [searchResults, setSearchResults] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  async function fetchData() {
    if (!isDataFetched) {
      try {
        const [topAnimeRes, carouselRes, seasonRes] =
          await Promise.all([
            fetch(`https://api.jikan.moe/v4/top/anime?limit=20`),
            fetch(
              `https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&limit=7`
            ),
            fetch(
              `https://api.jikan.moe/v4/anime?status=airing&order_by=popularity&limit=20`
            ),
          ]);

        const [topAnimeData, carouselData, seasonData] =
          await Promise.all([
            topAnimeRes.json(),
            carouselRes.json(),
            seasonRes.json(),
          ]);

        setTopAnime(topAnimeData.data);
        setCarousel(carouselData.data);
        setSeason(seasonData.data || []);
        setIsDataFetched(true);

        // if(query){
        //   const searchRes = await fetch (`https://api.jikan.moe/v4/anime?q=${query}`)
        //   const searchdata = await searchRes.json();
        //   setSearchResults(searchdata.data||[])
        // }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  // const handleSearch = (query) => {
  //   fetchData(query);
  // };
  const handleSelectSection = (section: string) => {
    setCurrentSection(section);
  };
  return (
    <div className={`w-full h-screen`}>
      <Navbar onSelectSection={handleSelectSection} />

      {currentSection === "home" && (
        <Home topAnime={topAnime} carousel={carousel} season={season} />
      )}
      {currentSection === "anime" && <Anime />}
      <Footer />
    </div>
  );
}
