import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="brand">
          <div className="logo">🇬🇧</div>
          <div>
            <h1>CityQuest London</h1>
            <span>Visual city challenge · English only</span>
          </div>
        </div>
        <div className="pill">London Mission</div>
      </header>
      <main>
        <section className="hero">
          <div className="card hero-card">
            <span className="kicker">LONDON FIELD MISSION</span>
            <h2>Look closely. Think. Decide.</h2>
            <p className="lead">Explore London through real images, clues and short challenges. No open chat. Every mission gives you something concrete to observe, work out and answer.</p>
            <div className="mission-strip">
              <div><strong>6</strong><span>missions</span></div>
              <div><strong>15–25</strong><span>minutes</span></div>
              <div><strong>A2–B1</strong><span>English</span></div>
            </div>
            <div className="actions"><Link href="/play"><button>Start Mission</button></Link></div>
          </div>
          <div className="card briefing">
            <div className="briefing-label">YOUR BRIEFING</div>
            <h3>A locked case is waiting at the final checkpoint.</h3>
            <p>Each correct answer reveals a code fragment. Collect all five digits and use them in the final mission.</p>
            <div className="brief-grid">
              <div className="brief-item">📷<span>Real London images</span></div>
              <div className="brief-item">🔎<span>Observation clues</span></div>
              <div className="brief-item">❓<span>Multiple choice</span></div>
              <div className="brief-item">🔐<span>Final code</span></div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}