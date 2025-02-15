export interface AnimeType {
  mal_id: number;
  title: string;
  title_japanese: string;
  synopsis: string;
  episodes: number;
  images: {
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  trailer: {
    youtube_id: string;
    url: string;
    embed_url: string;
    images: {
      large_image_url: string | null;
      maximum_image_url: string;
    };
  };
  genres: [
    {
      mal_id: number;
      type: string;
      name: string;
      url: string;
    }
  ];
}
