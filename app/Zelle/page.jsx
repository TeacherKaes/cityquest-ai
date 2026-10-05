"use client";

import { useMemo, useState } from "react";

const LEVELS = {
  neuling: { label: "🌱 Neuling", hintMode: "visible" },
  entdecker: { label: "🧭 Entdecker", hintMode: "button" },
  profi: { label: "🏆 Profi", hintMode: "hidden" },
};

const questions = [
  {
    question: "Welcher Zellbestandteil enthält bei einer menschlichen Körperzelle den größten Teil der Erbinformation?",
    answers: ["Zellkern", "Mitochondrium", "Ribosom", "Golgi-Apparat"],
    correct: 0,
    hint: "Denke an den Bereich der Zelle, in dem die DNA in Form von Chromatin bzw. Chromosomen liegt.",
    letter: "K",
    image: "nucleus",
  },
  {
    question: "Welche Aufgabe haben Mitochondrien hauptsächlich?",
    answers: [
      "Sie speichern Wasser.",
      "Sie stellen Energie in Form von ATP bereit.",
      "Sie bauen Proteine aus Aminosäuren auf.",
      "Sie steuern den Stofftransport durch die Zellmembran.",
    ],
    correct: 1,
    hint: "Diese Organellen werden oft als ‚Kraftwerke der Zelle‘ bezeichnet.",
    letter: "E",
    image: "mitochondrion",
  },
  {
    question: "Welche Zellstruktur ist der Ort der Proteinbiosynthese?",
    answers: ["Lysosomen", "Vakuolen", "Ribosomen", "Zentriolen"],
    correct: 2,
    hint: "Gesucht sind sehr kleine Strukturen, die frei im Cytoplasma oder am rauen ER vorkommen.",
    letter: "R",
    image: "ribosome",
  },
  {
    question: "Welche Aussage beschreibt die Zellmembran am besten?",
    answers: [
      "Sie enthält die Erbinformation der Zelle.",
      "Sie produziert die gesamte Zellenergie.",
      "Sie speichert Stärke als Reservestoff.",
      "Sie grenzt die Zelle ab und reguliert den Stoffaustausch.",
    ],
    correct: 3,
    hint: "Überlege, welche Struktur zwischen Zellinnerem und Umgebung vermittelt.",
    letter: "L",
    image: "membrane",
  },
  {
    question: "Welche Funktion hat das raue endoplasmatische Retikulum (raues ER)?",
    answers: [
      "Es ist an Herstellung und Transport von Proteinen beteiligt.",
      "Es baut ausschließlich Zucker ab.",
      "Es enthält die Chromosomen.",
      "Es bildet die äußere Begrenzung der Zelle.",
    ],
    correct: 0,
    hint: "‚Rau‘ wirkt das ER durch viele kleine Strukturen auf seiner Oberfläche.",
    letter: "Z",
    image: "roughER",
  },
  {
    question: "Welche Aufgabe erfüllt der Golgi-Apparat?",
    answers: [
      "Er führt die Zellatmung durch.",
      "Er verändert, sortiert und verpackt Stoffe für den Weitertransport.",
      "Er stellt Ribosomen her.",
      "Er speichert die vollständige Erbinformation.",
    ],
    correct: 1,
    hint: "Stell dir eine Sortier- und Versandstation innerhalb der Zelle vor.",
    letter: "L",
    image: "golgi",
  },
  {
    question: "Welche Struktur kommt typischerweise in Pflanzenzellen, aber nicht in Tierzellen vor?",
    answers: ["Zellmembran", "Ribosom", "Chloroplast", "Mitochondrium"],
    correct: 2,
    hint: "Gesucht ist eine Struktur, die direkt mit Fotosynthese zusammenhängt.",
    letter: "E",
    image: "chloroplast",
  },
  {
    question: "Welche Funktion haben Lysosomen vor allem?",
    answers: [
      "Sie speichern die DNA.",
      "Sie betreiben Fotosynthese.",
      "Sie bilden die Zellwand.",
      "Sie bauen Stoffe und Zellbestandteile mithilfe von Enzymen ab.",
    ],
    correct: 3,
    hint: "Denke an den Abbau und das Recycling von Stoffen in der Zelle.",
    letter: "N",
    image: "lysosome",
  },
  {
    question: "Was bezeichnet man als Cytoplasma?",
    answers: [
      "Den flüssig bis gelartigen Zellinhalt außerhalb des Zellkerns, in dem Organellen liegen.",
      "Nur die Flüssigkeit im Zellkern.",
      "Die feste Zellwand von Pflanzenzellen.",
      "Die DNA im Inneren der Chromosomen.",
    ],
    correct: 0,
    hint: "Gesucht ist der Grundraum der Zelle, in dem viele Organellen eingebettet sind.",
    letter: null,
    image: "cytoplasm",
  },
  {
    question: "Welche Zuordnung von Zellorganell und Funktion ist korrekt?",
    answers: [
      "Ribosom – Speicherung der DNA",
      "Mitochondrium – Bereitstellung von Energie",
      "Zellkern – Abbau alter Zellbestandteile",
      "Golgi-Apparat – Fotosynthese",
    ],
    correct: 1,
    hint: "Prüfe bei jeder Kombination, ob Organell und Hauptaufgabe wirklich zusammenpassen.",
    letter: null,
    image: "overview",
  },
];

const SVG = ({ type }) => {
  const common = { width: 360, height: 210, viewBox: "0 0 360 210", role: "img", "aria-label": "Zellbiologische Illustration" };
  const bg = <rect x="0" y="0" width="360" height="210" rx="24" fill="#0b1220" />;
  const cell = <ellipse cx="180" cy="108" rx="130" ry="74" fill="#10223d" stroke="#38bdf8" strokeWidth="3" />;

  if (type === "nucleus") return <svg {...common}>{bg}{cell}<circle cx="180" cy="108" r="40" fill="#7c3aed" opacity="0.9"/><circle cx="180" cy="108" r="11" fill="#c4b5fd"/><path d="M160 95c10-14 30-12 40 0M160 118c10 14 30 12 40 0" stroke="#ede9fe" strokeWidth="3" fill="none"/></svg>;
  if (type === "mitochondrion") return <svg {...common}>{bg}{cell}<path d="M108 112c0-28 26-45 64-45s74 17 74 45-36 45-74 45-64-17-64-45Z" fill="#f97316"/><path d="M127 113c18-22 24 20 42-3s26 21 50-5" stroke="#fff7ed" strokeWidth="5" fill="none" strokeLinecap="round"/></svg>;
  if (type === "ribosome") return <svg {...common}>{bg}{cell}{[...Array(18)].map((_,i)=><circle key={i} cx={95+(i%6)*34} cy={72+Math.floor(i/6)*35} r="8" fill="#facc15"/>)}<path d="M85 160c65-22 125-18 190-4" stroke="#a78bfa" strokeWidth="5" fill="none"/></svg>;
  if (type === "membrane") return <svg {...common}>{bg}<ellipse cx="180" cy="108" rx="130" ry="74" fill="#10223d" stroke="#22d3ee" strokeWidth="9"/><ellipse cx="180" cy="108" rx="118" ry="62" fill="none" stroke="#67e8f9" strokeWidth="3" strokeDasharray="7 8"/><circle cx="180" cy="108" r="24" fill="#7c3aed"/></svg>;
  if (type === "roughER") return <svg {...common}>{bg}{cell}<circle cx="225" cy="105" r="28" fill="#7c3aed"/><path d="M92 76c30-18 74-20 101-4M88 101c35-16 73-16 105-2M96 128c32-12 62-11 94 2" stroke="#60a5fa" strokeWidth="7" fill="none" strokeLinecap="round"/>{[...Array(16)].map((_,i)=><circle key={i} cx={97+(i%8)*14} cy={73+Math.floor(i/8)*56} r="4" fill="#fde047"/>)}</svg>;
  if (type === "golgi") return <svg {...common}>{bg}{cell}{[0,1,2,3,4].map((i)=><path key={i} d={`M120 ${76+i*16} Q180 ${58+i*16} 238 ${78+i*16}`} stroke="#fb7185" strokeWidth="7" fill="none" strokeLinecap="round"/>)}{[0,1,2].map(i=><circle key={i} cx={253+i*13} cy={93+i*18} r="7" fill="#fecdd3"/>)}</svg>;
  if (type === "chloroplast") return <svg {...common}>{bg}<rect x="72" y="34" width="216" height="142" rx="20" fill="#123d2d" stroke="#4ade80" strokeWidth="4"/>{[0,1,2,3].map(i=><g key={i}><rect x={110+i*35} y="74" width="24" height="9" rx="4" fill="#86efac"/><rect x={110+i*35} y="89" width="24" height="9" rx="4" fill="#86efac"/><rect x={110+i*35} y="104" width="24" height="9" rx="4" fill="#86efac"/></g>)}<path d="M95 142c45-22 125-22 170 0" stroke="#22c55e" strokeWidth="4" fill="none"/></svg>;
  if (type === "lysosome") return <svg {...common}>{bg}{cell}{[0,1,2,3,4].map((i)=><circle key={i} cx={118+i*30} cy={102+(i%2)*28} r={18-i} fill="#e879f9" opacity="0.85"/>)}<path d="M126 100l10 10m-10 0 10-10M187 127l10 10m-10 0 10-10" stroke="#fdf4ff" strokeWidth="3"/></svg>;
  if (type === "cytoplasm") return <svg {...common}>{bg}{cell}<circle cx="205" cy="105" r="26" fill="#7c3aed"/>{[0,1,2,3,4,5].map((i)=><ellipse key={i} cx={105+i*28} cy={70+(i%3)*32} rx="12" ry="7" fill="#38bdf8" opacity="0.8"/>)}<path d="M90 145c35-18 65 9 102-7s58 6 82-7" stroke="#93c5fd" strokeWidth="4" fill="none" opacity="0.8"/></svg>;
  return <svg {...common}>{bg}{cell}<circle cx="180" cy="108" r="30" fill="#7c3aed"/><path d="M95 93c18-18 35 15 53-2s33 16 46-2" stroke="#f97316" strokeWidth="6" fill="none"/><path d="M222 72q35 15 3 31q34 16 0 33" stroke="#fb7185" strokeWidth="6" fill="none"/>{[0,1,2,3].map(i=><circle key={i} cx={116+i*28} cy="145" r="6" fill="#facc15"/>)}</svg>;
};

export default function Page() {
  const [level, setLevel] = useState("entdecker");
  const [index, setIndex] = useState(0);
  const [wrong, setWrong] = useState([]);
  const [hintOpen, setHintOpen] = useState(false);
  const [earnedLetters, setEarnedLetters] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [guess, setGuess] = useState("");
  const [message, setMessage] = useState("");

  const q = questions[index];
  const progress = completed ? 100 : Math.round((index / questions.length) * 100);
  const shuffledLetters = useMemo(() => earnedLetters.join(" "), [earnedLetters]);

  const choose = (answerIndex) => {
    if (answerIndex === q.correct) {
      if (q.letter) setEarnedLetters((prev) => [...prev, q.letter]);
      setWrong([]);
      setHintOpen(false);
      if (index === questions.length - 1) {
        setCompleted(true);
      } else {
        setIndex((i) => i + 1);
      }
    } else {
      setWrong((prev) => (prev.includes(answerIndex) ? prev : [...prev, answerIndex]));
    }
  };

  const checkSolution = () => {
    const normalized = guess.trim().toUpperCase().replace(/Ü/g, "UE").replace(/Ä/g, "AE").replace(/Ö/g, "OE");
    if (normalized === "ZELLKERN") {
      setMessage("Mission geschafft! Du hast das Lösungswort geknackt.");
    } else {
      setMessage("Noch nicht ganz. Ordne die verdienten Buchstaben neu und versuche es erneut.");
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 rounded-3xl border border-cyan-500/20 bg-slate-900/80 p-6 shadow-2xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-300">KaesbachsQuest</p>
              <h1 className="mt-2 text-3xl font-black md:text-4xl">Mission Zellwelt</h1>
              <p className="mt-2 text-slate-300">Biologie · Klasse 9 · Zelle & Zellbestandteile</p>
            </div>
            <select value={level} onChange={(e)=>setLevel(e.target.value)} className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 font-semibold">
              {Object.entries(LEVELS).map(([key, value]) => <option key={key} value={key}>{value.label}</option>)}
            </select>
          </div>
          <div className="mt-5 h-3 overflow-hidden rounded-full bg-slate-800"><div className="h-full bg-cyan-400 transition-all" style={{width:`${progress}%`}} /></div>
          <div className="mt-2 flex justify-between text-xs text-slate-400"><span>Fortschritt</span><span>{completed ? questions.length : index} / {questions.length}</span></div>
        </header>

        {!completed ? (
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 md:p-8">
            <div className="mb-5 flex items-center justify-between gap-3">
              <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-bold text-cyan-300">Frage {index + 1} von {questions.length}</span>
              <span className="text-sm text-slate-400">{LEVELS[level].label}</span>
            </div>

            <div className="mb-6 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-2"><SVG type={q.image} /></div>
            <h2 className="text-xl font-bold leading-snug md:text-2xl">{q.question}</h2>

            <div className="mt-6 grid gap-3">
              {q.answers.map((answer, i) => (
                <button key={answer} disabled={wrong.includes(i)} onClick={()=>choose(i)} className={`rounded-2xl border px-5 py-4 text-left font-semibold transition ${wrong.includes(i) ? "cursor-not-allowed border-slate-800 bg-slate-950 text-slate-600 line-through" : "border-slate-700 bg-slate-800 hover:border-cyan-400 hover:bg-slate-800/70"}`}>
                  <span className="mr-3 text-cyan-300">{String.fromCharCode(65+i)}.</span>{answer}
                </button>
              ))}
            </div>

            {wrong.length > 0 && <p className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-200">Diese Antwort passt noch nicht. Sie wurde entfernt – versuche es erneut.</p>}

            <div className="mt-5">
              {LEVELS[level].hintMode === "visible" && <p className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100"><strong>Hinweis:</strong> {q.hint}</p>}
              {LEVELS[level].hintMode === "button" && <>
                <button onClick={()=>setHintOpen(v=>!v)} className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-200">{hintOpen ? "Hinweis ausblenden" : "Hinweis anzeigen"}</button>
                {hintOpen && <p className="mt-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-100">{q.hint}</p>}
              </>}
            </div>

            <div className="mt-6 rounded-2xl border border-violet-500/20 bg-violet-500/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-violet-300">Verdiente Buchstaben</p>
              <p className="mt-2 text-xl font-black tracking-[0.35em]">{shuffledLetters || "—"}</p>
            </div>
          </section>
        ) : (
          <section className="rounded-3xl border border-emerald-500/20 bg-slate-900 p-6 md:p-10 text-center">
            <div className="mx-auto mb-5 max-w-md overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/60 p-2"><SVG type="nucleus" /></div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-emerald-300">Finale</p>
            <h2 className="mt-2 text-3xl font-black">Alle Fragen geschafft!</h2>
            <p className="mt-3 text-slate-300">Ordne deine Buchstaben zum gesuchten Lösungswort.</p>
            <p className="mt-5 text-3xl font-black tracking-[0.4em] text-violet-300">{shuffledLetters}</p>
            <div className="mx-auto mt-6 flex max-w-md gap-2">
              <input value={guess} onChange={(e)=>setGuess(e.target.value)} onKeyDown={(e)=>e.key==="Enter"&&checkSolution()} placeholder="Lösungswort" className="min-w-0 flex-1 rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 uppercase outline-none focus:border-cyan-400" />
              <button onClick={checkSolution} className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950">Prüfen</button>
            </div>
            {message && <p className={`mx-auto mt-5 max-w-xl rounded-xl p-4 font-semibold ${message.startsWith("Mission") ? "bg-emerald-500/10 text-emerald-200" : "bg-amber-500/10 text-amber-200"}`}>{message}</p>}
          </section>
        )}

        <footer className="py-6 text-center text-xs text-slate-500">KaesbachsQuest · Zellbiologie · responsive für PC, Tablet und Smartphone</footer>
      </div>
    </main>
  );
}
