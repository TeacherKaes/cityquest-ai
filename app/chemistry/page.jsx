"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const aufgaben = [
  {
    ort: "Experimentiertisch",
    typ: "BEOBACHTUNG",
    hinweis: "Ein blanker Eisennagel wird in eine blaue Kupfersulfatlösung gestellt. Nach einigen Minuten ist auf dem Nagel ein rötlich-brauner Belag zu sehen.",
    schema: "Eisennagel + blaue Kupfersulfatlösung",
    frage: "Welche Beobachtung spricht am deutlichsten dafür, dass eine chemische Reaktion stattgefunden hat?",
    antworten: [
      "Der Nagel liegt im Becherglas.",
      "Auf dem Nagel entsteht ein rötlich-brauner Belag.",
      "Die Lösung ist flüssig.",
      "Der Nagel besteht weiterhin aus Metall."
    ],
    richtig: 1,
    tipp: "Achte auf eine Veränderung, bei der etwas mit neuen Eigenschaften entsteht.",
    erklaerung: "Der rötlich-braune Belag ist neu entstandenes Kupfer. Die Bildung eines neuen Stoffes ist ein Kennzeichen einer chemischen Reaktion.",
    fragment: null
  },
  {
    ort: "Teilchenschrank",
    typ: "ATOM ODER ION?",
    hinweis: "Ein Eisenatom ist elektrisch neutral. Bei der Reaktion entstehen aus Eisen jedoch positiv geladene Eisenteilchen.",
    schema: "Fe-Atom  →  positiv geladenes Eisen-Ion",
    frage: "Was muss mit Elektronen geschehen, damit aus einem neutralen Eisenatom ein positiv geladenes Ion wird?",
    antworten: [
      "Das Atom muss Elektronen abgeben.",
      "Das Atom muss Elektronen aufnehmen.",
      "Das Atom muss Protonen abgeben.",
      "Es darf sich gar nichts verändern."
    ],
    richtig: 0,
    tipp: "Elektronen sind negativ geladen. Überlege, was passieren muss, damit ein Teilchen insgesamt positiver wird.",
    erklaerung: "Gibt ein neutrales Atom negativ geladene Elektronen ab, bleibt ein positiv geladenes Ion zurück.",
    fragment: "Fe"
  },
  {
    ort: "Blaue Lösung",
    typ: "KUPFER-IONEN",
    hinweis: "Die blaue Farbe der Lösung wird durch Kupfer-Ionen verursacht. Während des Versuchs bildet sich auf dem Nagel metallisches Kupfer.",
    schema: "Kupfer-Ionen in Lösung  →  Kupfer auf dem Nagel",
    frage: "Welche Aussage beschreibt die Veränderung der Kupferteilchen am besten?",
    antworten: [
      "Kupferatome werden zu Eisen-Ionen.",
      "Kupfer-Ionen verschwinden ohne einen neuen Stoff zu bilden.",
      "Kupfer-Ionen werden zu neutralen Kupferatomen.",
      "Kupfer-Ionen werden zu Sulfat-Ionen."
    ],
    richtig: 2,
    tipp: "Der Belag auf dem Nagel besteht aus elementarem, also ungeladenem Kupfer.",
    erklaerung: "Aus den geladenen Kupfer-Ionen entstehen neutrale Kupferatome. Diese bilden den sichtbaren Kupferbelag.",
    fragment: null
  },
  {
    ort: "Elektronenschloss",
    typ: "OXIDATION",
    hinweis: "Beim Versuch werden aus neutralen Eisenatomen positiv geladene Eisen-Ionen.",
    schema: "Eisenatom  →  Eisen-Ion + Elektronen",
    frage: "Wie nennt man einen Vorgang, bei dem ein Teilchen Elektronen abgibt?",
    antworten: [
      "Reduktion",
      "Oxidation",
      "Neutralisation",
      "Lösen"
    ],
    richtig: 1,
    tipp: "Merksatz: Oxidation und Reduktion unterscheiden sich durch Abgabe oder Aufnahme von Elektronen.",
    erklaerung: "Die Abgabe von Elektronen bezeichnet man als Oxidation. Das Eisen wird bei diesem Versuch oxidiert.",
    fragment: "S"
  },
  {
    ort: "Kupferschloss",
    typ: "REDUKTION",
    hinweis: "Aus positiv geladenen Kupfer-Ionen entstehen neutrale Kupferatome, die sich auf dem Nagel abscheiden.",
    schema: "Kupfer-Ion + Elektronen  →  Kupferatom",
    frage: "Was geschieht mit den Kupfer-Ionen?",
    antworten: [
      "Sie nehmen Elektronen auf und werden reduziert.",
      "Sie geben Elektronen ab und werden reduziert.",
      "Sie nehmen Elektronen auf und werden oxidiert.",
      "Sie geben Protonen ab und werden oxidiert."
    ],
    richtig: 0,
    tipp: "Ein positives Ion benötigt negative Ladung, um wieder neutral zu werden.",
    erklaerung: "Die Kupfer-Ionen nehmen Elektronen auf. Elektronenaufnahme bezeichnet man als Reduktion.",
    fragment: "O"
  },
  {
    ort: "Redox-Tür",
    typ: "ELEKTRONENÜBERTRAGUNG",
    hinweis: "Eisen gibt Elektronen ab. Kupfer-Ionen nehmen Elektronen auf. Beide Vorgänge laufen gleichzeitig ab.",
    schema: "Eisen  →  Elektronen  →  Kupfer-Ionen",
    frage: "Warum bezeichnet man die Gesamtreaktion als Redoxreaktion?",
    antworten: [
      "Weil dabei immer Sauerstoff entstehen muss.",
      "Weil nur die Kupfer-Ionen reagieren.",
      "Weil Oxidation und Reduktion miteinander gekoppelt sind.",
      "Weil jede Reaktion mit einem Metall eine Redoxreaktion ist."
    ],
    richtig: 2,
    tipp: "Betrachte beide Reaktionspartner: Einer gibt Elektronen ab, der andere nimmt genau diese Elektronen auf.",
    erklaerung: "Oxidation und Reduktion laufen gekoppelt ab. Die Elektronen werden vom Eisen auf die Kupfer-Ionen übertragen.",
    fragment: null
  },
  {
    ort: "Sulfat-Regal",
    typ: "IONEN IN DER LÖSUNG",
    hinweis: "Kupfersulfatlösung enthält Kupfer-Ionen und Sulfat-Ionen. Die Kupfer-Ionen werden zu Kupfer. Die Sulfat-Ionen bleiben in der Lösung.",
    schema: "vorher: Kupfer-Ionen + Sulfat-Ionen\nnachher: Eisen-Ionen + Sulfat-Ionen",
    frage: "Welche Rolle spielen die Sulfat-Ionen bei der Elektronenübertragung?",
    antworten: [
      "Sie werden zu Kupferatomen.",
      "Sie geben die Elektronen an das Eisen ab.",
      "Sie werden zu Eisenatomen.",
      "Sie bleiben dabei unverändert in der Lösung."
    ],
    richtig: 3,
    tipp: "Vergleiche den Zustand vor und nach der Reaktion. Welches Teilchen taucht auf beiden Seiten unverändert auf?",
    erklaerung: "Die Sulfat-Ionen sind weiterhin in der Lösung vorhanden. An der eigentlichen Elektronenübertragung sind sie nicht beteiligt.",
    fragment: "4"
  },
  {
    ort: "Salz-Tresor",
    typ: "REAKTIONSPRODUKT",
    hinweis: "Nach der Reaktion befinden sich Eisen-Ionen zusammen mit Sulfat-Ionen in der Lösung. Gesucht ist der Name des dabei vorliegenden Salzes.",
    schema: "Eisen-Ionen + Sulfat-Ionen  →  ?",
    frage: "Welcher Stoff befindet sich nach der Reaktion neben dem entstandenen Kupfer in der Lösung?",
    antworten: [
      "Kupferoxid",
      "Eisen(II)-sulfat",
      "Eisenoxid",
      "Schwefelsäure"
    ],
    richtig: 1,
    tipp: "Der Name eines Salzes setzt sich hier aus dem Metall-Ion und dem Sulfat-Ion zusammen.",
    erklaerung: "Eisen-Ionen und Sulfat-Ionen bilden Eisen(II)-sulfat. Seine Formel lautet FeSO₄.",
    fragment: null
  },
  {
    ort: "Produktkammer",
    typ: "STOFFEBENE",
    hinweis: "Am Ende des Versuchs findest du einen rötlich-braunen Feststoff auf dem Nagel und eine Lösung, die nun Eisen-Ionen und Sulfat-Ionen enthält.",
    schema: "Ausgangsstoffe  →  zwei neue Produkte",
    frage: "Welche beiden Stoffe sind die Produkte der Reaktion?",
    antworten: [
      "Eisen und Kupfersulfat",
      "Kupferoxid und Eisen",
      "Eisen(II)-sulfat und Kupfer",
      "Kupfersulfat und Schwefel"
    ],
    richtig: 2,
    tipp: "Ein Produkt ist der sichtbare rötlich-braune Belag. Das andere Produkt ist das Salz aus Eisen-Ionen und Sulfat-Ionen.",
    erklaerung: "Es entstehen Eisen(II)-sulfat und elementares Kupfer.",
    fragment: "Cu"
  },
  {
    ort: "Ausgangstür",
    typ: "FINALES SCHLOSS",
    hinweis: "Du hast alle Informationen gesammelt. Der Türcode besteht nicht aus Ziffern, sondern aus den chemischen Formeln der beiden Reaktionsprodukte.",
    schema: "Eisennagel + Kupfersulfatlösung  →  PRODUKTCODE",
    frage: "Welcher Produktcode öffnet die Tür?",
    antworten: [
      "Fe + CuSO₄",
      "CuSO₄ + Fe",
      "FeO + Cu",
      "FeSO₄ + Cu"
    ],
    richtig: 3,
    tipp: "Gesucht sind die Produkte – nicht die Ausgangsstoffe. Denke an Eisen(II)-sulfat und den rötlich-braunen Metallbelag.",
    erklaerung: "Richtig! Die Produkte sind Eisen(II)-sulfat und Kupfer: FeSO₄ + Cu.",
    fragment: null
  }
];

const naegel = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  links: `${(i * 41) % 100}%`,
  verz: `${(i % 11) * 0.12}s`,
  dauer: `${2.6 + (i % 6) * 0.22}s`,
  drehung: `${(i * 67) % 360}deg`
}));

export default function ChemieEscape() {
  const [index, setIndex] = useState(0);
  const [auswahl, setAuswahl] = useState(null);
  const [ausgeschlossen, setAusgeschlossen] = useState([]);
  const [tipp, setTipp] = useState(false);
  const [korrekt, setKorrekt] = useState(false);
  const [fragmente, setFragmente] = useState([]);
  const [fertig, setFertig] = useState(false);

  const a = aufgaben[index];

  const sichtbareAntworten = useMemo(
    () =>
      a.antworten
        .map((text, originalIndex) => ({ text, originalIndex }))
        .filter((x) => !ausgeschlossen.includes(x.originalIndex)),
    [a, ausgeschlossen]
  );

  function waehlen(originalIndex) {
    if (korrekt) return;
    setAuswahl(originalIndex);

    if (originalIndex === a.richtig) {
      setKorrekt(true);
      setTipp(false);
      if (a.fragment) {
        setFragmente((alt) =>
          alt.includes(a.fragment) ? alt : [...alt, a.fragment]
        );
      }
    } else {
      setAusgeschlossen((alt) =>
        alt.includes(originalIndex) ? alt : [...alt, originalIndex]
      );
      setTipp(true);
      setAuswahl(null);
    }
  }

  function weiter() {
    if (index === aufgaben.length - 1) {
      setFertig(true);
      return;
    }
    setIndex((alt) => alt + 1);
    setAuswahl(null);
    setAusgeschlossen([]);
    setTipp(false);
    setKorrekt(false);
  }

  function neustart() {
    setIndex(0);
    setAuswahl(null);
    setAusgeschlossen([]);
    setTipp(false);
    setKorrekt(false);
    setFragmente([]);
    setFertig(false);
  }

  if (fertig) {
    return (
      <div className="chemie">
        <style jsx>{styles}</style>

        <div className="nagelregen" aria-hidden="true">
          {naegel.map((n) => (
            <span
              key={n.id}
              style={{
                left: n.links,
                animationDelay: n.verz,
                animationDuration: n.dauer,
                transform: `rotate(${n.drehung})`
              }}
            >
              🔩
            </span>
          ))}
        </div>

        <main className="abschluss">
          <div className="erfolg">ESCAPE GESCHAFFT</div>
          <h1>🔓 Der Chemie-Fachraum ist geöffnet!</h1>
          <p>Du hast alle zehn Schlösser gelöst und den Produktcode geknackt.</p>

          <div className="loesung">FeSO₄ + Cu</div>

          <div className="auswertung">
            <h2>Was ist beim Versuch passiert?</h2>
            <p>
              Eisen gibt Elektronen ab. Die Kupfer-Ionen nehmen diese Elektronen
              auf und werden zu elementarem Kupfer. Deshalb entsteht auf dem
              Eisennagel der rötlich-braune Kupferbelag.
            </p>

            <div className="merkkasten">
              <div><strong>Eisen:</strong> Elektronenabgabe → Oxidation</div>
              <div><strong>Kupfer-Ionen:</strong> Elektronenaufnahme → Reduktion</div>
              <div><strong>Produkte:</strong> Eisen(II)-sulfat + Kupfer</div>
            </div>

            <p className="gesamt">
              Gesamtreaktion: <strong>Fe + CuSO₄ → FeSO₄ + Cu</strong>
            </p>
          </div>

          <div className="aktionen">
            <button onClick={neustart}>Noch einmal spielen</button>
            <Link href="/">
              <button className="dunkel">Zurück zu CityQuest</button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="chemie">
      <style jsx>{styles}</style>

      <header>
        <div>
          <b>⚗ CHEMIE-FACHRAUM ESCAPE</b>
          <small>Eisennagel in Kupfersulfatlösung · Klasse 9</small>
        </div>

        <div className="fortschritt">
          SCHLOSS {index + 1} / 10
          <div className="leiste">
            <i style={{ width: `${(index + 1) * 10}%` }} />
          </div>
        </div>
      </header>

      <main className="layout">
        <aside>
          <h4>ESCAPE-ROUTE DURCH DEN FACHRAUM</h4>

          {aufgaben.map((x, n) => (
            <div
              key={n}
              className={`route ${n === index ? "aktuell" : ""} ${
                n < index ? "geschafft" : ""
              }`}
            >
              <span>{n < index ? "✓" : n + 1}</span>
              {x.ort}
            </div>
          ))}

          <h4 className="fragTitel">GEFUNDENE FRAGMENTE</h4>
          <div className="fragmente">
            {["Fe", "S", "O", "4", "Cu"].map((x) => (
              <b key={x}>{fragmente.includes(x) ? x : "?"}</b>
            ))}
          </div>
        </aside>

        <section>
          <div className="meta">
            <b>{a.typ}</b>
            <span>SCHLOSS {index + 1}</span>
          </div>

          <h1>{a.ort}</h1>

          <div className="hinweis">
            <small>HINWEIS GEFUNDEN</small>
            <div className="schema">{a.schema}</div>
            <p>{a.hinweis}</p>
          </div>

          <h3>{a.frage}</h3>

          <div className="antworten">
            {sichtbareAntworten.map(({ text, originalIndex }) => (
              <button
                key={originalIndex}
                onClick={() => waehlen(originalIndex)}
                className={korrekt && originalIndex === a.richtig ? "richtig" : ""}
                disabled={korrekt}
              >
                <i>{String.fromCharCode(65 + originalIndex)}</i>
                {text}
              </button>
            ))}
          </div>

          {tipp && !korrekt && (
            <div className="tipp">
              <div className="tippkopf">💡 Noch nicht richtig – hier ist ein Tipp:</div>
              <p>{a.tipp}</p>
              <strong>
                Noch {sichtbareAntworten.length} Antwortmöglichkeiten.
              </strong>
            </div>
          )}

          {korrekt && (
            <div className="feedback">
              <b>Schloss geöffnet.</b>
              <p>{a.erklaerung}</p>

              {a.fragment && (
                <strong>Gefundenes Fragment: {a.fragment}</strong>
              )}
            </div>
          )}

          {korrekt && (
            <button className="weiter" onClick={weiter}>
              {index === 9
                ? "Ausgangstür öffnen"
                : "Weiter zum nächsten Schloss"}
            </button>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = `
.chemie{min-height:100vh;background:#08131c;color:#eef6f8;font-family:inherit;padding-bottom:50px}
header{display:flex;justify-content:space-between;align-items:center;padding:18px 28px;background:#0b1922;border-bottom:1px solid #29414d}
header small{display:block;color:#91a9b4;margin-top:4px}
.fortschritt{text-align:right;font-weight:800;min-width:180px}
.leiste{height:7px;background:#1d3440;border-radius:10px;margin-top:7px;overflow:hidden}
.leiste i{display:block;height:100%;background:#f2d35e}
.layout{max-width:1180px;margin:auto;padding:28px 18px;display:grid;grid-template-columns:285px 1fr;gap:22px}
aside,section,.abschluss{background:#10222d;border:1px solid #29414d;border-radius:20px;box-shadow:0 18px 55px #0004}
aside{padding:20px;align-self:start}
h4{color:#82e7d5;font-size:12px;letter-spacing:.09em}
.route{display:flex;align-items:center;gap:9px;padding:7px 0;color:#8299a4;font-size:14px}
.route span{display:grid;place-items:center;width:25px;height:25px;border-radius:50%;background:#18303c;flex:none}
.route.aktuell{color:white;font-weight:800}
.route.geschafft{color:#82e7d5}
.fragTitel{border-top:1px solid #29414d;padding-top:18px;margin-top:20px}
.fragmente{display:flex;gap:6px;flex-wrap:wrap}
.fragmente b{background:#071016;color:#f2d35e;padding:8px;border-radius:8px;min-width:25px;text-align:center}
section{padding:28px}
.meta{display:flex;justify-content:space-between;color:#8da5b0;font-size:12px;letter-spacing:.08em}
.meta b{color:#f2d35e}
.hinweis{background:linear-gradient(135deg,#0a171f,#142b36);border:1px solid #35515e;border-radius:16px;padding:20px;margin:18px 0}
.hinweis small{color:#82e7d5;font-weight:900;letter-spacing:.1em}
.hinweis p{white-space:pre-line;line-height:1.55}
.schema{background:#071016;color:#f2d35e;text-align:center;padding:18px;border-radius:12px;margin:14px 0;font-size:clamp(18px,2.8vw,27px);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.antworten{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.antworten button{background:#0b1922;color:white;border:1px solid #35515e;border-radius:12px;padding:14px;text-align:left;font-weight:700;cursor:pointer;line-height:1.4}
.antworten button:hover{border-color:#7894a1}
.antworten button:disabled{cursor:default}
.antworten i{font-style:normal;display:inline-grid;place-items:center;background:#203844;width:27px;height:27px;border-radius:7px;margin-right:9px}
.antworten .richtig{background:#103529;border-color:#56d6a8}
.tipp{margin-top:17px;padding:16px;border-radius:12px;background:#302a12;border:1px solid #7b6927;line-height:1.5}
.tippkopf{color:#f2d35e;font-weight:900}
.tipp p{margin:7px 0}
.tipp strong{color:#d9c86d;font-size:14px}
.feedback{margin-top:17px;padding:15px;border-radius:12px;line-height:1.5;background:#103529;border:1px solid #2e765d}
.feedback p{margin:6px 0}
.feedback strong{display:block;color:#f2d35e;margin-top:8px}
.weiter,.aktionen button{border:0;border-radius:10px;padding:11px 15px;font-weight:900;cursor:pointer}
.weiter{margin-top:14px;background:#f2d35e;color:#111}
.abschluss{max-width:840px;margin:50px auto;padding:38px;text-align:center;position:relative;z-index:2}
.erfolg{display:inline-block;color:#82e7d5;background:#173947;border-radius:99px;padding:7px 12px;font-size:12px;font-weight:900;letter-spacing:.08em}
.loesung{background:#071016;color:#f2d35e;border:1px solid #35515e;border-radius:16px;padding:22px;margin:24px 0;font-size:clamp(32px,6vw,54px);font-weight:900}
.auswertung{text-align:left;max-width:680px;margin:auto;line-height:1.65}
.merkkasten{display:grid;gap:8px;margin:20px 0}
.merkkasten div{background:#0b1922;padding:12px 15px;border-radius:10px}
.gesamt{text-align:center;font-size:18px;margin-top:22px}
.aktionen{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:25px}
.aktionen button{background:#f2d35e}
.aktionen .dunkel{background:#18303c;color:white}
.nagelregen{position:fixed;inset:0;overflow:hidden;pointer-events:none;z-index:1}
.nagelregen span{position:absolute;top:-60px;font-size:30px;animation:nagelFall linear forwards;filter:grayscale(.35)}
@keyframes nagelFall{
0%{transform:translateY(-70px) rotate(0deg);opacity:1}
85%{opacity:1}
100%{transform:translateY(110vh) rotate(820deg);opacity:0}
}
@media(max-width:780px){
.layout{grid-template-columns:1fr}
aside{display:none}
.antworten{grid-template-columns:1fr}
header{padding:15px}
.fortschritt{min-width:120px}
}
`;
