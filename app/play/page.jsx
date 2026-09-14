"use client";

import { useState } from "react";
import Link from "next/link";

const missions = [
  {
    id: 1,
    place: "Trafalgar Square",
    tag: "OBSERVATION",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Trafalgar%20Square%202026-04-25.jpg",
    credit: "Wikimedia Commons – Trafalgar Square",
    prompt: "Look closely at the photograph. Which feature is the clearest clue that this is Trafalgar Square?",
    options: [
      "A large Ferris wheel beside the road",
      "Nelson's Column rising above the square",
      "A drawbridge across the Thames",
      "A royal balcony with guards"
    ],
    correct: 1,
    explanation: "Nelson's Column is one of the most recognisable features of Trafalgar Square.",
    code: null,
    codeSlot: null
  },
  {
    id: 2,
    place: "Buckingham Palace",
    tag: "VISUAL CLUE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Buckingham%20Palace%20east%20front.jpg",
    credit: "Wikimedia Commons – Buckingham Palace",
    prompt: "Which visual clue best supports the idea that Buckingham Palace has an important ceremonial role?",
    options: [
      "The formal palace façade and large forecourt",
      "A giant shopping sign above the entrance",
      "Market stalls in front of the building",
      "A railway platform beside the gate"
    ],
    correct: 0,
    explanation: "The formal façade, gates and ceremonial forecourt fit the palace's royal and state function.",
    code: "1",
    codeSlot: 0
  },
  {
    id: 3,
    place: "Westminster",
    tag: "FACT CHECK",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20Ben%20from%20the%20Westminster%20Bridge.jpg",
    credit: "Wikimedia Commons – Westminster",
    prompt: "People often call the whole tower 'Big Ben'. What does the name Big Ben originally refer to?",
    options: [
      "The Great Bell inside the tower",
      "The whole Palace of Westminster",
      "Westminster Bridge",
      "Only the clock face"
    ],
    correct: 0,
    explanation: "Big Ben originally refers to the Great Bell. The tower itself is called the Elizabeth Tower.",
    code: null,
    codeSlot: null
  },
  {
    id: 4,
    place: "London Underground",
    tag: "TRANSPORT",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/LondonUnderground%20roundel%20on%20Holborn%20station%20exit.jpg",
    credit: "Wikimedia Commons – London Underground roundel",
    prompt: "You see this sign while walking through London. What does it tell you?",
    options: [
      "There is a hospital nearby",
      "There is a London Underground station",
      "This is a bus-only street",
      "This is the entrance to a museum"
    ],
    correct: 1,
    explanation: "The red-and-blue roundel is the famous symbol of the London Underground.",
    code: "1",
    codeSlot: 1
  },
  {
    id: 5,
    place: "London Traffic",
    tag: "EVERYDAY LONDON",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Red%20double%20decker%20bus%20in%20London.jpg",
    credit: "Wikimedia Commons – London double-decker bus",
    prompt: "You are about to cross a London street. Which fact is especially important for a visitor from Germany?",
    options: [
      "Traffic normally drives on the left",
      "Cars may only drive at night",
      "Buses always have priority over pedestrians",
      "Pedestrians must walk on the road"
    ],
    correct: 0,
    explanation: "In the United Kingdom, traffic normally drives on the left, which can feel unfamiliar to visitors from Germany.",
    code: null,
    codeSlot: null
  },
  {
    id: 6,
    place: "Covent Garden",
    tag: "CITY LIFE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Covent%20Garden%20London.jpg",
    credit: "Wikimedia Commons – Covent Garden",
    prompt: "You have 30 minutes at Covent Garden. Which activity fits the area best?",
    options: [
      "Watch street performers and explore the market area",
      "Take a ferry directly to France",
      "See the Crown Jewels inside the market hall",
      "Board a train to Scotland"
    ],
    correct: 0,
    explanation: "Covent Garden is well known for its market atmosphere, shops, cafés and street performers.",
    code: "2",
    codeSlot: 2
  },
  {
    id: 7,
    place: "London Eye",
    tag: "PERSPECTIVE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/London%20Eye%202026.jpg",
    credit: "Wikimedia Commons – London Eye",
    prompt: "Why is the London Eye a useful place for understanding the layout of central London?",
    options: [
      "It gives a high viewpoint over the city",
      "It travels through underground tunnels",
      "It is London's main railway station",
      "It crosses the Thames like a bridge"
    ],
    correct: 0,
    explanation: "The London Eye gives visitors a high viewpoint over central London and the River Thames.",
    code: null,
    codeSlot: null
  },
  {
    id: 8,
    place: "Tower of London",
    tag: "HISTORY",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20of%20London%20White%20Tower.jpg",
    credit: "Wikimedia Commons – White Tower, Tower of London",
    prompt: "The White Tower was begun after the Norman Conquest. Which ruler is most closely connected with its construction?",
    options: [
      "William the Conqueror",
      "Queen Victoria",
      "Winston Churchill",
      "Henry VIII's son Edward VI"
    ],
    correct: 0,
    explanation: "William the Conqueror ordered the construction of the White Tower after the Norman Conquest.",
    code: "3",
    codeSlot: 3
  },
  {
    id: 9,
    place: "Tower Bridge",
    tag: "ENGINEERING",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20Bridge%2C%20London%20England%20United%20Kingdom.jpg",
    credit: "Wikimedia Commons – Tower Bridge",
    prompt: "Why can Tower Bridge allow tall ships to pass?",
    options: [
      "The whole bridge slides sideways",
      "Its central road sections can lift upwards",
      "Ships use an underground tunnel",
      "The two towers move apart"
    ],
    correct: 1,
    explanation: "Tower Bridge is a bascule bridge. Its central sections can lift to let tall vessels pass.",
    code: null,
    codeSlot: null
  },
  {
    id: 10,
    place: "River Thames",
    tag: "GEOGRAPHY",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/London%20Eye.JPG",
    credit: "Wikimedia Commons – View over the Thames",
    prompt: "The River Thames is a major feature of London. Which statement is correct?",
    options: [
      "It flows through central London",
      "It is an artificial canal built for tourists",
      "It separates London from the rest of England",
      "It only carries water during winter"
    ],
    correct: 0,
    explanation: "The Thames flows directly through central London and has shaped the city's history and development.",
    code: "5",
    codeSlot: 4
  },
  {
    id: 11,
    place: "Getting Around London",
    tag: "ENGLISH IN ACTION",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Underground.svg",
    credit: "Wikimedia Commons – London Underground symbol",
    prompt: "At a ticket machine you read: 'single' and 'return'. You want to travel somewhere and come back later. Which ticket do you need?",
    options: [
      "A single",
      "A return",
      "A platform ticket",
      "A child ticket only"
    ],
    correct: 1,
    explanation: "A return ticket covers the journey there and the journey back.",
    code: null,
    codeSlot: null
  },
  {
    id: 12,
    place: "Final Checkpoint",
    tag: "FINAL",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20Bridge%2C%20London%20England%20United%20Kingdom.jpg",
    credit: "Wikimedia Commons – Tower Bridge",
    prompt: "You collected the sequence 1 – 1 – 2 – 3 – 5. Each number is the sum of the two numbers before it. Which number comes next?",
    options: ["6", "7", "8", "10"],
    correct: 2,
    explanation: "The next number is 8, because 3 + 5 = 8. This pattern is called the Fibonacci sequence.",
    code: null,
    codeSlot: null
  }
];

export default function PlayPage() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);
  const [collected, setCollected] = useState([null, null, null, null, null]);
  const [finished, setFinished] = useState(false);

  const mission = missions[index];
  const correctAnswer = selected === mission.correct;

  function choose(optionIndex) {
    if (answered) return;

    setSelected(optionIndex);
    setAnswered(true);

    if (
      optionIndex === mission.correct &&
      mission.code !== null &&
      mission.codeSlot !== null
    ) {
      setCollected(prev => {
        const next = [...prev];
        next[mission.codeSlot] = mission.code;
        return next;
      });
    }
  }

  function retry() {
    setSelected(null);
    setAnswered(false);
  }

  function next() {
    if (index === missions.length - 1) {
      setFinished(true);
      return;
    }

    setIndex(index + 1);
    setSelected(null);
    setAnswered(false);
  }

  if (finished) {
    return (
      <>
        <header className="topbar">
          <div className="brand">
            <div className="logo">🏆</div>
            <div>
              <h1>Mission Complete</h1>
              <span>CityQuest London</span>
            </div>
          </div>
        </header>

        <main>
          <div className="completion card">
            <div className="completion-icon">✓</div>
            <h2>London mission completed.</h2>
            <p>
              You solved 12 challenges, collected all five code fragments
              and discovered the Fibonacci pattern.
            </p>
            <div className="score">FINAL ANSWER: 8</div>
            <Link href="/">
              <button>Back to Start</button>
            </Link>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="logo">🇬🇧</div>
          <div>
            <h1>CityQuest London</h1>
            <span>{mission.place}</span>
          </div>
        </div>

        <div className="progress-wrap">
          <span>{index + 1} / {missions.length}</span>
          <div className="progress">
            <div
              style={{
                width: `${((index + 1) / missions.length) * 100}%`
              }}
            />
          </div>
        </div>
      </header>

      <main>
        <section className="game-grid">
          <aside className="card side-panel">
            <div className="side-title">MISSION ROUTE</div>

            {missions.map((m, i) => (
              <div
                className={`route-item ${i === index ? "current" : ""} ${
                  i < index ? "done" : ""
                }`}
                key={m.id}
              >
                <span className="route-dot">
                  {i < index ? "✓" : i + 1}
                </span>

                <div>
                  <strong>{m.place}</strong>
                  <small>{m.tag}</small>
                </div>
              </div>
            ))}

            <div className="inventory-title">CODE FRAGMENTS</div>

            <div className="code-row">
              {collected.map((value, i) => (
                <div
                  className={`code-box ${value ? "filled" : ""}`}
                  key={i}
                >
                  {value || "?"}
                </div>
              ))}
            </div>
          </aside>

          <section className="card mission-card">
            <div className="mission-meta">
              <span className="tag gold">{mission.tag}</span>
              <span className="mission-number">
                MISSION {mission.id}
              </span>
            </div>

            <h2>{mission.place}</h2>

            <figure className="photo-frame">
              <img src={mission.image} alt={mission.place} />
              <figcaption>{mission.credit}</figcaption>
            </figure>

            <div className="question-box">
              <h3>{mission.prompt}</h3>

              <div className="answers">
                {mission.options.map((option, i) => {
                  const isCorrect = answered && i === mission.correct;
                  const isWrong =
                    answered && selected === i && i !== mission.correct;

                  return (
                    <button
                      key={option}
                      className={`answer ${
                        selected === i ? "selected" : ""
                      } ${isCorrect ? "correct" : ""} ${
                        isWrong ? "wrong" : ""
                      }`}
                      onClick={() => choose(i)}
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div
                  className={`feedback ${
                    correctAnswer ? "good" : "retry"
                  }`}
                >
                  <strong>
                    {correctAnswer ? "Correct." : "Not quite."}
                  </strong>

                  <p>{mission.explanation}</p>

                  {correctAnswer && mission.code && (
                    <div className="fragment">
                      CODE FRAGMENT: <b>{mission.code}</b>
                    </div>
                  )}

                  {!correctAnswer && (
                    <button
                      className="secondary"
                      onClick={retry}
                    >
                      Try again
                    </button>
                  )}
                </div>
              )}

              {answered && correctAnswer && (
                <button
                  className="next-btn"
                  onClick={next}
                >
                  {index === missions.length - 1
                    ? "Complete London Mission"
                    : "Next Mission"}
                </button>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
