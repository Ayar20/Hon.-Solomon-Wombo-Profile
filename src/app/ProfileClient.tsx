"use client";

import React, { useState, FormEvent, useEffect } from "react";
import Head from "next/head";

export default function ProfileClient({ initialData }: { initialData: any }) {
  const DATA = initialData;
  const [lightboxData, setLightboxData] = useState<{ src?: string; title?: string; desc?: string } | null>(null);

  const openLightbox = (src: string, title?: string, desc?: string) => {
    setLightboxData({ src, title, desc });
  };

  const closeLightbox = () => {
    setLightboxData(null);
  };

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, []);

  const handleContactSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    const subject = encodeURIComponent(`Contact from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:office@solomonwombo.ng?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <header>
        <div className="container nav">
          <div className="brand">
            <img src="/Profile Picture.jpg" alt="Hon. Solomon Wombo" />
            <div>
              <h1 className="title-text !text-[28px] !mb-0 !tracking-[0.5px]">Hon. Solomon Wombo</h1>
              <div className="muted text-white/85 !font-medium">Member, National Assembly</div>
            </div>
          </div>
          <nav className="menu" aria-label="Primary">
            <a href="#about">About</a>
            <a href="#priorities">Priorities</a>
            <a href="#achievements">Achievements</a>
            <a href="#timeline">Timeline</a>
            <a href="#media">Media</a>
            <a href="#contact">Contact</a>
          </nav>
          <div className="cta">
            <a className="primary" href="#contact">Get in touch</a>
          </div>
        </div>
      </header>

      <div className="emblems">
        <div className="container">
          <div className="emblems-grid">
            <div className="emblem-item">
              <img src="/National Assembly.png" alt="Nigerian Coat of Arms" />
              <span>Federal Republic<br />of Nigeria</span>
            </div>
            <div className="emblem-item">
              <img src="/House of Rep.png" alt="National Assembly" />
              <span>National Assembly</span>
            </div>
            <div className="emblem-item">
              <img src="/APC Logo.jfif" alt="APC Logo" />
              <span>All Progressives<br />Congress</span>
            </div>
            <div className="emblem-item">
              <img src="/nigerian_flag.png" alt="Nigerian Flag" />
              <span>Nigerian Flag</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container hero">
        <div className="hero-card">
          <div className="panel">
            <h2 className="title-text">Service, accountability, and impact.</h2>
            <p className="subtitle">Focused on effective representation, community development, and transparent governance.</p>
            <div className="tags">
              <span className="tag">National Assembly</span>
              <span className="tag">Public Service</span>
              <span className="tag">Community Development</span>
            </div>
            <div className="stats">
              <div className="stat">
                <div className="kpi">{DATA.kpis.projects}</div>
                <div className="label">Documented projects</div>
              </div>
              <div className="stat">
                <div className="kpi">{DATA.kpis.bills}</div>
                <div className="label">Bills & motions</div>
              </div>
              <div className="stat">
                <div className="kpi">{DATA.kpis.communities}</div>
                <div className="label">Communities reached</div>
              </div>
            </div>
          </div>
          <div className="portrait">
            <img src={DATA.portrait} alt="Portrait of Hon. Solomon Wombo" />
          </div>
        </div>
      </div>

      <section id="about">
        <div className="container">
          <h3 className="section-title">About</h3>
          <div className="panel">
            <div className="about-card">
              <p>
                Hon. Prince Solomon Wombo is a first-term member of the Nigerian House of Representatives, representing the Katsina-Ala/Ukum/Logo Federal Constituency 
                (the Sankera Axis) of Benue State. Born on April 4, 1965, he is affectionately known by his constituents as the "Prince of Peace."
              </p>
              <br />
              <p className="muted">
                A member of the All Progressives Congress (APC), Hon. Wombo holds a Bachelor of Science degree and served as Special Adviser on Local Government 
                and Chieftaincy Affairs before his election. In the 10th National Assembly, he serves on the House Committee on Appropriation and as Deputy Chairman 
                of the Committee on North East Development Commission. His stewardship is characterized by a comprehensive approach to security, education, healthcare, 
                infrastructure, and economic development across the Sankera Axis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="priorities">
        <div className="container">
          <h3 className="section-title">Legislative priorities</h3>
          <div className="grid" id="prioritiesGrid">
            {DATA.priorities.map((p: any, i: number) => (
              <div className="card" key={i}>
                <div className="body">
                  <h4>{p.title}</h4>
                  <p>{p.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="achievements">
        <div className="container">
          <h3 className="section-title">Achievements</h3>
          <p className="muted">A selection of documented projects, programs, and initiatives. Click any card to view details.</p>
          <div className="grid" id="achievementsGrid">
            {DATA.achievements.map((a: any, i: number) => (
              <div className="card" key={i}>
                <div className="media" onClick={() => openLightbox(a.image_url, a.title, a.description)}>
                  <img src={a.image_url} alt={a.title} />
                </div>
                <div className="body">
                  <span className="chip">{new Date(a.achievement_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</span>
                  <h4>{a.title}</h4>
                  <p>{a.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="timeline">
        <div className="container">
          <h3 className="section-title">Timeline</h3>
          <div className="timeline" id="timelineList">
            {DATA.timeline.map((ev: any, i: number) => (
              <div className="event" key={i}>
                <div className="dot"></div>
                <div className="panel">
                  <div className="date">{new Date(ev.event_date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: '2-digit' })}</div>
                  <h4>{ev.title}</h4>
                  <p>{ev.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="media">
        <div className="container">
          <h3 className="section-title">Media</h3>
          <p className="muted">Photos and press materials from community engagements and legislative activities.</p>
          <div className="grid" id="mediaGrid">
            {DATA.media.map((m: any, i: number) => (
              <div className="card" key={i}>
                <div className="media" onClick={() => openLightbox(m.image_url, m.title, m.description)}>
                  <img src={m.image_url} alt={m.title} />
                </div>
                <div className="body">
                  <h4>{m.title}</h4>
                  <p>{m.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact">
        <div className="container">
          <h3 className="section-title">Contact</h3>
          <div className="contact-section">
            <div className="panel">
              <h4>Office of Hon. Solomon Wombo</h4>
              <p className="muted">For official correspondence, media requests, and community matters.</p>
              <form id="contactForm" onSubmit={handleContactSubmit}>
                <input type="text" name="name" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Your email" required />
                <textarea name="message" rows={4} placeholder="Your message" required></textarea>
                <button type="submit" className="btn">Send message</button>
                <span className="note !block">Submitting opens your email client with a pre-filled message.</span>
              </form>
            </div>
            <div className="panel">
              <h4>Stay connected</h4>
              <div className="social" id="socialLinks">
                {DATA.social.map((s: any, i: number) => (
                  <a key={i} href={s.href}>{s.label}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container flex justify-between gap-[12px] flex-wrap">
          <div>© {new Date().getFullYear()} Office of Hon. Solomon Wombo. All rights reserved.</div>
          <div className="muted">Deployed via Next.js on Vercel. Database provided by Neon.</div>
        </div>
      </footer>

      {lightboxData && (
        <div className="lightbox open" id="lightbox" onClick={(e) => {
          if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('frame')) {
            closeLightbox();
          }
        }}>
          <div className="frame">
            <img id="lightboxImg" src={lightboxData.src} alt={lightboxData.title} />
            <div className="meta">
              <h4 id="lightboxTitle">{lightboxData.title}</h4>
              <p id="lightboxDesc">{lightboxData.desc}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
