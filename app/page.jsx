"use client";

import { useMemo, useState } from "react";

const games = [
  {
    id: "chemie-redox",
    title: "Redoxreaktionen",
    subject: "Chemie",
    grade: "Klasse 9",
    description: "Eisennagel, Kupfer(II)-sulfat und Elektronenübertragung.",
    href: "/chemistry",
    icon: "⚗️",
    accent: "#f59e0b",
    available: true,
  },
  {
    id: "biologie-sexualerziehung",
    title: "Sexualerziehung II",
    subject: "Biologie",
    grade: "Klasse 8",
    description: "Anatomie, Zyklus, Verhütung und Intimhygiene.",
    href: "/biologie",
    icon: "🧬",
    accent: "#22c55e",
    available: true,
  },
  {
    id: "englisch-london",
    title: "London Field Mission",
    subject: "Englisch",
    grade: "Klasse 7–9",
    description: "Eine visuelle Mission durch London mit Rätseln und Finalcode.",
    href: "/london",
    icon: "🇬🇧",
    accent: "#60a5fa",
    available: true,
  },
];

const subjects = ["Alle", "Chemie", "Biologie", "Englisch"];

export default function Home() {
  const [subject, setSubject] = useState("Alle");
  const [query, setQuery] = useState("");

  const filteredGames = useMemo(() => {
    const q = query.trim().toLowerCase();
    return games.filter((game) => {
      const subjectMatch = subject === "Alle" || game.subject === subject;
      const textMatch =
        !q ||
        `${game.title} ${game.subject} ${game.grade} ${game.description}`
          .toLowerCase()
          .includes(q);
      return subjectMatch && textMatch;
    });
  }, [subject, query]);

  return (
    <main className="page">
      <header className="topbar">
        <a className="brand" href="/" aria-label="KaesbachsQuest Startseite">
          <span className="brandMark">KQ</span>
          <span>
            <strong>KaesbachsQuest</strong>
            <small>Lernen. Rätseln. Verstehen.</small>
          </span>
        </a>
        <span className="badge">Spielesammlung</span>
      </header>

      <section className="hero">
        <div className="eyebrow">KAESBACHSQUEST</div>
        <h1>Wähle deine nächste Mission.</h1>
        <p>
          Hier findest du nach und nach Escape Games und Lernmissionen aus
          verschiedenen Fächern. Wähle ein Spiel und starte direkt.
        </p>

        <div className="controls">
          <label className="search">
            <span>⌕</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Spiel, Fach oder Thema suchen …"
              aria-label="Spiele durchsuchen"
            />
          </label>

          <div className="filters" aria-label="Nach Fach filtern">
            {subjects.map((item) => (
              <button
                key={item}
                type="button"
                className={subject === item ? "filter active" : "filter"}
                onClick={() => setSubject(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="library">
        <div className="sectionHead">
          <div>
            <span className="kicker">MISSIONEN</span>
            <h2>Spiele auswählen</h2>
          </div>
          <span className="count">{filteredGames.length} verfügbar</span>
        </div>

        <div className="grid">
          {filteredGames.map((game) => (
            <article className="card" key={game.id}>
              <div className="cardTop">
                <span
                  className="gameIcon"
                  style={{ backgroundColor: `${game.accent}20`, borderColor: `${game.accent}55` }}
                >
                  {game.icon}
                </span>
                <span className="status">bereit</span>
              </div>

              <div className="meta">
                <span>{game.subject}</span>
                <span>•</span>
                <span>{game.grade}</span>
              </div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>

              <a className="start" href={game.href}>
                Mission starten <span>→</span>
              </a>
            </article>
          ))}

          <article className="card coming">
            <div className="plus">+</div>
            <h3>Weitere Missionen folgen</h3>
            <p>
              Die Sammlung wird laufend um neue Spiele, Themen und Fächer
              erweitert.
            </p>
          </article>
        </div>

        {filteredGames.length === 0 && (
          <div className="empty">
            <div>🔎</div>
            <h3>Keine Mission gefunden</h3>
            <p>Ändere den Suchbegriff oder wähle ein anderes Fach.</p>
          </div>
        )}
      </section>

      <footer>
        <span>KaesbachsQuest</span>
        <span>Interaktive Lernmissionen für den Unterricht</span>
      </footer>

      <style jsx>{`
        :global(*) { box-sizing: border-box; }
        :global(html) { background: #06111f; }
        :global(body) {
          margin: 0;
          color: #f8fafc;
          background:
            radial-gradient(circle at 20% 10%, rgba(30, 64, 175, .20), transparent 32rem),
            radial-gradient(circle at 80% 35%, rgba(14, 116, 144, .12), transparent 30rem),
            #06111f;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
        .page { min-height: 100vh; }
        .topbar {
          min-height: 72px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding: 12px clamp(20px, 5vw, 72px);
          border-bottom: 1px solid rgba(148, 163, 184, .18);
          background: rgba(3, 12, 24, .78);
          backdrop-filter: blur(14px);
        }
        .brand { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
        .brandMark {
          width: 42px; height: 42px; display: grid; place-items: center;
          border-radius: 13px; background: #f8c44f; color: #08111f;
          font-weight: 900; letter-spacing: -.04em;
        }
        .brand strong { display: block; font-size: 18px; }
        .brand small { display: block; margin-top: 2px; color: #94a3b8; font-size: 12px; }
        .badge, .status, .count {
          border: 1px solid rgba(148, 163, 184, .22);
          background: rgba(15, 31, 51, .8);
          color: #cbd5e1;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 700;
        }
        .hero {
          max-width: 1180px;
          margin: 0 auto;
          padding: 76px 28px 44px;
        }
        .eyebrow, .kicker { color: #f8c44f; font-size: 12px; font-weight: 900; letter-spacing: .14em; }
        h1 { max-width: 820px; margin: 12px 0 18px; font-size: clamp(42px, 6vw, 76px); line-height: .98; letter-spacing: -.055em; }
        .hero > p { max-width: 720px; margin: 0; color: #b7c4d5; font-size: clamp(17px, 2vw, 20px); line-height: 1.65; }
        .controls { margin-top: 38px; display: flex; flex-wrap: wrap; align-items: center; gap: 14px; }
        .search {
          flex: 1 1 360px; max-width: 560px; height: 52px; display: flex; align-items: center; gap: 10px;
          padding: 0 16px; border: 1px solid rgba(148, 163, 184, .25); border-radius: 14px;
          background: rgba(13, 31, 52, .75);
        }
        .search span { color: #94a3b8; font-size: 24px; }
        .search input { width: 100%; border: 0; outline: 0; background: transparent; color: #fff; font: inherit; }
        .search input::placeholder { color: #718096; }
        .filters { display: flex; flex-wrap: wrap; gap: 8px; }
        .filter {
          min-height: 44px; padding: 0 15px; border-radius: 12px;
          border: 1px solid rgba(148, 163, 184, .22); color: #cbd5e1;
          background: rgba(13, 31, 52, .72); cursor: pointer; font-weight: 700;
        }
        .filter.active { background: #f8c44f; border-color: #f8c44f; color: #07111e; }
        .library { max-width: 1180px; margin: 0 auto; padding: 22px 28px 76px; }
        .sectionHead { display: flex; align-items: end; justify-content: space-between; gap: 20px; margin-bottom: 22px; }
        h2 { margin: 5px 0 0; font-size: 30px; letter-spacing: -.03em; }
        .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px; }
        .card {
          min-height: 330px; display: flex; flex-direction: column; padding: 24px;
          border: 1px solid rgba(148, 163, 184, .22); border-radius: 22px;
          background: linear-gradient(145deg, rgba(18, 43, 72, .92), rgba(9, 27, 48, .88));
        }
        .cardTop { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
        .gameIcon { width: 52px; height: 52px; display: grid; place-items: center; border: 1px solid; border-radius: 15px; font-size: 25px; }
        .status { padding: 5px 9px; color: #a7f3d0; }
        .meta { display: flex; gap: 7px; margin-top: 26px; color: #94a3b8; font-size: 13px; font-weight: 700; }
        .card h3 { margin: 9px 0 10px; font-size: 24px; letter-spacing: -.025em; }
        .card p { margin: 0; color: #aebed0; line-height: 1.55; }
        .start {
          margin-top: auto; padding-top: 24px; display: flex; align-items: center; justify-content: space-between;
          color: #07111e; text-decoration: none; font-weight: 900;
          background: #f8c44f; border-radius: 13px; padding: 13px 15px;
        }
        .coming { align-items: flex-start; justify-content: center; border-style: dashed; background: rgba(8, 24, 42, .55); }
        .plus { width: 52px; height: 52px; display: grid; place-items: center; border-radius: 15px; background: rgba(148,163,184,.1); color: #94a3b8; font-size: 30px; }
        .empty { margin-top: 18px; padding: 40px 20px; text-align: center; border: 1px dashed rgba(148,163,184,.25); border-radius: 20px; color: #94a3b8; }
        .empty h3 { color: #fff; margin-bottom: 6px; }
        footer {
          max-width: 1180px; margin: 0 auto; padding: 24px 28px 34px;
          display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap;
          border-top: 1px solid rgba(148,163,184,.16); color: #718096; font-size: 13px;
        }
        @media (max-width: 900px) { .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 620px) {
          .topbar { padding-inline: 16px; }
          .badge { display: none; }
          .hero { padding: 54px 18px 32px; }
          .library { padding: 18px 18px 58px; }
          .grid { grid-template-columns: 1fr; }
          .sectionHead { align-items: flex-start; flex-direction: column; }
          .card { min-height: 300px; }
          footer { padding-inline: 18px; }
        }
      `}</style>
    </main>
  );
}
