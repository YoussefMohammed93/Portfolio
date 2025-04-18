import Link from "next/link";

import { Outfit } from "next/font/google";

const OutfitFont = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const Logo = () => {
  return (
    <Link
      href="/"
      className={`text-3xl md:text-4xl font-medium text-primary ${OutfitFont.className}`}
      aria-label="Matrix"
    >
      Matrix <span className="text-[#EC1552]">.</span>
    </Link>
  );
};
