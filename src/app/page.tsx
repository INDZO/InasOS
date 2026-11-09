import OSShell from "@/components/OSShell";
import { profile } from "@/data/profile";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": "https://hamzagicinas.vercel.app/#person",
        name: profile.name,
        url: "https://hamzagicinas.vercel.app",
        description: profile.bio,
        jobTitle: profile.role,
        sameAs: [profile.github, profile.linkedin].filter(Boolean),
      },
      {
        "@type": "WebSite",
        "@id": "https://hamzagicinas.vercel.app/#website",
        url: "https://hamzagicinas.vercel.app",
        name: "InasOS — Inas Hamzagić",
        description: profile.bio,
        author: { "@id": "https://hamzagicinas.vercel.app/#person" },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <OSShell />
      <noscript>
        <div className="fixed inset-0 z-[150] flex flex-col items-center justify-center gap-5 bg-slate-950 p-8 text-center text-slate-100">
          <h1 className="text-3xl font-semibold">{profile.name}</h1>
          <p className="font-semibold">{profile.role}</p>
          <p className="max-w-xl text-slate-300">{profile.tagline}</p>
          <a href="/overview" className="rounded-xl bg-orange-400 px-6 py-3 font-semibold text-slate-950">
            View portfolio, projects and contact
          </a>
        </div>
      </noscript>
    </>
  );
}
