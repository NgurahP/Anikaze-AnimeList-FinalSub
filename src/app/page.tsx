"use client";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import Home from "@/pages/home";
import Anime from "@/pages/anime";
import Footer from "@/components/footer";
import { AnimeData } from "./api/fetch";

export default function Page() {
  const [currentSection, setCurrentSection] = useState("home");
  const [topAnime, setTopAnime] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [season, setSeason] = useState([]);
  const [isDataFetched, setIsDataFetched] = useState(false);

  async function fetchData() {
    if (!isDataFetched) {
      try {
        const [topAnimeData, carouselData, seasonData] = await Promise.all([
          AnimeData("top/anime", "limit=20"),
          AnimeData("anime", "order_by=favorites&sort=desc&limit=7"),
          AnimeData("anime", "status=airing&order_by=popularity&limit=20"),
        ]);
        setTopAnime(topAnimeData.data);
        setCarousel(carouselData.data);
        setSeason(seasonData.data || []);
        setIsDataFetched(true);
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

      {currentSection === "home" && (
        <Home topAnime={topAnime} carousel={carousel} season={season} />
      )}
      {currentSection === "anime" && <Anime />}
      <Footer />
    </div>
  );
}
