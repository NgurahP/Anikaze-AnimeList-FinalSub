import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import type { AnimeType } from "../types/type";
import { AnimeSwiper, OverlayDetail } from "../components/overlay";

interface homeType {
  topAnime: AnimeType[];
  carousel: AnimeType[];
  season: AnimeType[];
}

export default function Home({ topAnime, carousel, season }: homeType) {
  const [selectedAnime, setSelectedAnime] = useState<AnimeType | null>(null);

  const handleAnimeClick = (anime: AnimeType) => {
    setSelectedAnime(anime);
  };

  const handleCloseOverlay = () => {
    setSelectedAnime(null);
  };

  return (
    <div className="bg-gray-600">
      <div className="w-full h-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          onSwiper={(swiper) => console.log(swiper)}>
          {carousel.map((movie: AnimeType) => (
            <SwiperSlide key={movie.mal_id}>
              <div
                className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${
                    movie.trailer.images.large_image_url == null
                      ? movie.trailer.images.maximum_image_url
                      : movie.trailer.images.large_image_url
                  })`,
                }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-800 from-10% to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="text-left flex flex-col">
                    <span className="text-4xl font-extrabold text-white">
                      {movie.title}
                    </span>
                    <br />
                    <span className="text-xl text-slate-400">
                      ({movie.title_japanese})
                    </span>
                    <br />
                    {movie.synopsis.length > 350 ? (
                      <p className="text-[13px] md:text-[17px] text-neutral-200 md:max-w-[650px] lg:max-w-[780px]">
                        {movie.synopsis.substring(0, 350)}...&nbsp;
                        <span className="text-violet-500 hover:text-violet-600 transition-colors duration-300 ease-in-out font-bold cursor-pointer">
                          Read More
                        </span>
                      </p>
                    ) : (
                      <p className="text-[13px] md:text-[17px] text-neutral-200 md:max-w-[650px] lg:max-w-[780px]">
                        {movie.synopsis}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full py-4">
        <h1 className="font-bold text-3xl p-4">Top Anime</h1>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={7}
          navigation>
          {topAnime.map((top: AnimeType) => (
            <SwiperSlide key={top.mal_id}>
              <AnimeSwiper
                anime={top}
                onAnimeClick={handleAnimeClick} // Pass the click handler
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full py-4">
        <h1 className="font-bold text-3xl p-4">On going Anime</h1>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={7}
          navigation>
          {season.map((season: AnimeType) => (
            <SwiperSlide key={season.mal_id}>
              <AnimeSwiper
                anime={season}
                onAnimeClick={handleAnimeClick} // Pass the click handler
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Render OverlayDetail if selectedAnime is not null */}
      {selectedAnime && (
        <OverlayDetail anime={selectedAnime} onClose={handleCloseOverlay} />
      )}
    </div>
  );
}
