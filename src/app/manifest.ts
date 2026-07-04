import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Akriti's Birthday Surprise",
    short_name: "Surprise for Aku",
    description: "A premium romantic birthday surprise from Shashank to Aku.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff8f9",
    theme_color: "#ff85a1",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
