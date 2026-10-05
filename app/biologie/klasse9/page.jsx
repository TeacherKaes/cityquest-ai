"use client";

import { useMemo, useState } from "react";

const LEVELS = {
  neuling: {
    label: "Neuling",
    icon: "🌱",
    subtitle: "Hinweis immer sichtbar",
    hintMode: "visible",
  },
  entdecker: {
    label: "Entdecker",
    icon: "🧭",
    subtitle: "Hinweis bei Bedarf",
    hintMode: "button",
  },
  profi: {
    label: "Profi",
    icon: "🏆",
    subtitle: "Ohne Hinweise",
    hintMode: "hidden",
  },
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

function Illustration({ type }) {
  const common = {
    viewBox: "0 0 720 480",
    role: "img",
    "aria-label": "Zellbiologische Illustration",
    className: "h-full w-full",
  };

  const shell = (
    <>
      <defs>
        <radialGradient id="cellGlow" cx="42%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#203764" />
          <stop offset="55%" stopColor="#14243f" />
          <stop offset="100%" stopColor="#0b1426" />
        </radialGradient>
        <linearGradient id="membraneGrad" x1="0" x2="1">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
        <filter id="softGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="720" height="480" rx="34" fill="#07111f" />
      <circle cx="610" cy="76" r="125" fill="#0ea5e9" opacity="0.07" />
      <circle cx="76" cy="420" r="150" fill="#8b5cf6" opacity="0.07" />
    </>
  );

  const animalCell = (
    <g>
      <path
        d="M118 242c0-110 101-174 245-174 142 0 246 64 246 174S505 416 363 416c-144 0-245-64-245-174Z"
        fill="url(#cellGlow)"
        stroke="url(#membraneGrad)"
        strokeWidth="6"
      />
      <path
        d="M132 242c0-99 92-159 231-159 136 0 231 60 231 159S499 401 363 401c-139 0-231-60-231-159Z"
        fill="none"
        stroke="#dbeafe"
        strokeOpacity="0.15"
        strokeWidth="2"
      />
    </g>
  );

  if (type === "nucleus") {
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <g filter="url(#softGlow)">
          <circle cx="365" cy="239" r="93" fill="#5b21b6" stroke="#c4b5fd" strokeWidth="6" />
          <circle cx="365" cy="239" r="70" fill="#6d28d9" opacity="0.55" />
          <circle cx="388" cy="219" r="24" fill="#ddd6fe" opacity="0.9" />
          <path d="M323 212c15-27 43-17 63 2 17 17 35 17 51-3M316 266c20-31 46-20 68 3 18 19 35 18 48 1" fill="none" stroke="#f5f3ff" strokeWidth="7" strokeLinecap="round" opacity="0.9" />
          <circle cx="315" cy="242" r="6" fill="#f5f3ff" />
          <circle cx="418" cy="262" r="6" fill="#f5f3ff" />
        </g>
      </svg>
    );
  }

  if (type === "mitochondrion") {
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <g transform="translate(8 -2)" filter="url(#softGlow)">
          <path d="M214 263c-8-74 57-129 148-129 94 0 160 52 153 127-7 74-81 117-169 112-83-4-124-40-132-110Z" fill="#b45309" stroke="#fdba74" strokeWidth="7" />
          <path d="M244 249c20-63 54-16 87-57 27-34 54 35 85-4 28-34 55 25 74-8M245 294c27-51 59 19 88-22 28-39 56 28 85-9 25-31 46 16 65-8" fill="none" stroke="#ffedd5" strokeWidth="10" strokeLinecap="round" />
        </g>
      </svg>
    );
  }

  if (type === "ribosome") {
    const dots = Array.from({ length: 28 }, (_, i) => {
      const x = 205 + (i % 7) * 49 + (i % 2) * 8;
      const y = 155 + Math.floor(i / 7) * 51;
      return <circle key={i} cx={x} cy={y} r="10" fill={i % 3 === 0 ? "#fde047" : "#facc15"} opacity="0.95" />;
    });
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <path d="M170 322c75-38 164-30 237-1 60 24 106 22 144 1" fill="none" stroke="#7c3aed" strokeWidth="10" strokeLinecap="round" opacity="0.9" />
        {dots}
        <g opacity="0.4">
          <circle cx="184" cy="126" r="7" fill="#facc15" />
          <circle cx="525" cy="144" r="7" fill="#facc15" />
          <circle cx="542" cy="338" r="7" fill="#facc15" />
        </g>
      </svg>
    );
  }

  if (type === "membrane") {
    const lipids = Array.from({ length: 26 }, (_, i) => {
      const x = 118 + i * 18.7;
      return (
        <g key={i} opacity="0.95">
          <circle cx={x} cy="189" r="6" fill="#67e8f9" />
          <line x1={x - 2} y1="195" x2={x - 5} y2="211" stroke="#38bdf8" strokeWidth="3" />
          <line x1={x + 2} y1="195" x2={x + 5} y2="211" stroke="#38bdf8" strokeWidth="3" />
          <circle cx={x} cy="291" r="6" fill="#67e8f9" />
          <line x1={x - 2} y1="285" x2={x - 5} y2="269" stroke="#38bdf8" strokeWidth="3" />
          <line x1={x + 2} y1="285" x2={x + 5} y2="269" stroke="#38bdf8" strokeWidth="3" />
        </g>
      );
    });
    return (
      <svg {...common}>
        {shell}
        <rect x="90" y="138" width="540" height="204" rx="102" fill="#10213b" stroke="#0ea5e9" strokeWidth="3" />
        {lipids}
        <path d="M290 170c18 18 17 36 5 52-15 19-13 40 5 60 16 18 15 38 1 56" fill="none" stroke="#f472b6" strokeWidth="18" strokeLinecap="round" />
        <path d="M421 173c-17 24-18 45 0 64 18 20 18 41 1 68 17 17 18 32 5 49" fill="none" stroke="#a78bfa" strokeWidth="16" strokeLinecap="round" />
        <circle cx="544" cy="241" r="22" fill="#f59e0b" opacity="0.95" />
      </svg>
    );
  }

  if (type === "roughER") {
    const dots = Array.from({ length: 34 }, (_, i) => {
      const x = 178 + (i % 9) * 37 + (i % 3) * 5;
      const y = 143 + Math.floor(i / 9) * 62 + (i % 2) * 5;
      return <circle key={i} cx={x} cy={y} r="6" fill="#fde047" />;
    });
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <circle cx="477" cy="238" r="67" fill="#5b21b6" stroke="#c4b5fd" strokeWidth="5" />
        <path d="M168 150c74-45 176-36 260-4M157 210c80-40 183-35 269 0M168 270c75-35 169-30 249 9M188 326c67-28 141-20 205 9" fill="none" stroke="#60a5fa" strokeWidth="14" strokeLinecap="round" opacity="0.9" />
        {dots}
      </svg>
    );
  }

  if (type === "golgi") {
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <g transform="translate(10 0)" filter="url(#softGlow)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path key={i} d={`M210 ${155 + i * 29} C295 ${118 + i * 29} 397 ${121 + i * 29} 475 ${160 + i * 29}`} fill="none" stroke={i % 2 ? "#fb7185" : "#f472b6"} strokeWidth="14" strokeLinecap="round" />
          ))}
          <circle cx="502" cy="177" r="17" fill="#fecdd3" />
          <circle cx="526" cy="229" r="13" fill="#fda4af" />
          <circle cx="492" cy="301" r="20" fill="#fecdd3" />
          <circle cx="548" cy="330" r="10" fill="#fda4af" />
        </g>
      </svg>
    );
  }

  if (type === "chloroplast") {
    return (
      <svg {...common}>
        {shell}
        <rect x="118" y="92" width="484" height="296" rx="70" fill="#123c2c" stroke="#4ade80" strokeWidth="8" />
        <rect x="135" y="109" width="450" height="262" rx="58" fill="#14532d" opacity="0.65" />
        {[0, 1, 2, 3, 4].map((g) => (
          <g key={g} transform={`translate(${180 + g * 80} 0)`}>
            {[0, 1, 2, 3].map((i) => (
              <rect key={i} x="0" y={164 + i * 28} width="50" height="14" rx="7" fill="#86efac" />
            ))}
          </g>
        ))}
        <path d="M165 325c83-43 186-44 275-8 44 18 85 17 122 1" fill="none" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "lysosome") {
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} filter="url(#softGlow)">
            <circle cx={230 + i * 66} cy={205 + (i % 2) * 70} r={34 - i * 2} fill="#a21caf" stroke="#f0abfc" strokeWidth="4" opacity="0.9" />
            <path d={`M${218 + i * 66} ${193 + (i % 2) * 70}l24 24m-24 0 24-24`} stroke="#fae8ff" strokeWidth="5" strokeLinecap="round" />
          </g>
        ))}
      </svg>
    );
  }

  if (type === "cytoplasm") {
    return (
      <svg {...common}>
        {shell}
        {animalCell}
        <circle cx="438" cy="229" r="58" fill="#6d28d9" stroke="#c4b5fd" strokeWidth="4" />
        <path d="M190 174c27-30 58 12 81-11 27-28 59 15 84-8" fill="none" stroke="#fb923c" strokeWidth="9" strokeLinecap="round" />
        <path d="M200 309c44-33 80 24 122-10 43-35 77 14 118-3" fill="none" stroke="#38bdf8" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <circle key={i} cx={190 + i * 48} cy={238 + ((i % 3) - 1) * 55} r="9" fill="#facc15" opacity="0.9" />
        ))}
      </svg>
    );
  }

  return (
    <svg {...common}>
      {shell}
      {animalCell}
      <circle cx="363" cy="238" r="59" fill="#6d28d9" stroke="#c4b5fd" strokeWidth="4" />
      <path d="M171 179c25-37 60 23 88-14 24-30 59 19 84-11" fill="none" stroke="#fb923c" strokeWidth="10" strokeLinecap="round" />
      <path d="M455 154c-24 20-26 46-2 66 23 20 23 46 0 67 20 17 21 38 3 59" fill="none" stroke="#fb7185" strokeWidth="12" strokeLinecap="round" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={188 + i * 55} cy="324" r="8" fill="#facc15" />
      ))}
      <path d="M209 368c74-34 174-31 265 5" fill="none" stroke="#60a5fa" strokeWidth="8" strokeLinecap="round" opacity="0.75" />
    </svg>
  );
}

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
      if (index === questions.length - 1) setCompleted(true);
      else setIndex((i) => i + 1);
    } else {
      setWrong((prev) => (prev.includes(answerIndex) ? prev : [...prev, answerIndex]));
    }
  };

  const checkSolution = () => {
    const normalized = guess
      .trim()
      .toUpperCase()
      .replace(/Ü/g, "UE")
      .replace(/Ä/g, "AE")
      .replace(/Ö/g, "OE");

    if (normalized === "ZELLKERN") {
      setMessage("Mission geschafft! Du hast das Lösungswort geknackt.");
    } else {
      setMessage("Noch nicht ganz. Ordne die verdienten Buchstaben neu und versuche es erneut.");
    }
  };

  const answerLetters = ["A", "B", "C", "D"];

  return (
    <main className="min-h-screen bg-[#050b14] text-slate-100">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-20 top-12 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-5 md:px-7 md:py-8">
        <header className="mb-5 overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/75 shadow-2xl backdrop-blur">
          <div className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-7">
            <div>
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-cyan-300">
                <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_15px_rgba(103,232,249,.9)]" />
                KaesbachsQuest
              </div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">Mission Zellwelt</h1>
              <p className="mt-1 text-sm text-slate-400 md:text-base">Biologie · Klasse 9 · Zelle & Zellbestandteile</p>
            </div>

            <div className="grid grid-cols-3 gap-2 md:w-[430px]">
              {Object.entries(LEVELS).map(([key, value]) => {
                const active = level === key;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      setLevel(key);
                      setHintOpen(false);
                    }}
                    className={`rounded-2xl border p-3 text-left transition ${
                      active
                        ? "border-cyan-300/70 bg-cyan-300/10 shadow-[0_0_25px_rgba(34,211,238,.12)]"
                        : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.05]"
                    }`}
                  >
                    <div className="text-lg">{value.icon}</div>
                    <div className={`mt-1 text-sm font-extrabold ${active ? "text-cyan-200" : "text-slate-200"}`}>{value.label}</div>
                    <div className="mt-0.5 hidden text-[11px] leading-tight text-slate-500 sm:block">{value.subtitle}</div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="border-t border-white/10 px-5 py-4 md:px-7">
            <div className="mb-2 flex items-center justify-between text-xs font-semibold text-slate-400">
              <span>MISSIONSFORTSCHRITT</span>
              <span>{completed ? questions.length : index} / {questions.length}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-slate-800">
              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-400 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </header>

        {!completed ? (
          <section className="grid gap-5 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="overflow-hidden rounded-[28px] border border-white/10 bg-slate-900/70 shadow-xl">
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-cyan-300">Missionsbild</span>
                <span className="rounded-full bg-white/[0.04] px-3 py-1 text-xs text-slate-500">Zellbiologie</span>
              </div>
              <div className="aspect-[3/2] w-full p-3 md:p-4">
                <div className="h-full overflow-hidden rounded-[22px] border border-white/10 bg-[#07111f]">
                  <Illustration type={q.image} />
                </div>
              </div>
              <div className="border-t border-white/10 px-5 py-4 text-sm leading-relaxed text-slate-400">
                Nutze die Abbildung als Orientierung. Sie zeigt Strukturen aus dem Themenfeld der aktuellen Aufgabe, ohne die Lösung zu beschriften.
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-900/70 p-5 shadow-xl md:p-7">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-cyan-300">
                  Frage {index + 1} von {questions.length}
                </span>
                <span className="text-sm font-bold text-slate-400">{LEVELS[level].icon} {LEVELS[level].label}</span>
              </div>

              <h2 className="text-2xl font-black leading-tight text-white md:text-[1.8rem]">{q.question}</h2>

              <div className="mt-7 grid gap-3">
                {q.answers.map((answer, i) => {
                  const disabled = wrong.includes(i);
                  return (
                    <button
                      key={`${answer}-${i}`}
                      disabled={disabled}
                      onClick={() => choose(i)}
                      className={`group flex w-full items-start gap-4 rounded-2xl border px-4 py-4 text-left transition md:px-5 ${
                        disabled
                          ? "cursor-not-allowed border-red-400/10 bg-red-400/[0.04] text-slate-600"
                          : "border-white/10 bg-white/[0.035] text-slate-100 hover:-translate-y-0.5 hover:border-cyan-300/60 hover:bg-cyan-300/[0.06]"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border text-sm font-black ${
                        disabled
                          ? "border-red-400/15 bg-red-400/[0.05] text-slate-600"
                          : "border-cyan-400/20 bg-cyan-400/10 text-cyan-300 group-hover:border-cyan-300/50"
                      }`}>
                        {answerLetters[i]}
                      </span>
                      <span className={`pt-1 text-[15px] font-semibold leading-snug md:text-base ${disabled ? "line-through" : ""}`}>{answer}</span>
                    </button>
                  );
                })}
              </div>

              {wrong.length > 0 && (
                <div className="mt-4 flex gap-3 rounded-2xl border border-amber-400/15 bg-amber-400/[0.06] p-4 text-sm text-amber-100">
                  <span className="text-lg">↻</span>
                  <p>Diese Antwort passt noch nicht. Sie ist deaktiviert – wähle erneut.</p>
                </div>
              )}

              <div className="mt-5">
                {LEVELS[level].hintMode === "visible" && (
                  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4">
                    <p className="text-xs font-black uppercase tracking-[0.16em] text-emerald-300">Hinweis</p>
                    <p className="mt-2 text-sm leading-relaxed text-emerald-50/90">{q.hint}</p>
                  </div>
                )}

                {LEVELS[level].hintMode === "button" && (
                  <>
                    <button
                      onClick={() => setHintOpen((v) => !v)}
                      className="rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-2.5 text-sm font-extrabold text-emerald-200 transition hover:border-emerald-300/40 hover:bg-emerald-400/[0.09]"
                    >
                      {hintOpen ? "Hinweis ausblenden" : "Hinweis anzeigen"}
                    </button>
                    {hintOpen && (
                      <div className="mt-3 rounded-2xl border border-emerald-400/15 bg-emerald-400/[0.06] p-4 text-sm leading-relaxed text-emerald-50/90">
                        {q.hint}
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-400/[0.06] p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Verdiente Buchstaben</p>
                  <span className="text-xs text-slate-500">Lösungswort</span>
                </div>
                <p className="mt-3 min-h-8 text-2xl font-black tracking-[0.4em] text-violet-100">{shuffledLetters || "—"}</p>
              </div>
            </div>
          </section>
        ) : (
          <section className="mx-auto max-w-4xl overflow-hidden rounded-[30px] border border-emerald-400/15 bg-slate-900/75 shadow-2xl">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="min-h-[300px] bg-[#07111f] p-5">
                <Illustration type="nucleus" />
              </div>
              <div className="p-6 md:p-10">
                <span className="inline-flex rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-emerald-300">Finale</span>
                <h2 className="mt-4 text-3xl font-black md:text-4xl">Alle Fragen geschafft!</h2>
                <p className="mt-3 text-slate-400">Ordne deine verdienten Buchstaben zum gesuchten Lösungswort.</p>
                <div className="mt-6 rounded-2xl border border-violet-400/15 bg-violet-400/[0.06] p-5">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-violet-300">Deine Buchstaben</p>
                  <p className="mt-3 text-3xl font-black tracking-[0.35em] text-violet-100">{shuffledLetters}</p>
                </div>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <input
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && checkSolution()}
                    placeholder="Lösungswort eingeben"
                    className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 font-bold uppercase outline-none transition placeholder:normal-case placeholder:font-medium placeholder:text-slate-600 focus:border-cyan-300/60"
                  />
                  <button onClick={checkSolution} className="rounded-2xl bg-cyan-300 px-6 py-3.5 font-black text-slate-950 transition hover:bg-cyan-200">Prüfen</button>
                </div>
                {message && (
                  <p className={`mt-5 rounded-2xl border p-4 text-sm font-semibold ${
                    message.startsWith("Mission")
                      ? "border-emerald-400/15 bg-emerald-400/[0.06] text-emerald-200"
                      : "border-amber-400/15 bg-amber-400/[0.06] text-amber-100"
                  }`}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </section>
        )}

        <footer className="py-6 text-center text-xs text-slate-600">KaesbachsQuest · Zellbiologie · Klasse 9</footer>
      </div>
    </main>
  );
}
