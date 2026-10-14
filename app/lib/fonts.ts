import localFont from "next/font/local";
export const iransans = localFont({
  src: [
    {
      path: "../../public/fonts/IRANSansWeb_UltraLight.woff2",
      weight: "200",
    },
    {
      path: "../../public/fonts/IRANSansWeb_Light.woff2",
      weight: "300",
    },
    {
      path: "../../public/fonts/IRANSansWeb.woff2",
      weight: "400",
    },
    {
      path: "../../public/fonts/IRANSansWeb_Medium.woff2",
      weight: "500",
    },
    {
      path: "../../public/fonts/IRANSansWeb_Bold.woff2",
      weight: "700",
    },
    {
      path: "../../public/fonts/IRANSansWeb_Black.woff2",
      weight: "800",
    },
  ],
  display: "swap",
});
export const yekan = localFont({
  src: [
    {
      path: "../../public/fonts/Yekan.ttf",
      weight: "400",
    },
  ],
});
