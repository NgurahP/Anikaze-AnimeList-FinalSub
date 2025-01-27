export const AnimeData = async (param: string, query: string) => {
  const url = `${process.env.NEXT_PUBLIC_API}/${param}?${query}`;
  const response = await fetch(url);
  const anime = await response.json();
  return anime;
};
