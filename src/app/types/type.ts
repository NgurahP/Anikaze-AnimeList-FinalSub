export interface AnimeType {
    mal_id: number;
    title: string;
    title_japanese: string;
    synopsis: string;
    images: {
      webp: {
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