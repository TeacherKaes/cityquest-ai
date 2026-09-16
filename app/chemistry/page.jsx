"use client";

import { useState } from "react";
import Link from "next/link";

const aufgaben = [
  {
    ort: "Experimentiertisch",
    typ: "BEOBACHTEN UND DEUTEN",
    hinweis:
      "Ein blanker Eisennagel liegt einige Minuten in einer blauen Kupfersulfatlösung. Danach ist auf Teilen des Nagels ein rötlich-brauner Feststoff zu erkennen. Die Lösung verändert sich ebenfalls.",
    schema: "Eisennagel  +  Kupfersulfatlösung  →  ?",
    frage:
      "Welche Aussage deutet die Beobachtung fachlich am besten?",
    antworten: [
      "Der Eisennagel wurde nur von der blauen Lösung eingefärbt.",
      "Kupfersulfat verdampft und schlägt sich anschließend auf dem Nagel nieder.",
      "Es sind neue Stoffe entstanden; der rötlich-braune Feststoff ist ein Reaktionsprodukt.",
      "Der Nagel hat lediglich Kupfersulfatlösung aufgesaugt."
    ],
    richtig: 2,
    erklaerung:
      "Die Bildung eines neuen Feststoffs mit anderen Eigenschaften ist ein Hinweis auf eine chemische Reaktion. Der rötlich-braune Feststoff ist Kupfer.",
    fragment: null
  },
  {
    ort: "Teilchenschrank",
    typ: "ATOM UND ION",
    hinweis:
      "Im Fachraum findest du zwei Teilchenkarten: Ein Eisenatom besitzt 26 Protonen und 26 Elektronen. Eine zweite Karte zeigt ein Eisenteilchen mit 26 Protonen und 24 Elektronen.",
    schema: "26 p⁺ / 26 e⁻     →     26 p⁺ / 24 e⁻",
    frage:
      "Welche Bezeichnung und Ladung passen zum zweiten Teilchen?",
    antworten: [
      "Fe²⁻, weil zwei Elektronen fehlen.",
      "Fe²⁺, weil zwei Elektronen fehlen.",
      "Fe²⁺, weil zwei Protonen hinzugekommen sind.",
      "Fe, weil die Protonenzahl unverändert bleibt."
    ],
    richtig: 1,
    erklaerung:
      "Das Teilchen besitzt zwei Elektronen weniger als das neutrale Atom. Dadurch überwiegen zwei positive Ladungen: Fe²⁺.",
    fragment: "Fe"
  },
  {
    ort: "Blaue Lösung",
    typ: "TEILCHENEBENE",
    hinweis:
      "Vor dem Versuch ist die Lösung deutlich blau. Während der Reaktion wird die blaue Färbung schwächer. Kupfersulfatlösung enthält unter anderem Cu²⁺-Ionen.",
    schema: "blaue Lösung: viele Cu²⁺   →   Färbung nimmt ab",
    frage:
      "Welche Deutung passt am besten zur abnehmenden blauen Färbung?",
    antworten: [
      "Die Zahl der Cu²⁺-Ionen in der Lösung nimmt ab.",
      "Cu²⁺-Ionen werden zu SO₄²⁻-Ionen.",
      "Immer mehr Eisenatome gelangen unverändert in die Lösung.",
      "Die Elektronen der Lösung werden blau und verlassen anschließend das Becherglas."
    ],
    richtig: 0,
    erklaerung:
      "Cu²⁺-Ionen werden während der Reaktion verbraucht und zu Kupferatomen. Dadurch kann die für Cu²⁺ typische blaue Färbung schwächer werden.",
    fragment: null
  },
  {
    ort: "Elektronenschloss",
    typ: "TEILGLEICHUNG",
    hinweis:
      "An der Oberfläche des Eisennagels entstehen Fe²⁺-Ionen. Die Protonenzahl des Eisens bleibt dabei unverändert.",
    schema: "Fe  →  Fe²⁺",
    frage:
      "Welche Teilgleichung beschreibt diesen Vorgang korrekt und gleicht zugleich die Ladungen aus?",
    antworten: [
      "Fe + 2 e⁻ → Fe²⁺",
      "Fe → Fe²⁺ + 2 p⁺",
      "Fe → Fe²⁺ + 2 e⁻",
      "Fe²⁺ → Fe + 2 e⁻"
    ],
    richtig: 2,
    erklaerung:
      "Beim Übergang vom neutralen Fe-Atom zum Fe²⁺-Ion müssen zwei Elektronen abgegeben werden: Fe → Fe²⁺ + 2 e⁻.",
    fragment: "S"
  },
  {
    ort: "Oxidationskammer",
    typ: "REDOX-BEGRIFF",
    hinweis:
      "Du hast für Eisen die Teilgleichung Fe → Fe²⁺ + 2 e⁻ entschlüsselt. Entscheidend ist nun nicht der Stoffname, sondern die Veränderung der Elektronen.",
    schema: "Fe  →  Fe²⁺ + 2 e⁻",
    frage:
      "Welche Aussage über Eisen ist daraus ableitbar?",
    antworten: [
      "Eisen wird reduziert, weil seine Ladung positiver wird.",
      "Eisen wird oxidiert, weil es Elektronen abgibt.",
      "Eisen wird reduziert, weil es Elektronen abgibt.",
      "Eisen wird oxidiert, weil es Elektronen aufnimmt."
    ],
    richtig: 1,
    erklaerung:
      "Elektronenabgabe ist Oxidation. Eisen ist hier der Elektronendonator und wird zu Fe²⁺ oxidiert.",
    fragment: "O"
  },
  {
    ort: "Kupferschloss",
    typ: "REDUKTION",
    hinweis:
      "Auf dem Nagel entsteht elementares Kupfer. Vor der Reaktion befindet sich Kupfer jedoch als Cu²⁺ in der Lösung.",
    schema: "Cu²⁺  →  Cu",
    frage:
      "Welche Teilgleichung erklärt die Entstehung des Kupfers korrekt?",
    antworten: [
      "Cu → Cu²⁺ + 2 e⁻",
      "Cu²⁺ → Cu + 2 e⁻",
      "Cu²⁺ + 2 p⁺ → Cu",
      "Cu²⁺ + 2 e⁻ → Cu"
    ],
    richtig: 3,
    erklaerung:
      "Cu²⁺ muss zwei Elektronen aufnehmen, damit neutrales Kupfer entsteht. Elektronenaufnahme ist Reduktion.",
    fragment: null
  },
  {
    ort: "Redox-Tür",
    typ: "ELEKTRONENÜBERTRAGUNG",
    hinweis:
      "Zwei Teilgleichungen wurden gefunden:\nFe → Fe²⁺ + 2 e⁻\nCu²⁺ + 2 e⁻ → Cu",
    schema: "Fe  |  e⁻-Übertragung  |  Cu²⁺",
    frage:
      "Welche Aussage beschreibt die Rollen der Reaktionspartner korrekt?",
    antworten: [
      "Fe nimmt Elektronen auf; Cu²⁺ gibt Elektronen ab.",
      "Fe und Cu²⁺ geben beide Elektronen ab.",
      "Fe gibt Elektronen ab; Cu²⁺ nimmt Elektronen auf.",
      "SO₄²⁻ überträgt die Elektronen von Cu auf Fe."
    ],
    richtig: 2,
    erklaerung:
      "Die vom Eisen abgegebenen Elektronen werden von Cu²⁺ aufgenommen. Oxidation und Reduktion sind deshalb miteinander gekoppelt.",
    fragment: null
  },
  {
    ort: "Ionen-Tresor",
    typ: "FORMELBILDUNG",
    hinweis:
      "Nach der Elektronenübertragung befinden sich Fe²⁺-Ionen in einer Lösung, in der weiterhin SO₄²⁻-Ionen vorhanden sind. Eine Salzformel muss insgesamt elektrisch neutral sein.",
    schema: "Fe²⁺  +  SO₄²⁻  →  Salz",
    frage:
      "Welche Verhältnisformel ergibt sich aus den Ionenladungen?",
    antworten: [
      "Fe₂SO₄",
      "Fe(SO₄)₂",
      "Fe₂(SO₄)₃",
      "FeSO₄"
    ],
    richtig: 3,
    erklaerung:
      "Eine Fe²⁺-Ladung (+2) und eine SO₄²⁻-Ladung (−2) gleichen sich im Verhältnis 1:1 aus. Daher lautet die Formel FeSO₄.",
    fragment: "4"
  },
  {
    ort: "Reaktionsarchiv",
    typ: "NETTO-IONENGLEICHUNG",
    hinweis:
      "Das Sulfat-Ion ist vor und nach der Reaktion in der Lösung vorhanden. Für die eigentliche Elektronenübertragung kann es deshalb aus der Betrachtung herausgekürzt werden.",
    schema: "Fe + Cu²⁺ + SO₄²⁻  →  Fe²⁺ + SO₄²⁻ + Cu",
    frage:
      "Welche Gleichung zeigt nur die Teilchen, die sich bei der Redoxreaktion tatsächlich verändern?",
    antworten: [
      "Fe + Cu²⁺ → Fe²⁺ + Cu",
      "Fe + SO₄²⁻ → FeSO₄",
      "Cu²⁺ + SO₄²⁻ → CuSO₄",
      "Fe²⁺ + Cu → Fe + Cu²⁺"
    ],
    richtig: 0,
    erklaerung:
      "SO₄²⁻ bleibt unverändert. Die eigentliche Redoxreaktion lässt sich daher als Fe + Cu²⁺ → Fe²⁺ + Cu darstellen.",
    fragment: "Cu"
  },
  {
    ort: "Ausgangstür",
    typ: "FINALE REAKTIONSGLEICHUNG",
    hinweis:
      "Du hast herausgefunden: Eisen wird zu Fe²⁺, Cu²⁺ wird zu Cu und SO₄²⁻ bleibt als Gegenion in der Lösung. Setze diese Informationen zur Stoffgleichung zusammen.",
    schema: "Fe + CuSO₄  →  ?",
    frage:
      "Welche Produktseite öffnet die Ausgangstür?",
    antworten: [
      "Fe₂(SO₄)₃ + Cu",
      "FeCu + SO₄",
      "Cu + FeSO₄",
      "FeO + CuSO₃"
    ],
    richtig: 2,
    erklaerung:
      "Die Produkte sind Eisen(II)-sulfat und Kupfer. Die vollständige Reaktionsgleichung lautet: Fe + CuSO₄ → FeSO₄ + Cu.",
    fragment: null
  }
];

export default function ChemieEscape() {
  const [index, setIndex] = useState(0);
  const [auswahl, setAuswahl] = useState(null);
  const [beantwortet, setBeantwortet] = useState(false);
  const [fragmente, setFragmente] = useState([]);
  const [fertig, setFertig] = useState(false);

  const a = aufgaben[index];
  const korrekt = auswahl === a.richtig;

  function waehlen(n) {
    if (beantwortet) return;
    setAuswahl(n);
    setBeantwortet(true);
    if (n === a.richtig && a.fragment) {
      setFragmente((alt) =>
        alt.includes(a.fragment) ? alt : [...alt, a.fragment]
      );
    }
  }

  function erneut() {
    setAuswahl(null);
    setBeantwortet(false);
  }

  function weiter() {
    if (index === aufgaben.length - 1) {
      setFertig(true);
      return;
    }
    setIndex((alt) => alt + 1);
    setAuswahl(null);
    setBeantwortet(false);
  }

  function neustart() {
    setIndex(0);
    setAuswahl(null);
    setBeantwortet(false);
    setFragmente([]);
    setFertig(false);
  }

  if (fertig) {
    return (
      <div className="chemie">
        <style jsx>{styles}</style>
        <main className="abschluss">
          <div className="erfolg">ESCAPE GESCHAFFT</div>
          <h1>🔓 Der Chemie-Fachraum ist geöffnet!</h1>
          <p>Du hast alle zehn Schlösser gelöst und die Redoxreaktion rekonstruiert.</p>

          <div className="loesung">FeSO₄ + Cu</div>

          <div className="auswertung">
            <h2>Auflösung</h2>
            <div className="gleichung">
              <strong>Oxidation:</strong>
              <span>Fe → Fe²⁺ + 2 e⁻</span>
            </div>
            <div className="gleichung">
              <strong>Reduktion:</strong>
              <span>Cu²⁺ + 2 e⁻ → Cu</span>
            </div>
            <div className="gleichung">
              <strong>Gesamtreaktion:</strong>
              <span>Fe + CuSO₄ → FeSO₄ + Cu</span>
            </div>
            <p>
              Eisen gibt Elektronen ab und wird oxidiert. Cu²⁺-Ionen nehmen diese
              Elektronen auf und werden zu elementarem Kupfer reduziert. Die
              Sulfat-Ionen bleiben in der Lösung und bilden mit Fe²⁺
              Eisen(II)-sulfat.
            </p>
          </div>

          <div className="aktionen">
            <button onClick={neustart}>Noch einmal spielen</button>
            <Link href="/"><button className="dunkel">Zurück zu CityQuest</button></Link>
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
            {a.antworten.map((text, n) => {
              const richtig = beantwortet && n === a.richtig;
              const falsch =
                beantwortet && auswahl === n && n !== a.richtig;

              return (
                <button
                  key={text}
                  onClick={() => waehlen(n)}
                  className={`${richtig ? "richtig" : ""} ${
                    falsch ? "falsch" : ""
                  }`}
                >
                  <i>{String.fromCharCode(65 + n)}</i>
                  {text}
                </button>
              );
            })}
          </div>

          {beantwortet && (
            <div className={`feedback ${korrekt ? "gut" : "nichtGut"}`}>
              <b>{korrekt ? "Schloss geöffnet." : "Noch nicht richtig."}</b>
              <p>{a.erklaerung}</p>

              {korrekt && a.fragment && (
                <strong>Gefundenes Fragment: {a.fragment}</strong>
              )}

              {!korrekt && (
                <button onClick={erneut}>Erneut versuchen</button>
              )}
            </div>
          )}

          {beantwortet && korrekt && (
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
.schema{background:#071016;color:#f2d35e;text-align:center;padding:18px;border-radius:12px;margin:14px 0;font-size:clamp(19px,3vw,29px);font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.antworten{display:grid;grid-template-columns:1fr 1fr;gap:11px}
.antworten button{background:#0b1922;color:white;border:1px solid #35515e;border-radius:12px;padding:14px;text-align:left;font-weight:700;cursor:pointer;line-height:1.4}
.antworten i{font-style:normal;display:inline-grid;place-items:center;background:#203844;width:27px;height:27px;border-radius:7px;margin-right:9px}
.antworten .richtig{background:#103529;border-color:#56d6a8}
.antworten .falsch{background:#3b1d22;border-color:#e47777}
.feedback{margin-top:17px;padding:15px;border-radius:12px;line-height:1.5}
.feedback p{margin:6px 0}
.gut{background:#103529;border:1px solid #2e765d}
.nichtGut{background:#3b1d22;border:1px solid #7d3b45}
.feedback strong{display:block;color:#f2d35e;margin-top:8px}
.feedback button,.weiter,.aktionen button{border:0;border-radius:10px;padding:11px 15px;font-weight:900;cursor:pointer}
.feedback button{margin-top:8px}
.weiter{margin-top:14px;background:#f2d35e;color:#111}
.abschluss{max-width:840px;margin:50px auto;padding:38px;text-align:center}
.erfolg{display:inline-block;color:#82e7d5;background:#173947;border-radius:99px;padding:7px 12px;font-size:12px;font-weight:900;letter-spacing:.08em}
.loesung{background:#071016;color:#f2d35e;border:1px solid #35515e;border-radius:16px;padding:22px;margin:24px 0;font-size:clamp(32px,6vw,54px);font-weight:900}
.auswertung{text-align:left;max-width:680px;margin:auto;line-height:1.65}
.gleichung{display:flex;justify-content:space-between;gap:20px;background:#0b1922;padding:12px 15px;border-radius:10px;margin:8px 0}
.aktionen{display:flex;justify-content:center;gap:10px;flex-wrap:wrap;margin-top:25px}
.aktionen button{background:#f2d35e}
.aktionen .dunkel{background:#18303c;color:white}
@media(max-width:780px){.layout{grid-template-columns:1fr}aside{display:none}.antworten{grid-template-columns:1fr}header{padding:15px}.fortschritt{min-width:120px}.gleichung{display:block}}
`;

