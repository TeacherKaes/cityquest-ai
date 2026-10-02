"use client";

import { useMemo, useState } from "react";

const FRAGEN = [
  {
    kategorie: "Anatomie",
    frage: "Welche Zuordnung von Organ und Funktion ist richtig?",
    antworten: [
      "Nebenhoden – Reifung und Speicherung von Spermien",
      "Prostata – Bildung der Spermien",
      "Hoden – Speicherung des Urins",
      "Samenleiter – Bildung von Testosteron",
    ],
    richtig: 0,
    tipp: "Unterscheide zwischen Bildung, Reifung, Speicherung und Transport von Spermien.",
  },
  {
    kategorie: "Anatomie",
    frage: "Welchen Weg nehmen Spermien nach ihrer Bildung im Hoden hauptsächlich?",
    antworten: [
      "Hoden → Harnblase → Harnröhre → Nebenhoden",
      "Hoden → Nebenhoden → Samenleiter → Harnröhre",
      "Hoden → Prostata → Harnblase → Samenleiter",
      "Hoden → Harnröhre → Nebenhoden → Samenleiter",
    ],
    richtig: 1,
    tipp: "Nach der Bildung folgt zunächst ein Organ, in dem Spermien weiter reifen.",
  },
  {
    kategorie: "Anatomie",
    frage: "Welche Aussage zur Harnröhre beim Mann trifft zu?",
    antworten: [
      "Sie transportiert ausschließlich Urin.",
      "Sie verbindet den Hoden direkt mit der Harnblase.",
      "Über sie können zu unterschiedlichen Zeiten Urin oder Samenflüssigkeit nach außen gelangen.",
      "In ihr werden Spermien gebildet und gespeichert.",
    ],
    richtig: 2,
    tipp: "Die Harnröhre gehört zum Harnsystem, spielt beim Mann aber auch beim Transport der Samenflüssigkeit eine Rolle.",
  },
  {
    kategorie: "Anatomie",
    frage: "Welche Aufgabe haben die Eierstöcke?",
    antworten: [
      "Sie sind der gewöhnliche Ort der Befruchtung.",
      "Sie transportieren Urin zur Harnblase.",
      "Sie bilden die Gebärmutterschleimhaut.",
      "Sie beherbergen die Eizellen; dort reifen Eizellen heran und es werden unter anderem Geschlechtshormone gebildet.",
    ],
    richtig: 3,
    tipp: "Gesucht ist ein Organ, das Eizellen enthält und zugleich eine wichtige Rolle bei der Hormonbildung spielt.",
  },
  {
    kategorie: "Fortpflanzung",
    frage: "Wo findet eine Befruchtung beim Menschen normalerweise statt?",
    antworten: [
      "In der Scheide",
      "Im Eileiter",
      "In der Gebärmutter",
      "Im Eierstock",
    ],
    richtig: 1,
    tipp: "Befruchtung und Einnistung finden normalerweise nicht am selben Ort statt.",
  },
  {
    kategorie: "Zyklus",
    frage: "Was beschreibt den Eisprung fachlich am besten?",
    antworten: [
      "Die Gebärmutterschleimhaut wird abgestoßen.",
      "Eine befruchtete Eizelle nistet sich ein.",
      "Die Menstruation endet vollständig.",
      "Eine reife Eizelle wird aus einem Eierstock freigesetzt.",
    ],
    richtig: 3,
    tipp: "Der Vorgang betrifft zunächst den Eierstock und bedeutet noch keine Befruchtung.",
  },
  {
    kategorie: "Zyklus",
    frage: "Warum lässt sich der genaue Zeitpunkt des Eisprungs nicht einfach für jede Person mit einem festen Kalendertag angeben?",
    antworten: [
      "Weil ein Zyklus immer exakt 28 Tage dauert, der Eisprung aber zufällig ist.",
      "Weil Zykluslänge und Zeitpunkt des Eisprungs schwanken können.",
      "Weil ein Eisprung nur während der Menstruation stattfinden kann.",
      "Weil der Eisprung ausschließlich von der Jahreszeit abhängt.",
    ],
    richtig: 1,
    tipp: "Biologische Abläufe sind nicht bei jeder Person und in jedem Monat exakt gleich lang.",
  },
  {
    kategorie: "Zyklus",
    frage: "Was geschieht typischerweise, wenn keine Schwangerschaft eingetreten ist?",
    antworten: [
      "Die Gebärmutterschleimhaut wird teilweise abgestoßen.",
      "Beide Eierstöcke werden vorübergehend abgebaut.",
      "Die Gebärmutter stellt ihre Funktion dauerhaft ein.",
      "Alle vorhandenen Eizellen werden ausgeschieden.",
    ],
    richtig: 0,
    tipp: "Überlege, was mit der zuvor aufgebauten Schleimhaut geschieht.",
  },
  {
    kategorie: "Verhütung",
    frage: "Welche Kombination beschreibt das Kondom am treffendsten?",
    antworten: [
      "Hormonell; verhindert sicher jeden Eisprung",
      "Chemisch; wird dauerhaft in die Gebärmutter eingesetzt",
      "Mechanisch; verringert zusätzlich das Risiko vieler sexuell übertragbarer Infektionen",
      "Operativ; verhindert die Bildung von Spermien",
    ],
    richtig: 2,
    tipp: "Achte sowohl auf die Art der Verhütung als auch auf einen möglichen zusätzlichen Schutz.",
  },
  {
    kategorie: "Verhütung",
    frage: "Warum kann die Antibabypille bei korrekter Einnahme eine Schwangerschaft verhindern?",
    antworten: [
      "Ihre Hormone beeinflussen unter anderem den Zyklus und können den Eisprung unterdrücken.",
      "Sie bildet im Körper eine undurchlässige Kunststoffbarriere.",
      "Sie entfernt Spermien nach dem Geschlechtsverkehr mechanisch.",
      "Sie verhindert dauerhaft die Bildung von Eizellen in den Eierstöcken.",
    ],
    richtig: 0,
    tipp: "Die Wirkung beruht nicht auf einer mechanischen Barriere.",
  },
  {
    kategorie: "Verhütung",
    frage: "Was bedeutet der Pearl-Index bei Verhütungsmethoden grundsätzlich?",
    antworten: [
      "Er beschreibt die Größe eines Verhütungsmittels.",
      "Er ist ein Maß dafür, wie häufig es trotz Anwendung zu Schwangerschaften kommt.",
      "Er gibt an, wie viele Hormone ein Mittel enthält.",
      "Er misst den Schutz vor sexuell übertragbaren Infektionen.",
    ],
    richtig: 1,
    tipp: "Der Begriff dient dazu, die Zuverlässigkeit von Verhütungsmethoden zu beschreiben.",
  },
  {
    kategorie: "Verhütung",
    frage: "Welche Aussage zu Verhütungsmethoden ist richtig?",
    antworten: [
      "Jede Methode schützt gleichzeitig vor Schwangerschaft und sexuell übertragbaren Infektionen.",
      "Hormonelle Methoden schützen zuverlässig vor allen sexuell übertragbaren Infektionen.",
      "Methoden unterscheiden sich unter anderem in Wirkweise, Anwendung und Zuverlässigkeit.",
      "Bei korrekter Anwendung sind alle Methoden gleich zuverlässig.",
    ],
    richtig: 2,
    tipp: "Vergleiche Methoden nicht nur danach, ob sie verhüten, sondern auch danach, wie sie wirken und angewendet werden.",
  },
  {
    kategorie: "STI & Schutz",
    frage: "Welche Aussage über sexuell übertragbare Infektionen (STI) ist fachlich richtig?",
    antworten: [
      "Eine STI verursacht immer sofort sichtbare Beschwerden.",
      "STI können ausschließlich durch Bakterien verursacht werden.",
      "Wer sich gesund fühlt, kann grundsätzlich keine STI übertragen.",
      "Eine STI kann auch ohne erkennbare Beschwerden vorliegen.",
    ],
    richtig: 3,
    tipp: "Das Fehlen von Beschwerden sagt nicht immer sicher aus, ob eine Infektion vorliegt.",
  },
  {
    kategorie: "STI & Schutz",
    frage: "Welche Maßnahme kann das Risiko einer Übertragung vieler STI beim Geschlechtsverkehr verringern?",
    antworten: [
      "Die Verwendung eines Kondoms",
      "Die Einnahme einer gewöhnlichen Schmerztablette",
      "Das Waschen mit starkem Desinfektionsmittel danach",
      "Die Berechnung des Eisprungs",
    ],
    richtig: 0,
    tipp: "Gesucht ist eine Barriere, die den direkten Kontakt und den Austausch von Körperflüssigkeiten verringern kann.",
  },
  {
    kategorie: "Pubertät & Hormone",
    frage: "Welche Aussage zur Pubertät ist richtig?",
    antworten: [
      "Körperliche Veränderungen laufen bei allen Jugendlichen im gleichen Alter und in gleicher Reihenfolge ab.",
      "Die Pubertät betrifft ausschließlich die Fortpflanzungsorgane.",
      "Psychische und soziale Veränderungen haben mit der Pubertät nichts zu tun.",
      "Hormone steuern viele Veränderungen, wobei Zeitpunkt und Verlauf individuell verschieden sein können.",
    ],
    richtig: 3,
    tipp: "Pubertät ist ein Entwicklungsprozess mit biologischen und individuellen Unterschieden.",
  },
  {
    kategorie: "Intimhygiene",
    frage: "Welche Empfehlung zur Intimhygiene ist sinnvoll?",
    antworten: [
      "Die Scheide sollte regelmäßig innen mit Seife gereinigt werden.",
      "Stark parfümierte Produkte sind besonders geeignet, weil sie Keime vollständig entfernen.",
      "Für den äußeren Intimbereich genügt meist Wasser; aggressive oder stark parfümierte Produkte können reizen.",
      "Der Intimbereich sollte möglichst überhaupt nicht gereinigt werden.",
    ],
    richtig: 2,
    tipp: "Unterscheide zwischen äußerem Intimbereich und innerer Scheide und denke an den natürlichen Schutz empfindlicher Schleimhäute.",
  },
  {
    kategorie: "Körper & Gesundheit",
    frage: "Warum ist die Scheidenflora für die Gesundheit wichtig?",
    antworten: [
      "Sie unterstützt ein Milieu, das die Vermehrung mancher Krankheitserreger erschwert.",
      "Sie sorgt dafür, dass keine Menstruation stattfindet.",
      "Sie produziert die Eizellen für den nächsten Zyklus.",
      "Sie ersetzt das Immunsystem vollständig.",
    ],
    richtig: 0,
    tipp: "Bestimmte Mikroorganismen gehören natürlicherweise zum Körper und können zu einem schützenden Milieu beitragen.",
  },
  {
    kategorie: "Verantwortung",
    frage: "Welche Aussage beschreibt Einvernehmlichkeit bei sexuellen Handlungen am besten?",
    antworten: [
      "Ein früheres Ja gilt automatisch auch für spätere Situationen.",
      "Zustimmung muss freiwillig sein und kann jederzeit zurückgenommen werden.",
      "Schweigen bedeutet grundsätzlich Zustimmung.",
      "In einer Beziehung ist eine ausdrückliche Zustimmung nicht mehr wichtig.",
    ],
    richtig: 1,
    tipp: "Entscheidend sind Freiwilligkeit, aktuelle Zustimmung und die Möglichkeit, die eigene Entscheidung zu ändern.",
  },
];

const LOESUNG = "VERHÜTUNG";

function mischen(array) {
  const kopie = [...array];
  for (let i = kopie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [kopie[i], kopie[j]] = [kopie[j], kopie[i]];
  }
  return kopie;
}

export default function BiologieQuiz() {
  const buchstaben = useMemo(() => mischen([...LOESUNG]), []);
  const [index, setIndex] = useState(0);
  const [gesammelt, setGesammelt] = useState([]);
  const [falsche, setFalsche] = useState([]);
  const [tipp, setTipp] = useState("");
  const [meldung, setMeldung] = useState("");
  const [eingabe, setEingabe] = useState("");
  const [fertig, setFertig] = useState(false);
  const [gesperrt, setGesperrt] = useState(false);

  const finale = index === FRAGEN.length;
  const frage = FRAGEN[index];
  const fortschritt = Math.round((index / FRAGEN.length) * 100);
  const buchstabenFortschritt = Math.floor(index / 2);

  function antworten(i) {
    if (!frage || falsche.includes(i) || gesperrt) return;

    if (i === frage.richtig) {
      setGesperrt(true);
      const gibtBuchstaben = (index + 1) % 2 === 0;

      if (gibtBuchstaben) {
        const buchstabe = buchstaben[Math.floor(index / 2)];
        setGesammelt((alt) => [...alt, buchstabe]);
        setMeldung(`Richtig! Du hast zwei Fragen geschafft und erhältst den Buchstaben ${buchstabe}.`);
      } else {
        setMeldung("Richtig! Noch eine richtige Antwort bis zum nächsten Buchstaben.");
      }

      setTipp("");

      setTimeout(() => {
        setIndex((alt) => alt + 1);
        setFalsche([]);
        setMeldung("");
        setGesperrt(false);
      }, 1250);
    } else {
      setFalsche((alt) => [...alt, i]);
      setTipp(frage.tipp);
      setMeldung("Noch nicht. Diese Möglichkeit fällt weg – nutze den Hinweis und versuche es erneut.");
    }
  }

  function pruefen() {
    const normalisiert = eingabe
      .trim()
      .toUpperCase()
      .replaceAll("UE", "Ü");

    if (normalisiert === LOESUNG) {
      setFertig(true);
      setMeldung("");
    } else {
      setMeldung("Das Lösungswort stimmt noch nicht. Ordne die neun Buchstaben neu.");
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
        <div className="navPill">Biologie · Klasse 8</div>
      </nav>

      <section className="shell">
        <div className="top">
          <div>
            <div className="eyebrow">SEXUALERZIEHUNG II</div>
            <h1>Mission: Körper, Schutz & Verantwortung</h1>
            <p>
              Löse 18 Fachfragen. Nach jeweils zwei richtigen Antworten erhältst
              du einen Buchstaben. Neun Buchstaben führen dich zum Finalcode.
            </p>
          </div>
          <div className="missionBox">
            <span>MISSION</span>
            <strong>{finale ? "Finale" : `${index + 1} / 18`}</strong>
          </div>
        </div>

        <div className="progressWrap">
          <div className="progressInfo">
            <span>Fortschritt</span>
            <span>{finale ? 100 : fortschritt}%</span>
          </div>
          <div className="progress">
            <div style={{ width: `${finale ? 100 : fortschritt}%` }} />
          </div>
        </div>

        <div className="letterPanel">
          <div className="letterHead">
            <div>
              <span className="label">FINALCODE</span>
              <strong>Gesammelte Buchstaben</strong>
            </div>
            <span className="counter">{gesammelt.length} / 9</span>
          </div>
          <div className="letters">
            {Array.from({ length: 9 }).map((_, i) => (
              <span className={gesammelt[i] ? "filled" : ""} key={i}>
                {gesammelt[i] ?? "?"}
              </span>
            ))}
          </div>
          {!finale && (
            <div className="miniStatus">
              {index % 2 === 0
                ? "Erste Frage des nächsten Buchstabenpaares"
                : "Noch diese Frage richtig lösen → nächster Buchstabe"}
            </div>
          )}
        </div>

        {!finale && !fertig && (
          <section className="questionCard">
            <div className="questionMeta">
              <span className="category">{frage.kategorie}</span>
              <span>Frage {index + 1} von 18</span>
            </div>

            <h2>{frage.frage}</h2>

            <div className="antworten">
              {frage.antworten.map((antwort, i) => {
                const entfernt = falsche.includes(i);
                return (
                  <button
                    key={i}
                    type="button"
                    disabled={entfernt || gesperrt}
                    className={entfernt ? "weg" : ""}
                    onClick={() => antworten(i)}
                  >
                    <span className="optionLetter">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="optionText">
                      {entfernt ? "Diese Antwort fällt weg." : antwort}
                    </span>
                    <span className="arrow">{entfernt ? "×" : "›"}</span>
                  </button>
                );
              })}
            </div>

            {meldung && <div className="meldung">{meldung}</div>}
            {tipp && (
              <div className="tipp">
                <span className="bulb">💡</span>
                <div>
                  <strong>Hinweis</strong>
                  <p>{tipp}</p>
                </div>
              </div>
            )}
          </section>
        )}

        {finale && !fertig && (
          <section className="finale">
            <div className="finalIcon">⌁</div>
            <div className="eyebrow">FINALE MISSION</div>
            <h2>Knacke den Finalcode.</h2>
            <p>
              Du hast alle neun Buchstaben gesammelt. Bringe sie in die richtige
              Reihenfolge. Gesucht ist ein zentraler Begriff dieser Mission.
            </p>

            <div className="gross">
              {gesammelt.map((b, i) => (
                <span key={i}>{b}</span>
              ))}
            </div>

            <div className="inputRow">
              <input
                value={eingabe}
                onChange={(e) => setEingabe(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && pruefen()}
                placeholder="Lösungswort eingeben"
                aria-label="Lösungswort"
              />
              <button type="button" onClick={pruefen}>
                Code prüfen
              </button>
            </div>

            {meldung && <div className="meldung">{meldung}</div>}
          </section>
        )}

        {fertig && (
          <section className="success">
            <div className="successMark">✓</div>
            <div className="eyebrow">MISSION ERFOLGREICH</div>
            <h2>Finalcode geknackt!</h2>
            <p>
              Das Lösungswort lautet <strong>VERHÜTUNG</strong>.
            </p>
            <div className="successActions">
              <button type="button" onClick={() => location.reload()}>
                Noch einmal spielen
              </button>
              <a href="/">Zur Spieleauswahl</a>
            </div>
          </section>
        )}
      </section>

      <style jsx>{`
        * { box-sizing: border-box; }
        .seite {
          min-height: 100vh;
          background:
            radial-gradient(circle at 18% 0%, rgba(37, 211, 144, .11), transparent 28%),
            radial-gradient(circle at 90% 22%, rgba(56, 189, 248, .08), transparent 25%),
            #07111f;
          color: #eef8f4;
          font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          padding-bottom: 60px;
        }
        .nav {
          min-height: 72px;
          border-bottom: 1px solid #1d3142;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 12px max(20px, calc((100% - 1080px) / 2));
          background: rgba(5, 14, 26, .88);
          backdrop-filter: blur(12px);
        }
        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: inherit;
          text-decoration: none;
        }
        .brand strong { display: block; font-size: 16px; }
        .brand small { display: block; color: #8fa7b8; margin-top: 2px; }
        .logo {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          display: grid;
          place-items: center;
          font-weight: 950;
          color: #06140e;
          background: linear-gradient(135deg, #57e3aa, #22c55e);
          box-shadow: 0 0 28px rgba(34, 197, 94, .15);
        }
        .navPill {
          border: 1px solid #294254;
          color: #a9c1cf;
          padding: 9px 13px;
          border-radius: 999px;
          font-size: 13px;
          font-weight: 800;
        }
        .shell { width: min(1080px, calc(100% - 32px)); margin: 38px auto 0; }
        .top {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 30px;
          align-items: start;
          margin-bottom: 24px;
        }
        .eyebrow {
          color: #58dda9;
          letter-spacing: .14em;
          font-size: 12px;
          font-weight: 950;
        }
        h1 {
          max-width: 780px;
          font-size: clamp(34px, 6vw, 58px);
          line-height: 1.02;
          letter-spacing: -.04em;
          margin: 10px 0 14px;
        }
        .top p {
          max-width: 760px;
          color: #a8bdc9;
          font-size: 17px;
          line-height: 1.6;
          margin: 0;
        }
        .missionBox {
          min-width: 116px;
          padding: 15px 17px;
          border: 1px solid #294254;
          background: #0d1c2c;
          border-radius: 16px;
          text-align: right;
        }
        .missionBox span {
          display: block;
          color: #6f8999;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .12em;
        }
        .missionBox strong { display: block; font-size: 20px; margin-top: 4px; }
        .progressWrap {
          background: #0d1c2c;
          border: 1px solid #203748;
          border-radius: 15px;
          padding: 13px 15px;
          margin-bottom: 14px;
        }
        .progressInfo {
          display: flex;
          justify-content: space-between;
          color: #93aab8;
          font-size: 12px;
          font-weight: 800;
          margin-bottom: 8px;
        }
        .progress {
          height: 7px;
          border-radius: 99px;
          overflow: hidden;
          background: #182b3b;
        }
        .progress div {
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #22c55e, #5ee5ad);
          transition: width .35s ease;
        }
        .letterPanel {
          border: 1px solid #203748;
          background: linear-gradient(135deg, #0d1d2d, #0b1927);
          border-radius: 20px;
          padding: 18px;
          margin-bottom: 18px;
        }
        .letterHead {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: center;
          margin-bottom: 13px;
        }
        .letterHead strong { display: block; margin-top: 2px; }
        .label {
          display: block;
          color: #58dda9;
          font-size: 10px;
          font-weight: 950;
          letter-spacing: .14em;
        }
        .counter {
          color: #9bb1bf;
          background: #132738;
          border-radius: 999px;
          padding: 7px 11px;
          font-size: 12px;
          font-weight: 900;
        }
        .letters, .gross {
          display: flex;
          flex-wrap: wrap;
          gap: 9px;
        }
        .letters span, .gross span {
          width: 47px;
          height: 52px;
          display: grid;
          place-items: center;
          border: 1px solid #2b4658;
          border-radius: 12px;
          background: #091725;
          color: #587184;
          font-size: 22px;
          font-weight: 950;
        }
        .letters .filled {
          border-color: #3bc78d;
          background: #0e3328;
          color: #79efbd;
        }
        .miniStatus {
          margin-top: 12px;
          color: #7790a0;
          font-size: 12px;
        }
        .questionCard, .finale, .success {
          border: 1px solid #203748;
          background: linear-gradient(145deg, rgba(16, 34, 51, .97), rgba(10, 25, 39, .98));
          border-radius: 24px;
          padding: clamp(20px, 4vw, 34px);
          box-shadow: 0 24px 70px rgba(0,0,0,.22);
        }
        .questionMeta {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          align-items: center;
          color: #7f99a9;
          font-size: 12px;
          font-weight: 850;
          margin-bottom: 16px;
        }
        .category {
          color: #71e7b5;
          background: #103629;
          border: 1px solid #1f6048;
          border-radius: 999px;
          padding: 7px 10px;
        }
        h2 {
          font-size: clamp(23px, 4vw, 32px);
          line-height: 1.25;
          letter-spacing: -.02em;
          margin: 0 0 22px;
        }
        .antworten {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .antworten button {
          min-height: 82px;
          display: grid;
          grid-template-columns: 42px 1fr 20px;
          gap: 12px;
          align-items: center;
          text-align: left;
          padding: 14px;
          border: 1px solid #2a4355;
          border-radius: 16px;
          background: #0c1c2b;
          color: #eaf4f0;
          font: inherit;
          cursor: pointer;
          transition: transform .14s ease, border-color .14s ease, background .14s ease;
        }
        .antworten button:hover:not(:disabled) {
          transform: translateY(-2px);
          border-color: #4ed59e;
          background: #10283a;
        }
        .antworten button:focus-visible, .inputRow button:focus-visible,
        .successActions button:focus-visible, .successActions a:focus-visible,
        input:focus-visible {
          outline: 3px solid rgba(88, 221, 169, .35);
          outline-offset: 2px;
        }
        .optionLetter {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border-radius: 11px;
          background: #142d3d;
          color: #77e7b8;
          font-weight: 950;
        }
        .optionText { line-height: 1.4; }
        .arrow { color: #648092; font-size: 25px; text-align: center; }
        .antworten .weg {
          opacity: .32;
          cursor: default;
          text-decoration: line-through;
        }
        .meldung {
          margin-top: 16px;
          padding: 14px 16px;
          border: 1px solid #294b61;
          background: #10263a;
          color: #c5d9e5;
          border-radius: 14px;
          line-height: 1.45;
        }
        .tipp {
          display: flex;
          gap: 12px;
          margin-top: 12px;
          padding: 15px 16px;
          border: 1px solid #695d2c;
          background: #2a2614;
          color: #f5e9ad;
          border-radius: 14px;
        }
        .tipp strong { display: block; margin-bottom: 3px; }
        .tipp p { margin: 0; line-height: 1.45; }
        .bulb { font-size: 21px; }
        .finale, .success { text-align: center; padding-top: 40px; padding-bottom: 40px; }
        .finale > p, .success > p {
          color: #9fb5c2;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }
        .finalIcon {
          width: 64px;
          height: 64px;
          margin: 0 auto 16px;
          display: grid;
          place-items: center;
          border-radius: 20px;
          background: #103629;
          border: 1px solid #25634b;
          color: #69e8b3;
          font-size: 35px;
        }
        .gross {
          justify-content: center;
          margin: 25px 0;
        }
        .gross span {
          border-color: #3bc78d;
          background: #0e3328;
          color: #79efbd;
        }
        .inputRow {
          width: min(650px, 100%);
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 10px;
          margin: 0 auto;
        }
        input {
          min-width: 0;
          padding: 15px 16px;
          border: 1px solid #355367;
          border-radius: 13px;
          background: #081724;
          color: white;
          font: inherit;
          font-size: 17px;
          text-transform: uppercase;
        }
        .inputRow button, .successActions button, .successActions a {
          border: 0;
          border-radius: 13px;
          padding: 14px 20px;
          background: #55dda7;
          color: #06150f;
          font: inherit;
          font-weight: 950;
          cursor: pointer;
          text-decoration: none;
        }
        .successMark {
          width: 74px;
          height: 74px;
          display: grid;
          place-items: center;
          margin: 0 auto 18px;
          border-radius: 50%;
          background: #4cdda3;
          color: #062116;
          font-size: 38px;
          font-weight: 950;
          box-shadow: 0 0 40px rgba(76, 221, 163, .2);
        }
        .successActions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 24px;
        }
        .successActions a {
          background: #142a3a;
          color: #d9e8ee;
          border: 1px solid #304b5e;
        }
        @media (max-width: 760px) {
          .top { grid-template-columns: 1fr; }
          .missionBox { width: max-content; text-align: left; }
          .antworten { grid-template-columns: 1fr; }
          .navPill { display: none; }
        }
        @media (max-width: 520px) {
          .shell { width: min(100% - 20px, 1080px); margin-top: 22px; }
          .nav { padding-left: 12px; padding-right: 12px; }
          .letters span, .gross span { width: 39px; height: 44px; font-size: 19px; }
          .inputRow { grid-template-columns: 1fr; }
          .questionMeta { align-items: flex-start; }
        }
      `}</style>
    </main>
  );
}
