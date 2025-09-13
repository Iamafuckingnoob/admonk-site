"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Activity, Rocket, Megaphone, ShoppingCart, Code, MessageSquare,
  Palette, Zap, Check, ChevronRight, PhoneCall, Calendar, Inbox, BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { HashLink } from "./hash-link";
import { useActiveSection } from "../../app/hooks/useActiveSection";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** EARTHY PALETTE (consistent): dark stone + emerald + amber + sand */

const features = [
  { icon: <ShoppingCart className="w-6 h-6"/>, title: "Websites & Shops", points: ["Shopify / Wix / WooCommerce","Razorpay setup & checkout","Shipping & order flows"]},
  { icon: <Megaphone className="w-6 h-6"/>, title: "Performance Ads", points: ["Meta Ads strategy & build","Pixel, CAPI, events","Retargeting & lookalikes"]},
  { icon: <MessageSquare className="w-6 h-6"/>, title: "Messaging & Automations", points: ["WhatsApp API funnels","Leads → CRM handoff","Chatbot + follow-ups"]},
  { icon: <Palette className="w-6 h-6"/>, title: "Branding & Content", points: ["Brand story & positioning","Reels/UGC brief & edit","Content calendar"]},
  { icon: <Code className="w-6 h-6"/>, title: "Custom Fixes", points: ["Landing pages in days","Tracking/debug help","Light custom code"]},
  { icon: <BarChart3 className="w-6 h-6"/>, title: "Analytics & Reporting", points: ["Dashboard setup","Campaign performance insights","KPI tracking & improvement"]},
];

const offers = [
  { icon: <Rocket className="w-6 h-6"/>, title: "Site-in-a-Week", desc: "A crisp 1-page site or Shopify starter that sells.", bullets: ["Wireframe + copy done with you","Build on Shopify/Wix/Next","Basic SEO, Pixel, forms"]},
  { icon: <Activity className="w-6 h-6"/>, title: "Ads Jumpstart", desc: "Meta Ads foundation that actually tracks.", bullets: ["Pixel/CAPI setup","3–5 test creatives","Weekly optimization"]},
  { icon: <Zap className="w-6 h-6"/>, title: "Full-Funnel Setup", desc: "From ad click to booked call.", bullets: ["WhatsApp API flows","Lead routing to sheets/CRM","Nurture + reminders"]},
];

const faqs = [
  {q:"How fast can we start?", a:"Discovery call → scope in 24–48h → kickoff."},
  {q:"Do you need long contracts?", a:"No. Start monthly."},
  {q:"What ad budget should I plan?", a:"Many local businesses begin at ₹20–50k/mo."},
  {q:"Which tools do you use?", a:"Shopify/Wix/Woo, Meta Ads, Pixel + CAPI, WhatsApp API."},
  {q:"Can you work white-label?", a:"Yes. NDA-friendly."},
  {q:"Where are you based?", a:"India (IST). Async with crisp updates."},
];

// Re-usable section shell
const Section = ({id,className="",children}:{id?:string,className?:string,children:React.ReactNode})=> (
  <section id={id} className={`py-16 md:py-24 scroll-mt-24 md:scroll-mt-28 ${className}`}>
    <div className="container mx-auto max-w-7xl px-4">{children}</div>
  </section>
);

const Badge = ({children}:{children:React.ReactNode})=> (
  <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-50 text-amber-900 px-3 py-1 text-xs font-medium">{children}</span>
);

const List = ({items}:{items:string[]})=> (
  <ul className="mt-4 space-y-2 text-sm">
    {items.map((it,i)=> (
      <li key={i} className="flex items-start gap-2">
        <Check className="w-4 h-4 mt-0.5 text-emerald-600"/>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

// -------- Analytics helpers --------
const track = (action: string, params?: Record<string, unknown>) => {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", action, {
    event_category: "engagement",
    event_label: typeof params?.label === "string" ? params.label : "",
    ...params,
  });
};

const trackLink = (
  name: string,
  label: string,
  href?: string,
  extra?: Record<string, unknown>
) => {
  track(name, { label, href, ...extra });
};

export default function HomeClient() {
  // ✅ hooks must be INSIDE the component
  const [menuOpen, setMenuOpen] = useState(false);
  const searchParams = useSearchParams();

  // robust auto-scroll after redirects like /services -> /?section=services
  useEffect(() => {
    const section = new URLSearchParams(window.location.search).get("section");
    if (!section) return;

    const cleanUrl = () => {
      const url = new URL(window.location.href);
      url.searchParams.delete("section");
      window.history.replaceState({}, "", url.pathname + url.hash);
    };

    const tryScroll = () => {
      const el = document.getElementById(section);
      if (!el) return false;
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      cleanUrl();
      return true;
    };

    if (tryScroll()) return;
    let attempts = 0;
    const id = setInterval(() => {
      attempts++;
      if (tryScroll() || attempts > 10) clearInterval(id);
    }, 60);

    return () => clearInterval(id);
  }, [searchParams]);

  useActiveSection(["services","offers","pricing","faq","contact"]);

  return (
    <div className="min-h-screen text-stone-900 bg-[radial-gradient(1200px_600px_at_10%_0%,#fff,rgba(245,245,244,1))]">
     {/* NAV */}
<nav className="sticky top-0 z-30 backdrop-blur border-b border-stone-800 bg-stone-900/95 text-stone-100">
  <div className="container mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
    <div className="flex items-center gap-2">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-stone-900 font-bold">A</span>
      <span className="font-semibold">Flow & Funnel</span>
      <Badge>Solo-first growth studio- live</Badge>
    </div>

    {/* Desktop links (hidden on mobile) */}
    <div className="hidden md:flex items-center gap-6 text-sm">
      <HashLink href="#services" onClick={() => trackLink("nav_click", "services", "#services")}>Services</HashLink>
      <HashLink href="#offers" onClick={() => trackLink("nav_click", "offers", "#offers")}>Offers</HashLink>
      <HashLink href="#pricing" onClick={() => trackLink("nav_click", "pricing", "#pricing")}>Pricing</HashLink>
      <HashLink href="#faq" onClick={() => trackLink("nav_click", "faq", "#faq")}>FAQ</HashLink>
      <HashLink href="#contact" onClick={() => trackLink("nav_click", "contact", "#contact")}>Contact</HashLink>
      <a
        className="inline-flex items-center gap-2 rounded-xl border border-emerald-400 bg-emerald-500/90 text-stone-900 px-4 py-2 text-sm"
        href="https://wa.me/917087796662?utm_source=site&utm_medium=cta&utm_campaign=ff_home&utm_content=nav"
        target="_blank"
        rel="noreferrer"
        onClick={() => trackLink("whatsapp_click", "nav", "https://wa.me/917087796662")}
      >
        <PhoneCall className="w-4 h-4" /> WhatsApp
      </a>
    </div>

    {/* Mobile menu button (VISIBLE on mobile) */}
    <button
      className="md:hidden inline-flex items-center gap-2 rounded-xl border border-stone-700 px-3 py-2"
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      onClick={() => {
        setMenuOpen(prev => {
          const next = !prev;
          track("menu_toggle", { state: next ? "open" : "close" });
          return next;
        });
      }}
    >
      Menu
    </button>
  </div>

  {/* Mobile menu (renders below header row) */}
  {menuOpen && (
    <div className="md:hidden border-b border-stone-800 bg-stone-900/95 text-stone-100">
      <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm">
        <HashLink
          href="#services"
          className="block"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("nav_click", "services_mobile", "#services"), 50);
          }}
        >
          Services
        </HashLink>

        <HashLink
          href="#offers"
          className="block"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("nav_click", "offers_mobile", "#offers"), 50);
          }}
        >
          Offers
        </HashLink>

        <HashLink
          href="#pricing"
          className="block"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("nav_click", "pricing_mobile", "#pricing"), 50);
          }}
        >
          Pricing
        </HashLink>

        <HashLink
          href="#faq"
          className="block"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("nav_click", "faq_mobile", "#faq"), 50);
          }}
        >
          FAQ
        </HashLink>

        <HashLink
          href="#contact"
          className="block"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("nav_click", "contact_mobile", "#contact"), 50);
          }}
        >
          Contact
        </HashLink>

        <a
          className="mt-2 inline-flex items-center gap-2 rounded-xl border border-emerald-400 bg-emerald-500/90 text-stone-900 px-4 py-2 text-sm"
          href="https://wa.me/917087796662?utm_source=site&utm_medium=cta&utm_campaign=ff_home&utm_content=mobile_menu"
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            setMenuOpen(false);
            setTimeout(() => trackLink("whatsapp_click", "mobile_menu", "https://wa.me/917087796662"), 50);
          }}
        >
          WhatsApp
        </a>
      </div>
    </div>
  )}
</nav>


      {menuOpen && (
        <div className="md:hidden border-b border-stone-800 bg-stone-900/95 text-stone-100">
          <div className="container mx-auto max-w-7xl px-4 py-3 flex flex-col gap-3 text-sm">
            <HashLink href="#services" className="block" onClick={() => { setMenuOpen(false); trackLink("nav_click", "services_mobile", "#services"); }}>Services</HashLink>
            <HashLink href="#offers" className="block" onClick={() => { setMenuOpen(false); trackLink("nav_click", "offers_mobile", "#offers"); }}>Offers</HashLink>
            <HashLink href="#pricing" className="block" onClick={() => { setMenuOpen(false); trackLink("nav_click", "pricing_mobile", "#pricing"); }}>Pricing</HashLink>
            <HashLink href="#faq" className="block" onClick={() => { setMenuOpen(false); trackLink("nav_click", "faq_mobile", "#faq"); }}>FAQ</HashLink>
            <HashLink href="#contact" className="block" onClick={() => { setMenuOpen(false); trackLink("nav_click", "contact_mobile", "#contact"); }}>Contact</HashLink>
            <a
              className="mt-2 inline-flex items-center gap-2 rounded-xl border border-emerald-400 bg-emerald-500/90 text-stone-900 px-4 py-2 text-sm"
              href="https://wa.me/917087796662?utm_source=site&utm_medium=cta&utm_campaign=ff_home&utm_content=mobile_menu"
              target="_blank"
              rel="noreferrer"
              onClick={() => { setMenuOpen(false); trackLink("whatsapp_click", "mobile_menu", "https://wa.me/917087796662"); }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}

      {/* HERO */}
      <Section className="relative overflow-hidden bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-emerald-100/60 blur-3xl"/>
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-amber-100/60 blur-3xl"/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}}>
            <Badge>Built for founders who want momentum</Badge>
            <h1 className="mt-4 text-5xl md:text-7xl font-semibold leading-tight">
              Lean marketing. <span className="text-emerald-700">Real outcomes.</span>
            </h1>
            <p className="mt-4 text-lg text-stone-700 max-w-xl">I design, build, and launch crisp websites, ad systems, and WhatsApp funnels—fast. Then we iterate based on data, not vibes.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="rounded-xl bg-emerald-700 hover:bg-emerald-800">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2"
                  onClick={() => trackLink("cta_click", "hero_book_call", "#contact")}
                >
                  Book a discovery call <ChevronRight className="w-4 h-4"/>
                </a>
              </Button>
              <Button variant="outline" asChild className="rounded-xl border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                <a href="#services" onClick={() => trackLink("cta_click", "hero_explore_services", "#services")}>Explore services</a>
              </Button>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-stone-600">
              <div className="flex items-center gap-2"><Activity className="w-4 h-4"/> Data-first setup</div>
              <div className="flex items-center gap-2"><Inbox className="w-4 h-4"/> Clear weekly updates</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4"/> India (IST)</div>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6,delay:0.1}}>
            <Card className="rounded-2xl shadow-sm bg-white/90 border border-stone-200">
              <CardHeader>
                <CardTitle>Quick Wins</CardTitle>
                <CardDescription>Small hinges swing big doors.</CardDescription>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-4">
                {["1-page site","Shopify + Razorpay","Pixel wired right","Ad creatives","WhatsApp handoff","Simple reports"].map((t,i)=>(
                  <div key={i} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 mt-1"/>
                    <span className="text-sm">{t}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </Section>

      {/* PROOF BAR */}
      <Section className="py-12 bg-stone-950 text-stone-100">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            { n: "24+", l: "Projects shipped" },
            { n: "₹10L+", l: "Ad spend managed" },
            { n: "7 days", l: "Fastest launch" },
            { n: "98%", l: "Client satisfaction" },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="relative text-center rounded-2xl py-6 bg-stone-900/60 ring-1 ring-stone-800/80 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <span className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-stone-700/40 to-transparent" />
              <div className="text-3xl md:text-4xl font-semibold text-amber-300">{s.n}</div>
              <div className="mt-1 text-sm md:text-base text-stone-300">{s.l}</div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-20">
        <Section className="bg-gradient-to-b from-stone-50 to-white">
          <div className="flex items-center gap-3 mb-6">
            <Badge>What I do</Badge>
            <h2 className="text-3xl md:text-4xl font-semibold text-stone-900">Core services</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f,idx)=>(
              <Card key={idx} className="rounded-2xl shadow-sm bg-white border border-stone-200 hover:shadow-md hover:border-emerald-300 transition">
                <CardHeader className="space-y-2">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900 text-amber-300">{f.icon}</div>
                  <CardTitle>{f.title}</CardTitle>
                  <CardDescription>Done-for-you, shipped fast.</CardDescription>
                </CardHeader>
                <CardContent><List items={f.points}/></CardContent>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      {/* OFFERS */}
      <section id="offers" className="scroll-mt-20">
        <Section className="bg-gradient-to-r from-emerald-50 via-stone-50 to-amber-50">
          <div className="flex items-center gap-3 mb-6">
            <Badge>Starting points</Badge>
            <h2 className="text-2xl md:text-3xl font-semibold">Battle-tested offers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {offers.map((o, idx) => (
  <Card key={idx} className="rounded-2xl shadow-sm bg-white border border-stone-200 hover:border-emerald-300">
    <CardHeader className="space-y-2">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white">
        {o.icon}
      </div>
      <CardTitle>{o.title}</CardTitle>
      <CardDescription>{o.desc}</CardDescription>
    </CardHeader>
    <CardContent>
      <List items={o.bullets} />
    </CardContent>
  </Card>
))}

          </div>
        </Section>
      </section>

      {/* PROCESS */}
      <Section className="bg-stone-900 text-stone-100">
        <div className="flex items-center gap-3 mb-6">
          <Badge>How we work</Badge>
          <h2 className="text-2xl md:text-3xl font-semibold">Simple, clean process</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[{t:"Discover", d:"Clarity on goals, offer, audience."},{t:"Design", d:"Wireframe + copy; trackable plan."},{t:"Launch", d:"Ship the MVP and go live."},{t:"Optimize", d:"Iterate using numbers, not guesswork."}].map((s,i)=>(
            <Card key={i} className="rounded-2xl shadow-sm bg-stone-800 border border-stone-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-stone-50"><span className="text-amber-300">0{i+1}</span> {s.t}</CardTitle>
                <CardDescription className="text-stone-300">{s.d}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </Section>

      {/* PRICING */}
      <section id="pricing" className="scroll-mt-20">
        <Section className="bg-gradient-to-b from-amber-50 to-stone-50">
          <div className="flex items-center gap-3 mb-6">
            <Badge>Transparent</Badge>
            <h2 className="text-2xl md:text-3xl font-semibold">Pricing (from)</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[{
              name:"Starter",
              price:"₹14,999",
              items:["1-page website","Pixel/CAPI basic","1 form + WhatsApp handoff","1 round of revisions"],
            },{
              name:"Growth",
              price:"₹29,999",
              items:["Shopify/Wix site or revamp","Meta ads setup + 3 creatives","WhatsApp funnel","Weekly optimization"],
            },{
              name:"Pro",
              price:"₹59,999",
              items:["Full funnel build","Advanced tracking","Monthly content plan","Reports + strategy call"],
            }].map((p,i)=>(
              <Card key={i} className="rounded-2xl shadow-sm bg-white border border-stone-200 hover:shadow-md">
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>Everything you need to move.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-semibold text-stone-900">{p.price}<span className="text-base text-stone-500"> / mo</span></div>
                  <List items={p.items}/>
                  <div className="mt-6">
                    <Button asChild className="w-full rounded-xl bg-stone-900 hover:bg-stone-800">
                      <a
                        href="#contact"
                        onClick={() => track("plan_select_click", { plan: p.name })}
                      >
                        Pick {p.name}
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-6 text-sm text-stone-600">Custom scopes welcome. Media budgets billed separately.</p>
        </Section>
      </section>

      {/* BUILT WITH */}
      <Section className="py-10 md:py-12 bg-emerald-800 text-emerald-50">
        <div className="text-center mb-4 md:mb-6">
          <span className="text-xs md:text-sm uppercase tracking-widest text-emerald-100/90">
            Built with
          </span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2.5 md:gap-3">
          {[
            "Pixel / CAPI","Razorpay","WhatsApp API","Meta Ads","Shopify",
            "Crisp reporting","Weekly optimization","Founder-friendly",
          ].map((label, i) => (
            <span key={i}
              className="inline-flex items-center gap-2 rounded-full bg-emerald-700/60 ring-1 ring-emerald-400/20 px-3.5 py-2 text-sm md:text-base backdrop-blur-md"
            >
              <Check className="w-4 h-4 text-amber-300" />
              <span className="font-medium">{label}</span>
            </span>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-20">
        <Section className="bg-white">
          <div className="flex items-center gap-3 mb-6">
            <Badge>Answers</Badge>
            <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {faqs.map((f,i)=>(
              <Card key={i}
                className="rounded-2xl shadow-sm bg-stone-50 border border-stone-200 transition hover:shadow-md hover:border-emerald-300 hover:bg-white"
              >
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl">{f.q}</CardTitle>
                  <CardDescription className="text-stone-700">{f.a}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </Section>
      </section>

      {/* CONTACT */}
      {typeof window !== "undefined" && new URLSearchParams(window.location.search).get("sent") === "1" && (
        <div className="mx-auto max-w-7xl px-4 mt-4">
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 text-emerald-900 px-4 py-3 text-sm">
            ✅ Message sent. I’ll get back to you shortly.
          </div>
        </div>
      )}

      <section id="contact" className="scroll-mt-20">
        <Section className="bg-gradient-to-b from-stone-50 to-white">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Badge>Let’s talk</Badge>
                <h2 className="text-2xl md:text-3xl font-semibold">Book a discovery call</h2>
              </div>
              <p className="text-stone-700 max-w-prose">Tell me about your business and the outcome you want next month. I’ll reply with a crisp plan and timeline.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild className="rounded-xl bg-emerald-700 hover:bg-emerald-800">
                  <a
                    href="https://cal.com/kanav-guglani/30min?utm_source=site&utm_medium=cta&utm_campaign=ff_home&utm_content=contact_button"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackLink("book_call_click", "contact", "https://cal.com/kanav-guglani/30min")}
                  >
                    Schedule on Cal
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-xl border-stone-900 text-stone-900 hover:bg-stone-100">
                  <a
                    href="mailto:kanavguglaniofficial@gmail.com"
                    onClick={() => trackLink("email_click", "contact", "mailto:kanavguglaniofficial@gmail.com")}
                  >
                    Email me
                  </a>
                </Button>
                <Button variant="outline" asChild className="rounded-xl border-emerald-700 text-emerald-700 hover:bg-emerald-50">
                  <a
                    href="https://wa.me/917087796662?utm_source=site&utm_medium=cta&utm_campaign=ff_home&utm_content=contact_button"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => trackLink("whatsapp_click", "contact", "https://wa.me/917087796662")}
                  >
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <Card className="rounded-2xl shadow-sm bg-white border border-stone-200">
              <CardHeader>
                <CardTitle>Quick form</CardTitle>
                <CardDescription>Get a same-day response.</CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-4"
                  action="https://formspree.io/f/mkgvopln"
                  method="POST"
                  onSubmit={() => track("lead_form_submit", { source: "contact_form" })}
                >
                  <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" />
                  <input type="hidden" name="_subject" value="New project enquiry from website" />
                  <Input name="name" placeholder="Your name" required />
                  <Input type="email" name="email" placeholder="Email" required />
                  <Input name="phone" placeholder="WhatsApp / Phone (optional)" />
                  <Textarea name="message" placeholder="What do you need help with?" rows={5} required />
                  <Button type="submit" className="w-full rounded-xl bg-stone-900 hover:bg-stone-800">Send</Button>
                  <p className="text-xs text-stone-500">
                    By submitting, you agree to be contacted about your project. No spam—ever.
                  </p>
                  <input type="hidden" name="_next" value="https://admonk-digital-2025.vercel.app/?sent=1#contact" />
                </form>
              </CardContent>
            </Card>
          </div>
        </Section>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-stone-800 py-10 bg-stone-900 text-stone-100">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400 text-stone-900 font-bold">A</span>
            <span className="font-semibold">Flow & Funnel</span>
            <span className="text-stone-400">© {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-stone-300">
            <a href="#services" className="hover:text-amber-300" onClick={() => trackLink("footer_nav_click", "services", "#services")}>Services</a>
            <a href="#offers" className="hover:text-amber-300" onClick={() => trackLink("footer_nav_click", "offers", "#offers")}>Offers</a>
            <a href="#pricing" className="hover:text-amber-300" onClick={() => trackLink("footer_nav_click", "pricing", "#pricing")}>Pricing</a>
            <a href="#contact" className="hover:text-amber-300" onClick={() => trackLink("footer_nav_click", "contact", "#contact")}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
