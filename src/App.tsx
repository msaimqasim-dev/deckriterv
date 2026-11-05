import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import * as A from "./assets/images";
import { Footprints, ShieldCheck, Swatches, FileText, Headset, MagnifyingGlassPlus, ArrowUpRight, Stack, Tire, SunHorizon, CornersOut, Feather, Ruler } from "@phosphor-icons/react";

const IMG = {
  hero: A.heroDesktop,
  heroSm: A.heroMobile,
  interior: A.appInterior,
  garage: A.appGarage,
  deck: A.appDeck,
};
const ease = [0.22, 1, 0.36, 1] as const;

function SplitText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <span ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.08em] mr-[0.25em]">
          <motion.span className="inline-block" initial={{ y: "110%" }} animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: delay + i * 0.06 }}>{w}</motion.span>
        </span>
      ))}
    </span>
  );
}

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }} transition={{ duration: 0.9, ease, delay }}>{children}</motion.div>
  );
}

function Btn({ children, variant = "red", href = "#" }: { children: ReactNode; variant?: "red" | "ghost" | "light"; href?: string }) {
  const s = { red: "bg-brand text-white", ghost: "border border-white/40 text-white", light: "border border-ink/20 text-ink" }[variant];
  return (
    <a href={href} className={`group relative inline-flex items-center gap-3 overflow-hidden px-7 py-4 text-sm font-semibold tracking-wide uppercase ${s}`}>
      <span className="absolute inset-0 -translate-x-full bg-white/15 transition-transform duration-500 group-hover:translate-x-0" />
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
    </a>
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  const links = ["Products & Colors", "Applications", "OEM Solutions", "Resources"];
  return (
    <motion.header initial={{ y: -80 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-ink/85 backdrop-blur-xl py-3" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#" className="flex items-baseline gap-1 text-2xl font-extrabold tracking-tight text-white">
          DeckRite<span className="text-brand">RV</span>
        </a>
        <nav className="hidden gap-9 lg:flex">
          {links.map((l) => (
            <a key={l} href="#" className="group relative text-sm text-white/80 hover:text-white">
              {l}<span className="absolute -bottom-1 left-0 h-px w-0 bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>
        <div className="hidden lg:block"><a href="#cta" className="bg-brand px-5 py-3 text-xs font-semibold uppercase tracking-widest text-white hover:bg-brand-dark">Request Samples</a></div>
        <button onClick={() => setOpen(!open)} className="text-white lg:hidden" aria-label="menu">
          <div className="space-y-1.5"><span className="block h-0.5 w-6 bg-white" /><span className="block h-0.5 w-6 bg-white" /></div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden bg-ink lg:hidden">
            <div className="flex flex-col gap-4 p-6">{links.map((l) => <a key={l} className="text-white" href="#">{l}</a>)}
              <a href="#cta" className="bg-brand px-5 py-3 text-center text-white">Request Samples</a></div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.3]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const op = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  return (
    <section ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden bg-ink">
      <motion.div style={{ scale }} className="absolute inset-0">
        <motion.picture initial={{ clipPath: "inset(0 0 100% 0)" }} animate={{ clipPath: "inset(0 0 0% 0)" }} transition={{ duration: 1.6, ease }} className="block h-full w-full">
          <source media="(max-width: 767px)" srcSet={IMG.heroSm} />
          <img src={IMG.hero} alt="DeckRite ULTRA woven PVC installed in a luxury RV interior" className="h-full w-full object-cover" />
        </motion.picture>
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      <div className="grain absolute inset-0" />

      <motion.div style={{ y, opacity: op }} className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 pt-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-white/70">
          <span className="h-px w-10 bg-brand" /> OEM Flooring for RV Manufacturers
        </motion.div>
        <h1 className="max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-[6.2rem]">
          <SplitText text="RV Flooring." delay={0.7} /><br />
          <SplitText text="Built Into Better" delay={0.9} className="text-white/90" /><br />
          <SplitText text="Experiences." delay={1.1} className="italic font-serif font-normal text-brand-light" />
        </h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 0.8 }}
          className="mt-8 max-w-lg text-lg leading-relaxed text-white/70">
          Flooring solutions for RV manufacturers — from interior living spaces to garages, ramps and patio decks.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.7, duration: 0.8 }} className="mt-10 flex flex-wrap gap-4">
          <Btn href="#cta">Request OEM Samples</Btn><Btn variant="ghost" href="#spaces">Explore Flooring</Btn>
        </motion.div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-0 right-0 hidden border-l border-t border-white/10 bg-ink/60 backdrop-blur-md md:flex">
        {[["1970s", "Proven performance"], ["8", "ULTRA woven patterns"], ["102\u2033", "Standard roll width"]].map(([n, l]) => (
          <div key={l} className="border-r border-white/10 px-8 py-6 last:border-0">
            <div className="text-3xl font-bold text-white">{n}</div><div className="mt-1 text-xs uppercase tracking-wider text-white/50">{l}</div>
          </div>
        ))}
      </motion.div>
      <div className="absolute bottom-8 left-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/50 md:left-1/2 md:-translate-x-1/2">
        <div className="relative h-10 w-px overflow-hidden bg-white/20"><motion.span animate={{ y: [-40, 40] }} transition={{ repeat: Infinity, duration: 1.6 }} className="absolute h-4 w-px bg-brand" /></div>Scroll
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["ULTRA Woven PVC", "DeckRite Plank", "Shield RV", "Diamond Plate", "Raised Coin", "Ramp / Deck", "Toy Hauler Garages"];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-paper py-6">
      <div className="marquee flex w-max gap-12 whitespace-nowrap">
        {[...items, ...items, ...items].map((t, i) => (
          <span key={i} className="flex items-center gap-12 text-2xl font-bold uppercase tracking-tight text-ink/80 md:text-4xl">
            {t}<span className="text-brand">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const spaces = [
  { n: "01", title: "RV Interiors", link: "Explore woven flooring", img: IMG.interior, pos: "40% 50%", desc: "Luxurious ULTRA woven PVC patterns that add warmth, comfort and a touch of elegance to every coach." },
  { n: "02", title: "Toy Hauler Garages", link: "Explore durable surfaces", img: IMG.garage, pos: "52% 40%", desc: "Shield RV in diamond plate or raised coin, engineered to resist the toughest garage environments." },
  { n: "03", title: "Ramps & Patio Decks", link: "Explore outdoor applications", img: IMG.deck, pos: "42% 55%", desc: "DeckRite Plank brings a realistic wood look to ramps and exterior decks, with slip resistance built in." },
];

function Spaces() {
  const [active, setActive] = useState(0);
  return (
    <section id="spaces" className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-7 grid items-end gap-5 md:mb-8 md:grid-cols-2">
          <div>
            <Reveal><p className="mb-4 text-xs uppercase tracking-[0.35em] text-brand">— Applications</p></Reveal>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink md:text-6xl">
              <SplitText text="The right flooring" /><br /><SplitText text="for every space." delay={0.2} className="font-serif italic font-normal" />
            </h2>
          </div>
          <Reveal delay={0.2}><p className="max-w-md text-ink/60 md:ml-auto">One partner for the entire coach. Hover each zone to discover how DeckRite RV performs from the living room to the ramp door.</p></Reveal>
        </div>
        <div className="flex h-auto flex-col gap-3 md:h-[580px] md:flex-row">
          {spaces.map((s, i) => (
            <motion.a href="#" key={s.title} onMouseEnter={() => setActive(i)} layout
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, ease, delay: i * 0.12 }}
              className={`group relative h-[420px] overflow-hidden md:h-full transition-[flex] duration-700 ease-out ${active === i ? "md:flex-[2.4]" : "md:flex-1"}`}>
              <img src={s.img} alt={s.title} style={{ objectPosition: s.pos }} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute left-6 top-6 font-mono text-sm text-white/70">{s.n} / 03</div>
              <div className="absolute inset-x-0 bottom-0 p-8">
                <h3 className="text-2xl font-bold text-white md:text-3xl">{s.title}</h3>
                <div className={`grid transition-all duration-700 ${active === i ? "md:grid-rows-[1fr] md:opacity-100" : "md:grid-rows-[0fr] md:opacity-0"}`}>
                  <p className="overflow-hidden pt-3 text-white/70 max-w-md">{s.desc}</p>
                </div>
                <span className="mt-5 inline-flex items-center gap-2 border-b border-brand-light pb-1 text-sm font-semibold text-brand-light">{s.link} →</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

const products = [
  {
    name: "Tan Jute", code: "ULTRA · 01", zone: "DeckRite ULTRA Woven PVC", img: A.tanJuteHd, thumb: A.tanJuteThumb, tint: "#a8957c",
    desc: "A warm woven PVC that's changing the way owners think about RV flooring. Luxury patterns with feet-friendly comfort, on your choice of backing.",
    specs: [
      { icon: Stack, label: "Construction", value: "Woven PVC" },
      { icon: Feather, label: "Backing", value: "5 mm foam" },
      { icon: Swatches, label: "Patterns", value: "8 options" },
    ],
  },
  {
    name: "Gray Plank", code: "PLANK · 02", zone: "DeckRite Plank", img: A.grayPlankHd, thumb: A.grayPlankThumb, tint: "#8a8578",
    desc: "A realistic wood look created for toy hauler ramps and exterior decks — durable and slip resistant, without the industrial look.",
    specs: [
      { icon: Ruler, label: "Thickness", value: "80 mil" },
      { icon: SunHorizon, label: "Best for", value: "Ramp & deck" },
      { icon: Footprints, label: "Surface", value: "Slip resistant" },
    ],
  },
  {
    name: "Raised Black Coin", code: "SHIELD · 03", zone: "Shield RV · Raised Coin", img: A.raisedBlackCoinHd, thumb: A.raisedBlackCoinThumb, tint: "#26272a",
    desc: "Raised coin embossing engineered to resist the rigors of tougher environments — toy hauler garages, enclosed trailers and micro campers.",
    specs: [
      { icon: Ruler, label: "Emboss", value: "2.15 mm" },
      { icon: Tire, label: "Best for", value: "Garage floors" },
      { icon: ShieldCheck, label: "Compound", value: "Virgin PVC" },
    ],
  },
];

function Products() {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, on: false });
  const p = products[active];
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setZoom({ x: ((e.clientX - r.left) / r.width) * 100, y: ((e.clientY - r.top) / r.height) * 100, on: true });
  };
  return (
    <section className="relative overflow-hidden bg-ink py-14 text-white md:py-16">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={{ background: `radial-gradient(60% 50% at 75% 40%, ${p.tint}33, transparent 70%)`, transition: "background 0.8s" }} />
      <div className="grain absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="mb-7 grid items-end gap-5 md:mb-8 md:grid-cols-2">
          <div>
            <Reveal><p className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-brand-light"><Swatches size={18} weight="duotone" /> Products & Colors</p></Reveal>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight md:text-[3.25rem]">
              <SplitText text="See the texture." /><br /><SplitText text="Find your finish." delay={0.2} className="font-serif italic font-normal text-brand-light" />
            </h2>
          </div>
          <Reveal delay={0.2}><p className="max-w-md text-white/60 md:ml-auto">Choose a surface below, then move your cursor over the sample to see the grain, weave and grip up close.</p></Reveal>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] lg:gap-10">
          {/* Viewer */}
          <Reveal>
            <div
              onMouseMove={move}
              onMouseLeave={() => setZoom((z) => ({ ...z, on: false }))}
              className="group relative aspect-[16/9] w-full cursor-crosshair overflow-hidden bg-black ring-1 ring-white/10 shadow-[0_50px_100px_-30px_rgba(0,0,0,0.8)]"
            >
              <AnimatePresence mode="popLayout">
                <motion.div key={p.code} initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7, ease }} className="absolute inset-0">
                  <img
                    src={p.img}
                    alt={`${p.name} — ${p.zone} flooring sample`}
                    draggable={false}
                    className="absolute inset-0 h-full w-full select-none object-cover"
                    style={{ transform: `scale(${zoom.on ? 2.6 : 1})`, transformOrigin: `${zoom.x}% ${zoom.y}%`, transition: "transform 0.45s cubic-bezier(.22,1,.36,1)" }}
                  />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/50" />

              {/* corner marks */}
              {["left-4 top-4 border-l border-t", "right-4 top-4 border-r border-t", "left-4 bottom-4 border-l border-b", "right-4 bottom-4 border-r border-b"].map((c) => (
                <span key={c} className={`pointer-events-none absolute h-6 w-6 border-white/50 ${c}`} />
              ))}

              <div className="pointer-events-none absolute left-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-light" /> {p.code}
              </div>
              <div className={`pointer-events-none absolute right-5 top-5 flex items-center gap-2 bg-black/40 px-3 py-2 text-[10px] uppercase tracking-[0.25em] backdrop-blur-md transition-opacity duration-300 ${zoom.on ? "opacity-100" : "opacity-0"}`}>
                <MagnifyingGlassPlus size={14} weight="duotone" /> 2.6× Detail
              </div>
              <div className={`pointer-events-none absolute inset-x-0 bottom-5 flex justify-center transition-opacity duration-300 ${zoom.on ? "opacity-0" : "opacity-100"}`}>
                <span className="flex items-center gap-2 rounded-full bg-black/50 px-4 py-2 text-xs text-white/80 backdrop-blur-md">
                  <CornersOut size={16} weight="duotone" /> Hover to inspect texture
                </span>
              </div>
            </div>
          </Reveal>

          {/* Info */}
          <div className="flex flex-col">
            <AnimatePresence mode="wait">
              <motion.div key={p.code} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.5, ease }}>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                  <Stack size={16} weight="duotone" className="text-brand-light" /> {p.zone}
                </div>
                <h3 className="mt-2 text-3xl font-bold md:text-4xl">{p.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60 md:text-base">{p.desc}</p>
                <div className="mt-5 grid grid-cols-3 gap-px overflow-hidden bg-white/10">
                  {p.specs.map((s, i) => (
                    <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.08 }} className="bg-ink p-3 md:p-4">
                      <s.icon size={22} weight="duotone" className="text-brand-light" />
                      <div className="mt-2 text-xs font-semibold md:text-sm">{s.value}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-wider text-white/40">{s.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Btn>View Products & Colors</Btn>
              <a href="#cta" className="group inline-flex items-center gap-2 px-2 py-4 text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white">
                Order this sample <ArrowUpRight size={18} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="mt-4 grid grid-cols-3 gap-3 md:gap-5 lg:w-[calc((100%-2.5rem)*1.45/2.45)]">
          {products.map((t, i) => (
            <Reveal key={t.code} delay={i * 0.08}>
              <button onClick={() => setActive(i)} className={`group relative block w-full text-left transition ${active === i ? "" : "opacity-60 hover:opacity-100"}`}>
                <div className="relative aspect-[21/9] overflow-hidden ring-1 ring-white/10">
                  <img src={t.thumb} alt={`${t.name} swatch`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-125" />
                  {active === i && <motion.span layoutId="thumbRing" className="absolute inset-0 ring-2 ring-inset ring-brand-light" transition={{ type: "spring", stiffness: 300, damping: 30 }} />}
                </div>
                <div className="mt-2 flex items-center justify-between gap-2">
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="hidden text-[11px] uppercase tracking-wider text-white/40 sm:block">{t.zone}</div>
                  </div>
                  <span className="font-mono text-xs text-white/40">0{i + 1}</span>
                </div>
                <div className="mt-2 h-px w-full bg-white/10">
                  {active === i && <motion.div layoutId="thumbBar" className="h-px bg-brand-light" />}
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const Icon = {
  design: <Swatches size={30} weight="duotone" />,
  doc: <FileText size={30} weight="duotone" />,
  chat: <Headset size={30} weight="duotone" />,
};

function Lineup() {
  const items = [
    { icon: Icon.design, t: "Design Options", d: "Compare finishes, constructions and backings side-by-side to spec the perfect floor for each model.", l: "Compare Options" },
    { icon: Icon.doc, t: "Technical Resources", d: "Find specifications, data sheets and installation guidance for your production teams.", l: "View Resources" },
    { icon: Icon.chat, t: "OEM Support", d: "Discuss your application directly with our team — from first prototype to full production.", l: "Talk to Our Team" },
  ];
  return (
    <section className="bg-paper py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-ink md:text-6xl">
            <SplitText text="Built for your" /><br /><SplitText text="next RV lineup." delay={0.2} className="font-serif italic font-normal" />
          </h2>
          <Reveal><p className="max-w-sm text-ink/60">Everything your engineering, design and purchasing teams need — in one place.</p></Reveal>
        </div>
        <div className="grid border-t border-ink/10 md:grid-cols-3">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 0.12}>
              <a href="#" className="group relative block h-full overflow-hidden border-b border-ink/10 p-10 md:border-b-0 md:border-r md:last:border-r-0">
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-out group-hover:scale-y-100" />
                <div className="relative">
                  <div className="flex items-center justify-between">
                    <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-brand/10 to-brand/0 text-brand ring-1 ring-brand/20 transition duration-500 group-hover:rotate-[-6deg] group-hover:from-brand group-hover:to-brand-dark group-hover:text-white group-hover:ring-brand">{it.icon}</div>
                    <span className="font-mono text-sm text-ink/30 group-hover:text-white/30">0{i + 1}</span>
                  </div>
                  <h3 className="mt-10 text-2xl font-bold text-ink transition group-hover:text-white">{it.t}</h3>
                  <p className="mt-3 text-ink/60 transition group-hover:text-white/60">{it.d}</p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:text-brand-light">{it.l}<span className="transition-transform group-hover:translate-x-2">→</span></span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const p = useSpring(useTransform(scrollYProgress, [0, 1], [0.85, 1]), { stiffness: 80, damping: 20 });
  const r = useTransform(scrollYProgress, [0, 1], [48, 0]);
  return (
    <section id="cta" ref={ref} className="bg-paper px-0 pb-0">
      <motion.div style={{ scale: p, borderRadius: r }} className="relative overflow-hidden bg-ink">
        <div className="absolute inset-0 opacity-25"><img src={IMG.deck} alt="" className="h-full w-full object-cover" /></div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-brand/40" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 py-28 md:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-brand-light">— Start a conversation</p>
            <h2 className="text-4xl font-extrabold leading-[1] tracking-tight text-white md:text-7xl">
              <SplitText text="Let's talk about" /><br /><SplitText text="your next build." delay={0.2} className="font-serif italic font-normal text-brand-light" />
            </h2>
            <Reveal delay={0.3}><p className="mt-6 max-w-md text-white/60">Request samples for your design and production teams — delivered fast, ready to evaluate.</p></Reveal>
          </div>
          <Reveal delay={0.4} className="md:justify-self-end">
            <a href="#" className="group relative flex h-48 w-48 items-center justify-center rounded-full bg-brand text-center text-sm font-bold uppercase tracking-widest text-white transition-transform duration-500 hover:scale-110">
              <svg className="spin absolute inset-0 h-full w-full" viewBox="0 0 200 200">
                <defs><path id="c" d="M100,100 m-80,0 a80,80 0 1,1 160,0 a80,80 0 1,1 -160,0" /></defs>
                <text fill="rgba(255,255,255,0.6)" fontSize="11" letterSpacing="4"><textPath href="#c">REQUEST OEM SAMPLES • DECKRITE RV • REQUEST OEM SAMPLES •</textPath></text>
              </svg>
              <span className="text-3xl transition-transform group-hover:rotate-45">↗</span>
            </a>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-white/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col justify-between gap-10 border-b border-white/10 pb-12 md:flex-row">
          <div>
            <div className="text-3xl font-extrabold text-white">DeckRite<span className="text-brand">RV</span></div>
            <p className="mt-3 max-w-xs text-sm">Flooring solutions for RV manufacturers. A family of brands alongside DeckRite and MariDeck.</p>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {["Products & Colors", "Applications", "OEM Solutions", "Resources", "Contact"].map((l) => <a key={l} href="#" className="hover:text-white">{l}</a>)}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4 pt-8 text-xs md:flex-row">
          <span>© {new Date().getFullYear()} DeckRite RV. All rights reserved.</span>
          <span className="flex gap-6"><a href="https://deckrite.com" className="hover:text-white">DeckRite.com</a><a href="https://marideck.net" className="hover:text-white">MariDeck.net</a></span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="font-sans antialiased">
      <motion.div style={{ scaleX: scrollYProgress }} className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-brand" />
      <Nav /><Hero /><Marquee /><Spaces /><Products /><Lineup /><CTA /><Footer />
    </div>
  );
}
