import { sql } from '@/lib/db';
import ProfileClient from './ProfileClient';

export default async function Home() {
  // Fetch data dynamically from Neon database
  const kpisData = await sql`SELECT * FROM kpis LIMIT 1`;
  const priorities = await sql`SELECT * FROM priorities ORDER BY display_order ASC, id ASC`;
  const achievements = await sql`SELECT * FROM achievements ORDER BY display_order ASC, id ASC`;
  const timelineEvents = await sql`SELECT * FROM timeline_events ORDER BY display_order ASC, event_date DESC`;
  const mediaGallery = await sql`SELECT * FROM media_gallery ORDER BY display_order ASC, id ASC`;

  // Default KPIs if not seeded
  const defaultKpis = { projects: 0, bills: 0, communities: 0 };

  const data = {
    kpis: kpisData.length > 0 ? kpisData[0] : defaultKpis,
    priorities,
    achievements,
    timeline: timelineEvents,
    media: mediaGallery,
    social: [
      { label: "Email", href: "mailto:office@solomonwombo.ng" },
      { label: "Phone", href: "tel:+2348000000000" },
      { label: "Facebook", href: "https://facebook.com/solomonwombo" },
      { label: "X (Twitter)", href: "https://twitter.com/solomonwombo" },
      { label: "Instagram", href: "https://instagram.com/solomonwombo" }
    ],
    portrait: "/Hon Solomon Wombo.jpg"
  };

  return <ProfileClient initialData={data} />;
}
