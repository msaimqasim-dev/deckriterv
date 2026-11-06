import { logoPng } from "../assets/images/logo";

/**
 * The original DeckRite RV logo (from deckriterv.com), used unmodified.
 * Its lettering is black, so on the site's dark navbar/footer it sits on a
 * light plate to stay fully legible. On light surfaces use variant="inline".
 */
const VARIANTS = {
  nav: { wrap: "bg-paper px-3 py-1.5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.6)]", img: "h-7 sm:h-8 md:h-9" },
  footer: { wrap: "bg-paper px-5 py-3 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.6)]", img: "h-9 md:h-11" },
  inline: { wrap: "", img: "h-7" },
} as const;

export default function Logo({ variant = "nav", className = "" }: { variant?: keyof typeof VARIANTS; className?: string }) {
  const v = VARIANTS[variant];
  return (
    <span className={`inline-flex items-center ${v.wrap} ${className}`}>
      <img src={logoPng} alt="DeckRite RV" width={789} height={154} draggable={false} className={`block w-auto select-none ${v.img}`} />
    </span>
  );
}
