"use client";

import { useMemo, useState } from "react";

const FRAGEN = [
  {
    kategorie: "Zellkern",
    frage: "Welcher Zellbestandteil enthält bei einer menschlichen Körperzelle den größten Teil der Erbinformation?",
    antworten: ["Zellkern", "Mitochondrium", "Ribosom", "Golgi-Apparat"],
    richtig: 0,
    tipp: "Denke an den Bereich der Zelle, in dem die DNA in Form von Chromatin bzw. Chromosomen liegt.",
    bild: "nucleus",
  },
  {
    kategorie: "Mitochondrien",
    frage: "Welche Aufgabe haben Mitochondrien hauptsächlich?",
    antworten: [
      "Sie speichern Wasser.",
      "Sie stellen Energie in Form von ATP bereit.",
      "Sie bauen Proteine aus Aminosäuren auf.",
      "Sie steuern den Stofftransport durch die Zellmembran.",
    ],
    richtig: 1,
    tipp: "Diese Organellen werden oft als ‚Kraftwerke der Zelle‘ bezeichnet.",
    bild: "mitochondrion",
  },
  {
    kategorie: "Ribosomen",
    frage: "Welche Zellstruktur ist der Ort der Proteinbiosynthese?",
    antworten: ["Lysosomen", "Vakuolen", "Ribosomen", "Zentriolen"],
    richtig: 2,
    tipp: "Gesucht sind sehr kleine Strukturen, die frei im Cytoplasma oder am rauen ER vorkommen.",
    bild: "ribosome",
  },
  {
    kategorie: "Zellmembran",
    frage: "Welche Aussage beschreibt die Zellmembran am besten?",
    antworten: [
      "Sie enthält die Erbinformation der Zelle.",
      "Sie produziert die gesamte Zellenergie.",
      "Sie speichert Stärke als Reservestoff.",
      "Sie grenzt die Zelle ab und reguliert den Stoffaustausch.",
    ],
    richtig: 3,
    tipp: "Überlege, welche Struktur zwischen Zellinnerem und Umgebung vermittelt.",
    bild: "membrane",
  },
  {
    kategorie: "Endoplasmatisches Retikulum",
    frage: "Welche Funktion hat das raue endoplasmatische Retikulum (raues ER)?",
    antworten: [
      "Es ist an Herstellung und Transport von Proteinen beteiligt.",
      "Es baut ausschließlich Zucker ab.",
      "Es enthält die Chromosomen.",
      "Es bildet die äußere Begrenzung der Zelle.",
    ],
    richtig: 0,
    tipp: "‚Rau‘ wirkt das ER durch viele kleine Strukturen auf seiner Oberfläche.",
    bild: "roughER",
  },
  {
    kategorie: "Golgi-Apparat",
    frage: "Welche Aufgabe erfüllt der Golgi-Apparat?",
    antworten: [
      "Er führt die Zellatmung durch.",
      "Er verändert, sortiert und verpackt Stoffe für den Weitertransport.",
      "Er stellt Ribosomen her.",
      "Er speichert die vollständige Erbinformation.",
    ],
    richtig: 1,
    tipp: "Stell dir eine Sortier- und Versandstation innerhalb der Zelle vor.",
    bild: "golgi",
  },
  {
    kategorie: "Pflanzenzelle",
    frage: "Welche Struktur kommt typischerweise in Pflanzenzellen, aber nicht in Tierzellen vor?",
    antworten: ["Zellmembran", "Ribosom", "Chloroplast", "Mitochondrium"],
    richtig: 2,
    tipp: "Gesucht ist eine Struktur, die direkt mit Fotosynthese zusammenhängt.",
    bild: "chloroplast",
  },
  {
    kategorie: "Lysosomen",
    frage: "Welche Funktion haben Lysosomen vor allem?",
    antworten: [
      "Sie speichern die DNA.",
      "Sie betreiben Fotosynthese.",
      "Sie bilden die Zellwand.",
      "Sie bauen Stoffe und Zellbestandteile mithilfe von Enzymen ab.",
    ],
    richtig: 3,
    tipp: "Denke an den Abbau und das Recycling von Stoffen in der Zelle.",
    bild: "lysosome",
  },
  {
    kategorie: "Cytoplasma",
    frage: "Was bezeichnet man als Cytoplasma?",
    antworten: [
      "Den flüssig bis gelartigen Zellinhalt außerhalb des Zellkerns, in dem Organellen liegen.",
      "Nur die Flüssigkeit im Zellkern.",
      "Die feste Zellwand von Pflanzenzellen.",
      "Die DNA im Inneren der Chromosomen.",
    ],
    richtig: 0,
    tipp: "Gesucht ist der Grundraum der Zelle, in dem viele Organellen eingebettet sind.",
    bild: "cytoplasm",
  },
  {
    kategorie: "Überblick",
    frage: "Welche Zuordnung von Zellorganell und Funktion ist korrekt?",
    antworten: [
      "Ribosom – Speicherung der DNA",
      "Mitochondrium – Bereitstellung von Energie",
      "Zellkern – Abbau alter Zellbestandteile",
      "Golgi-Apparat – Fotosynthese",
    ],
    richtig: 1,
    tipp: "Prüfe bei jeder Kombination, ob Organell und Hauptaufgabe wirklich zusammenpassen.",
    bild: "overview",
  },
];

const LOESUNG = "ZELLKERN";
const BUCHSTABEN_FRAGEN = new Set([0, 1, 2, 4, 5, 6, 8, 9]);

function mischen(array) {
  const kopie = [...array];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

function Zellbild({ typ }) {
  const common = { viewBox: "0 0 560 300", role: "img", "aria-label": "Illustration eines Zellbestandteils" };
  const bg = <rect width="560" height="300" rx="26" fill="#081725" />;
  const cell = <ellipse cx="280" cy="152" rx="190" ry="108" fill="#0f2a3d" stroke="#3dd6a0" strokeWidth="4" />;

  if (typ === "nucleus") return <svg {...common}>{bg}{cell}<circle cx="280" cy="150" r="62" fill="#6246b6"/><circle cx="280" cy="150" r="17" fill="#b7a6ff"/><path d="M245 132c20-24 50-20 70 0M246 171c20 24 49 20 69 0" stroke="#ece7ff" strokeWidth="5" fill="none" strokeLinecap="round"/></svg>;
  if (typ === "mitochondrion") return <svg {...common}>{bg}{cell}<path d="M170 153c0-48 46-76 112-76s124 28 124 76-58 76-124 76-112-28-112-76Z" fill="#d86f32"/><path d="M198 152c30-38 42 32 72-8s44 36 86-10" stroke="#fff1e8" strokeWidth="8" fill="none" strokeLinecap="round"/></svg>;
  if (typ === "ribosome") return <svg {...common}>{bg}{cell}{Array.from({length:24}).map((_,i)=><circle key={i} cx={150+(i%8)*40} cy={90+Math.floor(i/8)*48} r="9" fill="#e6bf48"/>)}<path d="M150 230c95-30 185-26 275-2" stroke="#8d74db" strokeWidth="7" fill="none"/></svg>;
  if (typ === "membrane") return <svg {...common}>{bg}<ellipse cx="280" cy="150" rx="196" ry="112" fill="#0f2a3d" stroke="#3dd6d0" strokeWidth="12"/><ellipse cx="280" cy="150" rx="180" ry="96" fill="none" stroke="#85eee7" strokeWidth="4" strokeDasharray="12 11"/><circle cx="280" cy="150" r="35" fill="#6246b6"/></svg>;
  if (typ === "roughER") return <svg {...common}>{bg}{cell}<circle cx="350" cy="150" r="42" fill="#6246b6"/><path d="M145 105c48-28 110-28 158-4M138 148c58-24 116-24 165-2M150 192c48-20 98-17 146 5" stroke="#5396dc" strokeWidth="11" fill="none" strokeLinecap="round"/>{Array.from({length:24}).map((_,i)=><circle key={i} cx={150+(i%12)*13} cy={97+Math.floor(i/12)*95} r="5" fill="#f1cb53"/>)}</svg>;
  if (typ === "golgi") return <svg {...common}>{bg}{cell}{[0,1,2,3,4].map(i=><path key={i} d={`M190 ${95+i*26} Q280 ${65+i*25} 370 ${98+i*25}`} stroke="#d96c8b" strokeWidth="11" fill="none" strokeLinecap="round"/>)}{[0,1,2,3].map(i=><circle key={i} cx={392+i*16} cy={115+i*28} r="10" fill="#f2adc0"/>)}</svg>;
  if (typ === "chloroplast") return <svg {...common}>{bg}<rect x="120" y="58" width="320" height="190" rx="32" fill="#123d2d" stroke="#54d98b" strokeWidth="5"/>{[0,1,2,3,4].map(i=><g key={i}><rect x={160+i*55} y="106" width="34" height="11" rx="5" fill="#8be5a7"/><rect x={160+i*55} y="126" width="34" height="11" rx="5" fill="#8be5a7"/><rect x={160+i*55} y="146" width="34" height="11" rx="5" fill="#8be5a7"/></g>)}<path d="M150 204c70-30 200-30 270 0" stroke="#44ba72" strokeWidth="6" fill="none"/></svg>;
  if (typ === "lysosome") return <svg {...common}>{bg}{cell}{[0,1,2,3,4,5].map((i)=><circle key={i} cx={160+i*48} cy={135+(i%2)*48} r={24-(i%3)*3} fill="#bd68d7" opacity="0.9"/>)}<path d="M174 135l15 15m-15 0 15-15M320 183l15 15m-15 0 15-15" stroke="#fae9ff" strokeWidth="5"/></svg>;
  if (typ === "cytoplasm") return <svg {...common}>{bg}{cell}<circle cx="320" cy="145" r="42" fill="#6246b6"/>{[0,1,2,3,4,5,6].map((i)=><ellipse key={i} cx={150+i*45} cy={92+(i%3)*48} rx="18" ry="10" fill="#4fa7d8" opacity="0.9"/>)}<path d="M140 218c55-30 100 15 154-8s95 10 132-10" stroke="#96c9e8" strokeWidth="6" fill="none" opacity="0.8"/></svg>;
  return <svg {...common}>{bg}{cell}<circle cx="280" cy="150" r="46" fill="#6246b6"/><path d="M145 125c28-28 58 22 87-5s52 27 78-4" stroke="#d86f32" strokeWidth="9" fill="none"/><path d="M352 100q55 25 5 50q52 26 0 53" stroke="#d96c8b" strokeWidth="9" fill="none"/>{[0,1,2,3,4].map(i=><circle key={i} cx={165+i*44} cy="220" r="8" fill="#e6bf48"/>)}</svg>;
}

export default function BiologieQuiz() {
  const buchstaben = useMemo(() => mischen([...LOESUNG]), []);
  const [index, setIndex] = useState(0);
  const [gesammelt, setGesammelt] = useState([]);
  const [falsche, setFalsche] = useState([]);
  const [meldung, setMeldung] = useState("");
  const [eingabe, setEingabe] = useState("");
  const [fertig, setFertig] = useState(false);
  const [gesperrt, setGesperrt] = useState(false);
  const [niveau, setNiveau] = useState(null);
  const [hilfeOffen, setHilfeOffen] = useState(false);

  const finale = index === FRAGEN.length;
  const frage = FRAGEN[index];
  const fortschritt = Math.round((index / FRAGEN.length) * 100);

  function antworten(i) {
    if (!frage || falsche.includes(i) || gesperrt) return;

    if (i === frage.richtig) {
      setGesperrt(true);
      const gibtBuchstaben = BUCHSTABEN_FRAGEN.has(index);

      if (gibtBuchstaben) {
        const buchstabe = buchstaben[gesammelt.length];
        setGesammelt((alt) => [...alt, buchstabe]);
        setMeldung(`Richtig! Du erhältst den Buchstaben ${buchstabe}.`);
      } else {
        setMeldung("Richtig! Diese Frage bringt dich im Zell-Labor weiter.");
      }

      setTimeout(() => {
        setIndex((alt) => alt + 1);
        setFalsche([]);
        setMeldung("");
        setHilfeOffen(false);
        setGesperrt(false);
      }, 1150);
    } else {
      setFalsche((alt) => [...alt, i]);
      setMeldung(
        niveau === "profi"
          ? "Noch nicht. Diese Möglichkeit fällt weg – versuche es erneut."
          : "Noch nicht. Diese Möglichkeit fällt weg – nutze bei Bedarf die Hilfe und versuche es erneut."
      );
    }
  }

  function pruefen() {
    const normalisiert = eingabe.trim().toUpperCase().replaceAll("UE", "Ü");
    if (normalisiert === LOESUNG) {
      setFertig(true);
      setMeldung("");
    } else {
      setMeldung("Das Lösungswort stimmt noch nicht. Ordne die acht Buchstaben neu.");
    }
  }

  return (
    <main className="seite">
      <nav className="nav">
        <a href="/" className="brand">
          <span className="logo">KQ</span>
          <span>
            <strong>KaesbachsQuest</strong>
            <small>Biologie-Mission</small>
          </span>
        </a>
        <div className="navPill">Biologie · Klasse 9</div>
      </nav>

      <section className="shell">
        <div className="top">
          <div>
            <div className="eyebrow">ZELLE & ZELLBESTANDTEILE</div>
            <h1>Mission: Reise durch die Zelle</h1>
            <p>
              Löse 10 Fachfragen zu Zellorganellen und ihren Funktionen. Acht verdiente Buchstaben führen dich zum Finalcode.
            </p>
          </div>
          <div className="missionBox">
            <span>MISSION</span>
            <strong>{finale ? "Finale" : `${index + 1} / 10`}</strong>
          </div>
        </div>

        <div className="progressWrap">
          <div className="progressInfo">
            <span>Fortschritt</span>
            <span>{finale ? 100 : fortschritt}%</span>
          </div>
          <div className="progress"><div style={{ width: `${finale ? 100 : fortschritt}%` }} /></div>
        </div>

        <div className="letterPanel">
          <div className="letterHead">
            <div>
              <span className="label">FINALCODE</span>
              <strong>Gesammelte Buchstaben</strong>
            </div>
            <span className="counter">{gesammelt.length} / 8</span>
          </div>
          <div className="letters">
            {Array.from({ length: 8 }).map((_, i) => (
              <span className={gesammelt[i] ? "filled" : ""} key={i}>{gesammelt[i] ?? "?"}</span>
            ))}
          </div>
        </div>

        {!niveau && !fertig && (
          <section className="levelSelect">
            <div className="eyebrow">WÄHLE DEIN NIVEAU</div>
            <h2>Wie viel Unterstützung möchtest du?</h2>
            <p className="levelIntro">Die 10 Fragen bleiben in allen drei Stufen gleich. Nur die Hilfen unterscheiden sich.</p>
            <div className="levelGrid">
              <button type="button" onClick={() => setNiveau("einsteiger")}>
                <span className="levelIcon">🌱</span><strong>Neuling</strong><span>Bei jeder Frage wird direkt ein Hinweis angezeigt.</span>
              </button>
              <button type="button" onClick={() => setNiveau("mittel")}>
                <span className="levelIcon">🧭</span><strong>Entdecker</strong><span>Du kannst bei jeder Frage selbst eine Hilfe aufrufen.</span>
              </button>
              <button type="button" onClick={() => setNiveau("profi")}>
                <span className="levelIcon">🏆</span><strong>Profi</strong><span>Keine Hinweise – du löst die Mission ohne Hilfe.</span>
              </button>
            </div>
          </section>
        )}

        {niveau && !finale && !fertig && (
          <section className="questionCard">
            <div className="questionMeta">
              <span className="category">{frage.kategorie}</span>
              <span>Frage {index + 1} von 10</span>
            </div>

            <div className="visual"><Zellbild typ={frage.bild} /></div>
            <h2>{frage.frage}</h2>

            <div className="levelBar">
              <span>Niveau: {niveau === "einsteiger" ? "Neuling" : niveau === "mittel" ? "Entdecker" : "Profi"}</span>
              {niveau === "mittel" && (
                <button type="button" onClick={() => setHilfeOffen((alt) => !alt)}>{hilfeOffen ? "Hilfe ausblenden" : "Hilfe anzeigen"}</button>
              )}
            </div>

            {niveau === "einsteiger" && (
              <div className="tipp permanent"><span className="bulb">💡</span><div><strong>Hinweis</strong><p>{frage.tipp}</p></div></div>
            )}
            {niveau === "mittel" && hilfeOffen && (
              <div className="tipp permanent"><span className="bulb">💡</span><div><strong>Hinweis</strong><p>{frage.tipp}</p></div></div>
            )}

            <div className="antworten">
              {frage.antworten.map((antwort, i) => {
                const entfernt = falsche.includes(i);
                return (
                  <button key={i} type="button" disabled={entfernt || gesperrt} className={entfernt ? "weg" : ""} onClick={() => antworten(i)}>
                    <span className="optionLetter">{String.fromCharCode(65 + i)}</span>
                    <span className="optionText">{entfernt ? "Diese Antwort fällt weg." : antwort}</span>
                    <span className="arrow">{entfernt ? "×" : "›"}</span>
                  </button>
                );
              })}
            </div>

            {meldung && <div className="meldung">{meldung}</div>}
          </section>
        )}

        {finale && !fertig && (
          <section className="finale">
            <div className="finalIcon">⌁</div>
            <div className="eyebrow">FINALE MISSION</div>
            <h2>Knacke den Finalcode.</h2>
            <p>Du hast alle acht Buchstaben gesammelt. Bringe sie in die richtige Reihenfolge. Gesucht ist ein zentraler Bestandteil vieler eukaryotischer Zellen.</p>
            <div className="gross">{gesammelt.map((b, i) => <span key={i}>{b}</span>)}</div>
            <div className="inputRow">
              <input value={eingabe} onChange={(e) => setEingabe(e.target.value)} onKeyDown={(e) => e.key === "Enter" && pruefen()} placeholder="Lösungswort eingeben" aria-label="Lösungswort" />
              <button type="button" onClick={pruefen}>Code prüfen</button>
            </div>
            {meldung && <div className="meldung">{meldung}</div>}
          </section>
        )}

        {fertig && (
          <section className="success">
            <div className="successMark">✓</div>
            <div className="eyebrow">MISSION ERFOLGREICH</div>
            <h2>Finalcode geknackt!</h2>
            <p>Das Lösungswort lautet <strong>ZELLKERN</strong>.</p>
            <div className="successActions">
              <button type="button" onClick={() => location.reload()}>Noch einmal spielen</button>
              <a href="/">Zur Spieleauswahl</a>
            </div>
          </section>
        )}
      </section>

      <style jsx>{`
        * { box-sizing: border-box; }
        .seite { min-height: 100vh; background: radial-gradient(circle at 18% 0%, rgba(37,211,144,.11), transparent 28%), radial-gradient(circle at 90% 22%, rgba(56,189,248,.08), transparent 25%), #07111f; color: #eef8f4; font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; padding-bottom: 60px; }
        .nav { min-height: 72px; border-bottom: 1px solid #1d3142; display: flex; align-items: center; justify-content: space-between; gap: 18px; padding: 12px max(20px, calc((100% - 1080px) / 2)); background: rgba(5,14,26,.88); backdrop-filter: blur(12px); }
        .brand { display: flex; align-items: center; gap: 12px; color: inherit; text-decoration: none; }
        .brand strong { display: block; font-size: 16px; } .brand small { display: block; color: #8fa7b8; margin-top: 2px; }
        .logo { width: 42px; height: 42px; border-radius: 13px; display: grid; place-items: center; font-weight: 950; color: #06140e; background: linear-gradient(135deg,#57e3aa,#22c55e); box-shadow: 0 0 28px rgba(34,197,94,.15); }
        .navPill { border: 1px solid #294254; color: #a9c1cf; padding: 9px 13px; border-radius: 999px; font-size: 13px; font-weight: 800; }
        .shell { width: min(1080px, calc(100% - 32px)); margin: 38px auto 0; }
        .top { display: grid; grid-template-columns: 1fr auto; gap: 30px; align-items: start; margin-bottom: 24px; }
        .eyebrow { color: #58dda9; letter-spacing: .14em; font-size: 12px; font-weight: 950; }
        h1 { max-width: 780px; font-size: clamp(34px,6vw,58px); line-height: 1.02; letter-spacing: -.04em; margin: 10px 0 14px; }
        .top p { max-width: 760px; color: #a8bdc9; font-size: 17px; line-height: 1.6; margin: 0; }
        .missionBox { min-width: 116px; padding: 15px 17px; border: 1px solid #294254; background: #0d1c2c; border-radius: 16px; text-align: right; }
        .missionBox span { display:block; color:#6f8999; font-size:10px; font-weight:950; letter-spacing:.12em; } .missionBox strong { display:block; font-size:20px; margin-top:4px; }
        .progressWrap { background:#0d1c2c; border:1px solid #203748; border-radius:15px; padding:13px 15px; margin-bottom:14px; }
        .progressInfo { display:flex; justify-content:space-between; color:#93aab8; font-size:12px; font-weight:800; margin-bottom:8px; }
        .progress { height:7px; border-radius:99px; overflow:hidden; background:#182b3b; } .progress div { height:100%; border-radius:inherit; background:linear-gradient(90deg,#22c55e,#5ee5ad); transition:width .35s ease; }
        .letterPanel { border:1px solid #203748; background:linear-gradient(135deg,#0d1d2d,#0b1927); border-radius:20px; padding:18px; margin-bottom:18px; }
        .letterHead { display:flex; justify-content:space-between; gap:18px; align-items:center; margin-bottom:13px; } .letterHead strong{display:block;margin-top:2px}.label{display:block;color:#58dda9;font-size:10px;font-weight:950;letter-spacing:.14em}.counter{color:#9bb1bf;background:#132738;border-radius:999px;padding:7px 11px;font-size:12px;font-weight:900}
        .letters,.gross{display:flex;flex-wrap:wrap;gap:9px}.letters span,.gross span{width:47px;height:52px;display:grid;place-items:center;border:1px solid #2b4658;border-radius:12px;background:#091725;color:#587184;font-size:22px;font-weight:950}.letters .filled{border-color:#3bc78d;background:#0e3328;color:#79efbd}
        .questionCard,.finale,.success,.levelSelect{border:1px solid #203748;background:linear-gradient(145deg,rgba(16,34,51,.97),rgba(10,25,39,.98));border-radius:24px;padding:clamp(20px,4vw,34px);box-shadow:0 24px 70px rgba(0,0,0,.22)}
        .questionMeta{display:flex;justify-content:space-between;gap:12px;align-items:center;color:#7f99a9;font-size:12px;font-weight:850;margin-bottom:16px}.category{color:#71e7b5;background:#103629;border:1px solid #1f6048;border-radius:999px;padding:7px 10px}
        .visual{border:1px solid #203748;background:#081725;border-radius:20px;padding:10px;margin-bottom:22px;overflow:hidden}.visual svg{display:block;width:100%;height:auto;max-height:300px}
        h2{font-size:clamp(23px,4vw,32px);line-height:1.25;letter-spacing:-.02em;margin:0 0 22px}
        .antworten{display:grid;grid-template-columns:1fr 1fr;gap:12px}.antworten button{min-height:82px;display:grid;grid-template-columns:42px 1fr 20px;gap:12px;align-items:center;text-align:left;padding:14px;border:1px solid #2a4355;border-radius:16px;background:#0c1c2b;color:#eaf4f0;font:inherit;cursor:pointer;transition:transform .14s ease,border-color .14s ease,background .14s ease}.antworten button:hover:not(:disabled){transform:translateY(-2px);border-color:#4ed59e;background:#10283a}.optionLetter{width:40px;height:40px;display:grid;place-items:center;border-radius:11px;background:#142d3d;color:#77e7b8;font-weight:950}.optionText{line-height:1.4}.arrow{color:#648092;font-size:25px;text-align:center}.antworten .weg{opacity:.32;cursor:default;text-decoration:line-through}
        .meldung{margin-top:16px;padding:14px 16px;border:1px solid #294b61;background:#10263a;color:#c5d9e5;border-radius:14px;line-height:1.45}.tipp{display:flex;gap:12px;margin-top:12px;padding:15px 16px;border:1px solid #695d2c;background:#2a2614;color:#f5e9ad;border-radius:14px}.tipp strong{display:block;margin-bottom:3px}.tipp p{margin:0;line-height:1.45}.bulb{font-size:21px}.permanent{margin-top:0;margin-bottom:15px}
        .levelIntro{color:#9fb5c2;margin:0 0 22px;line-height:1.55}.levelSelect h2{margin-top:8px;margin-bottom:8px}.levelGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.levelGrid button{min-height:180px;padding:22px 18px;border-radius:18px;border:1px solid #2a4355;background:#0c1c2b;color:#eaf4f0;cursor:pointer;text-align:left;font:inherit;display:flex;flex-direction:column;gap:8px;transition:transform .14s ease,border-color .14s ease,background .14s ease}.levelGrid button:hover{transform:translateY(-2px);border-color:#4ed59e;background:#10283a}.levelGrid strong{font-size:20px}.levelGrid button>span:last-child{color:#9fb5c2;line-height:1.45}.levelIcon{font-size:30px}
        .levelBar{display:flex;justify-content:space-between;align-items:center;gap:10px;margin:-5px 0 15px;color:#8ea6b5;font-size:12px;font-weight:850}.levelBar button{border:1px solid #345267;border-radius:999px;padding:8px 12px;background:#112638;color:#d8e7ed;font:inherit;font-size:12px;font-weight:850;cursor:pointer}
        .finale,.success{text-align:center;padding-top:40px;padding-bottom:40px}.finale>p,.success>p{color:#9fb5c2;max-width:650px;margin:0 auto;line-height:1.6}.finalIcon{width:64px;height:64px;margin:0 auto 16px;display:grid;place-items:center;border-radius:20px;background:#103629;border:1px solid #25634b;color:#69e8b3;font-size:35px}.gross{justify-content:center;margin:25px 0}.gross span{border-color:#3bc78d;background:#0e3328;color:#79efbd}
        .inputRow{width:min(650px,100%);display:grid;grid-template-columns:1fr auto;gap:10px;margin:0 auto}.inputRow input{min-width:0;padding:15px 16px;border:1px solid #355367;border-radius:13px;background:#081724;color:white;font:inherit;font-size:17px;text-transform:uppercase}.inputRow button,.successActions button,.successActions a{border:0;border-radius:13px;padding:14px 20px;background:#55dda7;color:#06150f;font:inherit;font-weight:950;cursor:pointer;text-decoration:none}.successMark{width:74px;height:74px;display:grid;place-items:center;margin:0 auto 18px;border-radius:50%;background:#4cdda3;color:#062116;font-size:38px;font-weight:950;box-shadow:0 0 40px rgba(76,221,163,.2)}.successActions{display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:24px}.successActions a{background:#142a3a;color:#d9e8ee;border:1px solid #304b5e}
        @media(max-width:760px){.top{grid-template-columns:1fr}.missionBox{width:max-content;text-align:left}.antworten{grid-template-columns:1fr}.levelGrid{grid-template-columns:1fr}.levelGrid button{min-height:0}.navPill{display:none}}
        @media(max-width:520px){.shell{width:min(100% - 20px,1080px);margin-top:22px}.nav{padding-left:12px;padding-right:12px}.letters span,.gross span{width:39px;height:44px;font-size:19px}.inputRow{grid-template-columns:1fr}.questionMeta{align-items:flex-start}}
      `}</style>
    </main>
  );
}
