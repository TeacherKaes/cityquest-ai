"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const missions = [
  {
    id: 1,
    place: "Trafalgar Square",
    tag: "OBSERVATION",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trafalgar%20Square%202026-04-25.jpg",
    credit: "Wikimedia Commons – Trafalgar Square 2026-04-25",
    prompt: "Look carefully at the photograph. Which feature is the clearest sign that this is Trafalgar Square?",
    options: ["A large Ferris wheel beside the road","Nelson's Column rising above the square","A drawbridge across the Thames","A royal balcony with guards"],
    correct: 1,
    explanation: "Nelson's Column is the dominant landmark in Trafalgar Square and one of its most recognisable features.",
    code: "4"
  },
  {
    id: 2,
    place: "Buckingham Palace",
    tag: "VISUAL CLUE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Buckingham%20Palace%20east%20front.jpg",
    credit: "Wikimedia Commons – Buckingham Palace east front",
    prompt: "Which visual clue best supports the idea that this building has a ceremonial royal function?",
    options: ["The symmetrical palace façade and formal forecourt","A large advertising screen above the entrance","Rows of market stalls at the gate","A railway platform directly outside"],
    correct: 0,
    explanation: "The formal façade, forecourt and ceremonial setting are strong clues that this is an important state and royal building.",
    code: "8"
  },
  {
    id: 3,
    place: "Westminster",
    tag: "FACT CHECK",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20Ben%20from%20the%20Westminster%20Bridge.jpg",
    credit: "Wikimedia Commons – Big Ben from Westminster Bridge",
    prompt: "People often call the whole tower 'Big Ben'. What does the name Big Ben originally refer to?",
    options: ["The Great Bell inside the clock tower","The whole Palace of Westminster","Westminster Bridge","The clock face only"],
    correct: 0,
    explanation: "Big Ben originally refers to the Great Bell. The tower is officially called the Elizabeth Tower.",
    code: "2"
  },
  {
    id: 4,
    place: "Covent Garden",
    tag: "CITY LIFE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Covent%20Garden%20London.jpg",
    credit: "Wikimedia Commons – Covent Garden London",
    prompt: "Imagine you are planning to spend 30 minutes here. Which activity fits Covent Garden best?",
    options: ["Watch street performers and explore the market area","Take a ferry to France","Visit the Crown Jewels inside the market hall","Board a long-distance train to Edinburgh"],
    correct: 0,
    explanation: "Covent Garden is especially known for its market atmosphere, shops, cafés and street performers.",
    code: "9"
  },
  {
    id: 5,
    place: "Tower Bridge",
    tag: "ENGINEERING",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20Bridge%2C%20London%20England%20United%20Kingdom.jpg",
    credit: "Wikimedia Commons – Tower Bridge, London",
    prompt: "Why can Tower Bridge allow tall ships to pass?",
    options: ["The whole bridge slides sideways","Its central road sections can lift upwards","Ships pass through an underground tunnel","The towers move apart"],
    correct: 1,
    explanation: "Tower Bridge is a bascule bridge: the two central sections can raise to let tall vessels pass.",
    code: "1"
  },
  {
    id: 6,
    place: "Final Checkpoint",
    tag: "FINAL",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20Bridge%20spanning%20the%20River%20Thames%20in%20London%20under%20a%20clear%20blue%20sky.jpg",
    credit: "Wikimedia Commons – London reference image",
    prompt: "Enter the five code digits you collected in mission order.",
    options: [],
    correct: null,
    explanation: "",
    code: ""
  }
];

export default function PlayPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [collected, setCollected] = useState([]);
  const [finalCode, setFinalCode] = useState("");
  const [finished, setFinished] = useState(false);

  const mission = missions[index];
  const expected = useMemo(() => missions.slice(0, 5).map(m => m.code).join(""), []);

  function choose(optionIndex) {
    if (answered) return;
    setSelected(optionIndex);
    setAnswered(true);
    if (optionIndex === mission.correct) {
      setCollected(prev => prev.includes(mission.code) ? prev : [...prev, mission.code]);
    }
  }

  function next() {
    if (index < missions.length - 1) {
      setIndex(index + 1);
      setSelected(null);
      setAnswered(false);
    }
  }

  if (finished) {
    return (
      <>
        <header className="topbar"><div className="brand"><div className="logo">🏆</div><div><h1>Mission Complete</h1><span>CityQuest London</span></div></div></header>
        <main><div className="completion card"><div className="completion-icon">✓</div><h2>Case solved.</h2><p>You completed the London visual challenge and reconstructed the final code.</p><div className="score">5 / 5 clues collected</div><Link href="/"><button>Back to Start</button></Link></div></main>
      </>
    );
  }

  return (
    <>
      <header className="topbar">
        <div className="brand"><div className="logo">🇬🇧</div><div><h1>CityQuest London</h1><span>{mission.place}</span></div></div>
        <div className="progress-wrap"><span>{index + 1} / {missions.length}</span><div className="progress"><div style={{width: `${((index + 1) / missions.length) * 100}%`}} /></div></div>
      </header>

      <main>
        <section className="game-grid">
          <aside className="card side-panel">
            <div className="side-title">MISSION ROUTE</div>
            {missions.map((m, i) => (
              <div className={`route-item ${i === index ? "current" : ""} ${i < index ? "done" : ""}`} key={m.id}>
                <span className="route-dot">{i < index ? "✓" : i + 1}</span>
                <div><strong>{m.place}</strong><small>{m.tag}</small></div>
              </div>
            ))}
            <div className="inventory-title">CODE FRAGMENTS</div>
            <div className="code-row">
              {[0,1,2,3,4].map(i => <div className={`code-box ${collected[i] ? "filled" : ""}`} key={i}>{collected[i] || "?"}</div>)}
            </div>
          </aside>

          <section className="card mission-card">
            <div className="mission-meta"><span className="tag gold">{mission.tag}</span><span className="mission-number">MISSION {mission.id}</span></div>
            <h2>{mission.place}</h2>
            <figure className="photo-frame"><img src={mission.image} alt={mission.place} /><figcaption>{mission.credit}</figcaption></figure>

            <div className="question-box">
              <h3>{mission.prompt}</h3>

              {mission.id < 6 ? (
                <div className="answers">
                  {mission.options.map((option, i) => {
                    const isCorrect = answered && i === mission.correct;
                    const isWrong = answered && selected === i && i !== mission.correct;
                    return (
                      <button key={option} className={`answer ${selected === i ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => choose(i)}>
                        <span>{String.fromCharCode(65 + i)}</span>{option}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="final-box">
                  <input value={finalCode} onChange={e => setFinalCode(e.target.value)} placeholder="Enter 5-digit code" maxLength={5} />
                  <button onClick={() => finalCode.trim() === expected ? setFinished(true) : null}>Unlock Case</button>
                  {finalCode.length === 5 && finalCode !== expected && <p className="final-error">That code does not fit the clues. Check your fragments.</p>}
                </div>
              )}

              {answered && (
                <div className={`feedback ${selected === mission.correct ? "good" : "retry"}`}>
                  <strong>{selected === mission.correct ? "Correct." : "Not quite."}</strong>
                  <p>{mission.explanation}</p>
                  {selected === mission.correct ? <div className="fragment">CODE FRAGMENT: <b>{mission.code}</b></div> : <button className="secondary" onClick={() => {setSelected(null); setAnswered(false);}}>Try again</button>}
                </div>
              )}

              {answered && selected === mission.correct && <button className="next-btn" onClick={next}>{index === 4 ? "Go to Final Checkpoint" : "Next Mission"}</button>}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}