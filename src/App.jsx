import { useEffect, useMemo, useState } from "react";
import { NavLink, Route, Routes, useLocation } from "react-router-dom";
import portrait from "./assets/portfolio-portrait.png";
import { profile } from "./data/profile.js";

const MailIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 6h16v12H4z" />
    <path d="m4 7 8 6 8-6" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2.8a9.2 9.2 0 0 0-2.9 17.9c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.1-3.4-1.1-.5-1.1-1.1-1.4-1.1-1.4-.9-.6.1-.6.1-.6 1 0 1.6 1.1 1.6 1.1.9 1.6 2.4 1.1 2.9.9.1-.7.4-1.1.7-1.3-2.2-.2-4.5-1.1-4.5-4.9 0-1.1.4-2 1.1-2.7-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.8 9.8 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7.7.7 1.1 1.6 1.1 2.7 0 3.8-2.3 4.6-4.5 4.9.4.3.8 1 .8 2v2.9c0 .3.2.6.7.5A9.2 9.2 0 0 0 12 2.8Z" />
  </svg>
);

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const StarIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="m12 2.8 1.9 5.7 5.8.1-4.7 3.4 1.8 5.7-4.8-3.4-4.8 3.4 1.8-5.7-4.7-3.4 5.8-.1Z" />
  </svg>
);

function App() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;
    let frameId = 0;

    const updatePointer = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      root.style.setProperty("--mx", `${x}%`);
      root.style.setProperty("--my", `${y}%`);
      root.style.setProperty("--mxp", (event.clientX / window.innerWidth).toFixed(3));
      root.style.setProperty("--myp", (event.clientY / window.innerHeight).toFixed(3));
      targetX = event.clientX;
      targetY = event.clientY;
    };

    const animateCursor = () => {
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;
      root.style.setProperty("--cx", `${currentX}px`);
      root.style.setProperty("--cy", `${currentY}px`);
      frameId = window.requestAnimationFrame(animateCursor);
    };

    const updateScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
      root.style.setProperty("--scroll", progress.toFixed(3));
    };

    updateScroll();
    root.style.setProperty("--cx", `${currentX}px`);
    root.style.setProperty("--cy", `${currentY}px`);
    frameId = window.requestAnimationFrame(animateCursor);
    window.addEventListener("pointermove", updatePointer);
    window.addEventListener("scroll", updateScroll, { passive: true });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsLoading(false);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoading) {
      return undefined;
    }

    const nodes = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 }
    );

    nodes.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [isLoading, location.pathname]);

  return (
    <div className={`page-shell ${isLoading ? "is-loading" : "is-ready"}`}>
      <LoadingScreen isLoading={isLoading} />
      <div className="custom-cursor" aria-hidden="true">
        <StarIcon />
      </div>

      <div className="ambient-canvas" aria-hidden="true">
        <div className="mesh-layer mesh-layer-a" />
        <div className="mesh-layer mesh-layer-b" />
        <div className="mesh-layer mesh-layer-c" />
        <div className="pattern-layer pattern-layer-a" />
        <div className="pattern-layer pattern-layer-b" />
        <div className="pattern-layer pattern-layer-c" />
        <div className="pattern-layer pattern-layer-d" />
        <div className="pattern-layer pattern-layer-e" />
        <div className="pattern-layer pattern-layer-f" />
        <div className="pattern-layer pattern-layer-g" />
        <div className="pattern-layer pattern-layer-h" />
        <div className="pointer-glow" />
      </div>

      <div className="app-shell">
        <header className="site-header">
          <a className="brand brand-card" href="#/">
            <span className="brand-mark">{profile.initials}</span>
            <span className="brand-copy">
              <strong>{profile.name}</strong>
              <small>{profile.role}</small>
            </span>
          </a>
          <nav aria-label="Primary navigation">
            <NavLink to="/" end>
              Home
            </NavLink>
            <NavLink to="/projects">Projects</NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function LoadingScreen({ isLoading }) {
  return (
    <div className={`loading-screen ${isLoading ? "is-active" : "is-exit"}`} aria-hidden={!isLoading}>
      <div className="loading-core">
        <div className="loading-mark">
          <span>{profile.initials}</span>
        </div>
        <p className="loading-kicker">Portfolio Experience</p>
        <h1>{profile.name}</h1>
        <div className="loading-line" />
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <section className="hero-section">
        <div className="hero-copy reveal reveal-left">
          <p className="eyebrow">{profile.role}</p>
          <h1>{profile.headline}</h1>
          <p className="intro">{profile.about}</p>
          <div className="hero-actions" aria-label="Portfolio actions">
            <a className="primary-action" href="#/projects">
              View Projects <ArrowIcon />
            </a>
            <a className="icon-action" href={`mailto:${profile.emails.personal}`} title="Send email">
              <MailIcon />
            </a>
            <a className="icon-action" href={profile.github} title="Open GitHub">
              <GithubIcon />
            </a>
          </div>
        </div>
        <div className="portrait-wrap reveal reveal-right" aria-label="Profile picture">
          <img src={portrait} alt={`${profile.name} profile visual`} />
        </div>
      </section>

      <section className="content-band reveal reveal-up">
        <div className="section-heading">
          <p className="eyebrow">Research Interests</p>
          <h2>Topics I want to explore deeper</h2>
        </div>
        <div className="interest-grid">
          {profile.researchInterests.map((interest) => (
            <article className="interest-card reveal reveal-up" key={interest.title}>
              <span>{interest.code}</span>
              <h3>{interest.title}</h3>
              <p>{interest.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="details-layout reveal reveal-up">
        <div className="details-block">
          <h2>Details</h2>
          <aside className="details-panel reveal reveal-up" aria-label="Personal details">
            <Detail label="Name" value={profile.name} />
            <Detail label="Phone" value={profile.phone} />
            <Detail label="Personal Email" value={profile.emails.personal} />
            <Detail label="College Email" value={profile.emails.college} />
            <div className="skill-list" aria-label="Skills">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-row">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Projects() {
  const filters = useMemo(() => ["All", ...new Set(profile.projects.map((project) => project.category))], []);
  const [activeFilter, setActiveFilter] = useState("All");

  const visibleProjects = useMemo(() => {
    if (activeFilter === "All") {
      return profile.projects;
    }
    return profile.projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section className="projects-page reveal reveal-up">
      <div className="section-heading projects-heading">
        <p className="projects-label">Projects</p>
        <div className="filter-row" aria-label="Project filters">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              className={`filter-chip ${activeFilter === filter ? "is-active" : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="project-grid">
        {visibleProjects.map((project) => (
          <article className="project-card reveal reveal-up" key={project.title}>
            <div className="project-topline">
              <span>{project.type}</span>
              <small>{project.category}</small>
            </div>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="tech-stack">
              {project.tech.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <a className="repo-link" href={project.github} target="_blank" rel="noreferrer">
              <GithubIcon /> GitHub Repository
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}

export default App;
