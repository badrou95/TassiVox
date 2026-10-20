import cms from "@/content/tassivox.json";

type Article = {
  id: string; title: string; slug: string; summary: string | null;
  category: string; cover_image: string | null; published_at: string | null;
  is_featured: boolean; is_special: boolean;
};

const sections = ["Algérie", "Monde", "Économie", "Technologie", "Sport", "Culture"];

async function getFrontPage() {
  const articles = (cms.articles || []).filter((a:any) => a.status === "published").sort((a:any,b:any) => (b.published_at||"").localeCompare(a.published_at||"")).slice(0,12) as Article[];
  return { articles, setting: cms.settings || {}, connected: true };
}

function Brand() {
  return <a className="brand" href="/" aria-label="TASSIVOX, accueil">
    <span className="brand-symbol" aria-hidden="true"><i/><i/><i/></span>
    <span className="brand-name">TASSI<span>VOX</span><small>LA VOIX DE L’ALGÉRIE, L’ÉCHO DU MONDE</small></span>
  </a>;
}

function dateLabel(value: string | null) {
  if (!value) return "RÉCEMMENT PUBLIÉ";
  return new Intl.DateTimeFormat("fr-FR", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value)).toUpperCase();
}

export default async function Home() {
  const { articles, setting, connected } = await getFrontPage();
  const featured = articles.find(a => a.is_featured) || articles[0];
  const recent = articles.filter(a => a.id !== featured?.id).slice(0, 5);
  const social = (setting?.social_links || {}) as Record<string, string>;
  const special = articles.find(a => a.is_special) || articles.find(a => a.slug === setting?.special_article_slug);
  const specialText = setting?.special_headline || special?.title;
  return <main>
    {special && specialText && <a className="special-ticker" href={`/article/${special.slug}`}><b>INFO SPÉCIALE</b><span>{specialText}</span><strong>↗</strong></a>}
    <div className="topline"><div className="shell topline-inner"><span>LE REGARD ALGÉRIEN SUR LE MONDE</span><span className="edition"><i/> ÉDITION FRANÇAISE <b>/</b> INDÉPENDANCE · CONTEXTE · CLARTÉ</span></div></div>
    <header className="site-header shell"><Brand/><nav aria-label="Rubriques principales">{sections.map(s=><a key={s} href={`/#${s.toLowerCase()}`}>{s}</a>)}</nav><a className="search-link" href="/admin/login">ESPACE RÉDACTION ↗</a></header>
    <section className="hero shell">
      <div className="hero-copy"><div className="eyebrow"><i/> L’ACTUALITÉ, AVEC DU RECUL</div><h1>La voix de<br/><em>l’Algérie.</em><br/>L’écho du monde.</h1><p>Les faits avant le bruit. Des perspectives algériennes, une lecture internationale et le contexte pour comprendre ce qui se passe.</p><a className="text-link" href="#a-la-une">EXPLORER L’ACTUALITÉ <span>↗</span></a></div>
    </section>
    <div className="ticker"><div className="shell ticker-inner"><b>NOTRE LIGNE</b><span>VÉRIFIER LES FAITS</span><i>✳</i><span>DONNER DU CONTEXTE</span><i>✳</i><span>ÉCOUTER LES VOIX</span><i>✳</i><span>REGARDER PLUS LOIN</span></div></div>
    <section className="news-section shell" id="a-la-une">
      <div className="section-heading"><div><div className="eyebrow"><i/> LA RÉDACTION</div><h2>Le fil de <em>l’essentiel.</em></h2></div><p>UNE INFORMATION LISIBLE.<br/>UN MONDE PLUS COMPRÉHENSIBLE.</p></div>
      {!connected && <aside className="notice"><span>i</span><p><strong>La base éditoriale n’est pas encore configurée.</strong> Les articles apparaîtront ici après la première publication depuis l’espace rédaction.</p></aside>}
      {connected && articles.length === 0 && <aside className="notice"><span>i</span><p><strong>La rédaction prépare ses premières publications.</strong> Aucun article n’est publié pour le moment. Les brouillons ne sont pas visibles sur le site public.</p></aside>}
      {featured && <div className="frontpage-grid" style={{display:"block",maxWidth:"900px",margin:"0 auto"}}>
        <article className="featured-story">
          <a href={`/article/${featured.slug}`} className="featured-art" style={featured.cover_image ? {backgroundImage:`linear-gradient(0deg,rgba(12,37,29,.18),rgba(12,37,29,.02)),url("${featured.cover_image}")`} : undefined}>
            <span>À LA UNE</span><b>{featured.category?.slice(0,2).toUpperCase() || "TV"}</b><small>TASSIVOX · ÉDITION FRANÇAISE</small>
          </a>
          <div className="story-meta"><span>{featured.category}</span><small>{dateLabel(featured.published_at)}</small></div>
          <h3><a href={`/article/${featured.slug}`}>{featured.title}</a></h3>
          <p>{featured.summary}</p>
          <a className="text-link" href={`/article/${featured.slug}`}>LIRE L’ARTICLE <span>↗</span></a>
        </article>
        <aside className="recent-stories" style={{marginTop:"38px"}}><div className="recent-heading"><h3>Les dernières publications</h3><span>LE FIL RÉCENT</span></div>
          {recent.map((a, i)=><article className="recent-story" key={a.id}><a href={`/article/${a.slug}`} className={`recent-thumb recent-thumb-${i%3}`} aria-label={`Lire ${a.title}`}>{a.category.slice(0,2).toUpperCase()}</a><div><div className="story-meta"><span>{a.category}</span></div><h4><a href={`/article/${a.slug}`}>{a.title}</a></h4><p>{a.summary}</p><small>{dateLabel(a.published_at)}</small></div></article>)}
        </aside>
      </div>}
      <div className="category-heading"><div className="eyebrow"><i/> EXPLORER NOS RUBRIQUES</div><div className="category-links">{sections.map(s=><a key={s} id={s.toLowerCase()} href={`/rubrique/${encodeURIComponent(s.toLowerCase())}`}>{s}<span>↗</span></a>)}</div></div>
    </section>
    <section className="mission"><div className="shell mission-inner"><div><div className="eyebrow"><i/> NOTRE ENGAGEMENT</div><h2>Informer sans<br/><em>simplifier le monde.</em></h2></div><p>TASSIVOX ambitionne de raconter l’Algérie et le monde avec rigueur, curiosité et indépendance. Chaque information doit être contextualisée, attribuée à ses sources et clairement distinguée du commentaire.</p></div></section>
    <footer className="site-footer shell">
      <div className="footer-main"><Brand/><p>La voix de l’Algérie, l’écho du monde.</p></div>
      <div className="footer-info"><strong>RESPONSABILITÉS</strong><span>Fondateur : {setting?.founder_name || "À renseigner"}</span><span>Directeur de publication : {setting?.director_name || "À renseigner"}</span><span>Administration technique : {setting?.technical_admin_name || "À renseigner"}</span><small>Les mentions légales et coordonnées officielles sont à compléter avant lancement public.</small></div>
      <div className="footer-social"><strong>NOUS SUIVRE</strong>{Object.entries(social).filter(([,url])=>typeof url==="string" && url.trim()).map(([name,url])=><a key={name} href={url} target="_blank" rel="noreferrer">{name} ↗</a>)}</div>
      <small className="copyright">© {new Date().getFullYear()} TASSIVOX · TOUS DROITS RÉSERVÉS</small>
    </footer>
  </main>;
}
