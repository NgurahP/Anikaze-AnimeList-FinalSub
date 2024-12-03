"use client";
import Navbar from "./components/navbar";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Home() {
  const [topAnime, setTopAnime] = useState([]);
  const [carousel, setCarousel] = useState([]);
  const [season, setSeason] = useState([]);
  // const [loading, setLoading] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [totalPages, setTotalPages] = useState(0);
  // const [perPage] = useState(25);

  async function getData() {
    // setLoading(true);
    const url = `https://api.jikan.moe/v4/top/anime?limit=25`;
    const res = await fetch(url);
    const resData = await res.json();

    setTopAnime(resData.data);
    // setTotalPages(resData.pagination.last_visible_page);
    // setLoading(false);
  }

  async function getCarouselData() {
    const url = `https://api.jikan.moe/v4/anime?order_by=favorites&sort=desc&limit=7`;
    const res = await fetch(url);
    const resData = await res.json();

    setCarousel(resData.data);
  }

  async function getSeasonData() {
    const url = `https://api.jikan.moe/v4/anime?status=airing&order_by=popularity`;
    const res = await fetch(url);
    const resData = await res.json();

    setSeason(resData.data);
  }

  // function handlePageChange(page: SetStateAction<number>) {
  //   setCurrentPage(page);
  //   getData();
  // }

  useEffect(() => {
    getData();
    getCarouselData();
    getSeasonData();
  }, []);

  return (
    <div className="w-full h-screen">
      <Navbar />
      {/* Carousel section */}

      <div className="w-full h-full">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}>
          {carousel.map((movie: any) => (
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
                        <span className="text-violet-500 hover:text-violet-600 transition-colors duration-300 ease-in-out font-bold">
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
              {/* <img
                src={movie.trailer.images.large_image_url}
                alt={movie.title_english}
                className="w-full h-full object-cover"
              /> */}
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
          {topAnime.map((top: any) => (
            <SwiperSlide key={top.mal_id}>
              <div>
                <Image
                  src={top.images.webp.large_image_url}
                  alt={top.title}
                  className="h-[20rem] w-auto object-cover"
                />
                <div className="">
                  <p className="truncate">{top.title}</p>
                </div>
              </div>
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
          {season.map((season: any) => (
            <SwiperSlide key={season.mal_id}>
              <div>
                <Image
                  src={season.images.webp.large_image_url}
                  alt={season.title}
                  className="h-[20rem] w-auto object-cover"
                />
                <div className="">
                  <p className="truncate">{season.title}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {/* <div className="grid grid-cols-5 gap-2 justify-center items-center px-4">
        {loading ? (
          <p>Loading...</p>
        ) : (
          movies.map((movie: any) => (
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
