"use client";

import { useState } from "react";
import Link from "next/link";

const missions = [
  {
    id: 1,
    place: "Trafalgar Square",
    tag: "OBSERVATION",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Nelson%27s%20Column%20Trafalgar.jpg",
    credit: "Wikimedia Commons – Nelson's Column, Trafalgar Square",
    prompt: "Look closely at the photograph. Which feature is the strongest clue that you are at Trafalgar Square?",
    options: [
      "The glass wheel beside the river",
      "Nelson's Column in the centre of the square",
      "The raised road sections of a bridge",
      "A palace balcony with guards"
    ],
    correct: 1,
    explanation: "Nelson's Column is one of Trafalgar Square's most recognisable landmarks.",
    code: null,
    codeSlot: null
  },
  {
    id: 2,
    place: "Buckingham Palace",
    tag: "VISUAL CLUE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Buckingham%20Palace%20%281%29%20-%2017%20May%202026.jpg",
    credit: "Wikimedia Commons – Buckingham Palace",
    prompt: "Study the façade, gates and forecourt. Which description best fits what you can see?",
    options: [
      "A modern office block for technology companies",
      "A busy indoor food market",
      "A railway station with several platforms",
      "A formal royal and ceremonial building"
    ],
    correct: 3,
    explanation: "The formal façade, gates and large ceremonial forecourt are strong visual clues that this is a royal state building.",
    code: "1",
    codeSlot: 0
  },
  {
    id: 3,
    place: "Westminster",
    tag: "FACT CHECK",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Big%20Ben%20from%20the%20Westminster%20Bridge.jpg",
    credit: "Wikimedia Commons – Big Ben from Westminster Bridge",
    prompt: "The photograph shows the famous clock tower at Westminster. What does the name 'Big Ben' originally refer to?",
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
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Underground.svg",
    credit: "Wikimedia Commons – London Underground roundel",
    prompt: "You see this symbol while walking through London. What does it show you?",
    options: [
      "The entrance to a hospital",
      "A national railway-only station",
      "A London Underground station",
      "A tourist information office"
    ],
    correct: 2,
    explanation: "The red-and-blue roundel is the famous symbol of the London Underground.",
    code: "1",
    codeSlot: 1
  },
  {
    id: 5,
    place: "Crossing the Road",
    tag: "EVERYDAY LONDON",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/London%20Look%20Right.jpg",
    credit: "Wikimedia Commons – 'Look Right' road marking in London",
    prompt: "Why is 'LOOK RIGHT' painted on the road at this crossing?",
    options: [
      "Because pedestrians in London must always turn right",
      "Because many visitors are not used to traffic driving on the left",
      "Because only buses are allowed to come from the right",
      "Because cars in London may only turn right"
    ],
    correct: 1,
    explanation: "The warning helps visitors remember that traffic patterns may feel reversed if they come from countries where vehicles drive on the right.",
    code: null,
    codeSlot: null
  },
  {
    id: 6,
    place: "Covent Garden",
    tag: "CITY LIFE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Covent%20Garden%20London.jpg",
    credit: "Wikimedia Commons – Covent Garden",
    prompt: "Look at the square and surrounding buildings. Which plan fits this London location best?",
    options: [
      "Watch an aircraft take off from the runway",
      "Walk through the Houses of Parliament",
      "Visit a football stadium during a match",
      "Explore shops, cafés, the market area and street performances"
    ],
    correct: 3,
    explanation: "Covent Garden is known for its lively public space, market area, shops, cafés and street performers.",
    code: "2",
    codeSlot: 2
  },
  {
    id: 7,
    place: "London Eye",
    tag: "PERSPECTIVE",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/London%20Eye%202026.jpg",
    credit: "Wikimedia Commons – London Eye in 2026",
    prompt: "What is the main purpose of this structure for visitors?",
    options: [
      "To give high panoramic views over London",
      "To carry trains across the Thames",
      "To open for tall ships",
      "To protect the city as a fortress"
    ],
    correct: 0,
    explanation: "The London Eye is an observation wheel. Its height gives visitors wide views across central London.",
    code: null,
    codeSlot: null
  },
  {
    id: 8,
    place: "Tower of London",
    tag: "HISTORY",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20of%20London%20White%20Tower.jpg",
    credit: "Wikimedia Commons – White Tower, Tower of London",
    prompt: "This is the White Tower, the oldest major building in the complex. Who ordered its construction after the Norman Conquest?",
    options: [
      "Queen Victoria",
      "Winston Churchill",
      "William the Conqueror",
      "William Shakespeare"
    ],
    correct: 2,
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
    prompt: "Look at the central section between the two towers. How can tall ships pass through?",
    options: [
      "The entire bridge moves sideways",
      "Ships are lowered below the river",
      "The towers roll away from each other",
      "The two central road sections can lift upwards"
    ],
    correct: 3,
    explanation: "Tower Bridge is a bascule bridge. Its two central road sections can rise to let tall vessels pass.",
    code: null,
    codeSlot: null
  },
  {
    id: 10,
    place: "The River Thames",
    tag: "GEOGRAPHY",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Westminster%20Bridge%2C%20River%20Thames%2C%20London%2C%20England.jpg",
    credit: "Wikimedia Commons – Westminster Bridge and the River Thames",
    prompt: "The photo shows one of London's most important natural features. Which statement is correct?",
    options: [
      "It is a canal that only exists in central London",
      "The River Thames flows through central London",
      "It separates London from the rest of England",
      "It is only used as a tourist attraction"
    ],
    correct: 1,
    explanation: "The River Thames flows through central London and has played a major role in the city's history and development.",
    code: "5",
    codeSlot: 4
  },
  {
    id: 11,
    place: "Oyster Card",
    tag: "ENGLISH IN ACTION",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Oystercard.jpg",
    credit: "Wikimedia Commons – Oyster card for London transport",
    prompt: "You are given this card for your day in London. What is it mainly used for?",
    options: [
      "Paying for journeys on public transport",
      "Entering Buckingham Palace without a ticket",
      "Paying only in restaurants",
      "Opening hotel room doors"
    ],
    correct: 0,
    explanation: "An Oyster card is a contactless travel card used on public transport in London.",
    code: null,
    codeSlot: null
  },
  {
    id: 12,
    place: "Final Checkpoint",
    tag: "FINAL",
    image: "https://commons.wikimedia.org/wiki/Special:FilePath/Tower%20Bridge-London%2C%20England%2C%20United%20Kingdom.jpg",
    credit: "Wikimedia Commons – Tower Bridge at dusk",
    prompt: "Your five code fragments are 1 – 1 – 2 – 3 – 5. Each number is the sum of the two numbers before it. Which number comes next?",
    options: ["6", "7", "8", "10"],
    correct: 2,
    explanation: "The next number is 8 because 3 + 5 = 8. This is the Fibonacci sequence.",
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

    if (optionIndex === mission.correct && mission.code !== null && mission.codeSlot !== null) {
      setCollected((prev) => {
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
            <p>You solved 12 London challenges, collected all five code fragments and discovered the Fibonacci pattern.</p>
            <div className="score">FINAL ANSWER: 8</div>
            <Link href="/"><button>Back to Start</button></Link>
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
            <div style={{ width: `${((index + 1) / missions.length) * 100}%` }} />
          </div>
        </div>
      </header>

      <main>
        <section className="game-grid">
          <aside className="card side-panel">
            <div className="side-title">MISSION ROUTE</div>

            {missions.map((m, i) => (
              <div className={`route-item ${i === index ? "current" : ""} ${i < index ? "done" : ""}`} key={m.id}>
                <span className="route-dot">{i < index ? "✓" : i + 1}</span>
                <div>
                  <strong>{m.place}</strong>
                  <small>{m.tag}</small>
                </div>
              </div>
            ))}

            <div className="inventory-title">CODE FRAGMENTS</div>
            <div className="code-row">
              {collected.map((value, i) => (
                <div className={`code-box ${value ? "filled" : ""}`} key={i}>
                  {value || "?"}
                </div>
              ))}
            </div>
          </aside>

          <section className="card mission-card">
            <div className="mission-meta">
              <span className="tag gold">{mission.tag}</span>
              <span className="mission-number">MISSION {mission.id}</span>
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
                  const isWrong = answered && selected === i && i !== mission.correct;

                  return (
                    <button
                      key={option}
                      className={`answer ${selected === i ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                      onClick={() => choose(i)}
                    >
                      <span>{String.fromCharCode(65 + i)}</span>
                      {option}
                    </button>
                  );
                })}
              </div>

              {answered && (
                <div className={`feedback ${correctAnswer ? "good" : "retry"}`}>
                  <strong>{correctAnswer ? "Correct." : "Not quite."}</strong>
                  <p>{mission.explanation}</p>

                  {correctAnswer && mission.code && (
                    <div className="fragment">
                      CODE FRAGMENT: <b>{mission.code}</b>
                    </div>
                  )}

                  {!correctAnswer && (
                    <button className="secondary" onClick={retry}>
                      Try again
                    </button>
                  )}
                </div>
              )}

              {answered && correctAnswer && (
                <button className="next-btn" onClick={next}>
                  {index === missions.length - 1 ? "Complete London Mission" : "Next Mission"}
                </button>
              )}
            </div>
          </section>
        </section>
      </main>
    </>
  );
}
