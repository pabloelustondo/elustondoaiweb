import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react'
import { articles, company, methods, people, projects } from './content/siteContent'
import { approvedArticleSnapshot } from './content/articles/approvedArticleSnapshot'
import { fetchArticleLibrary, type ArticleLibrary } from './content/articles/articleCatalogClient'
import { APPROVED_PILLARS, applyArticleTaxonomy, editorialTaxonomy, type ArticlePillar, type ClassifiedArticle } from './content/articles/articleTaxonomy'
import { rankLatest, rankPillarArticles } from './content/articles/articleRanker'

const navigation = [
  ['Home', '/'],
  ['Articles', '/articles'],
  ['Projects', '/projects'],
  ['Methods', '/methods'],
  ['People', '/people'],
  ['About', '/about'],
  ['Contact', '/contact'],
] as const

type RoutePath = (typeof navigation)[number][1]

function normalizePath(pathname: string) {
  if (pathname === '/') return '/'
  return pathname.replace(/\/+$/, '') || '/'
}

function navigate(path: string) {
  if (normalizePath(window.location.pathname) === normalizePath(path)) return
  window.history.pushState(null, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function InternalLink({ href, className, children, onNavigate, ariaCurrent }: { href: RoutePath; className?: string; children: ReactNode; onNavigate?: () => void; ariaCurrent?: 'page' }) {
  const follow = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    onNavigate?.()
    navigate(href)
  }

  return <a href={href} className={className} aria-current={ariaCurrent} onClick={follow}>{children}</a>
}

function usePathname() {
  const [pathname, setPathname] = useState(() => normalizePath(window.location.pathname))

  useEffect(() => {
    const updatePath = () => setPathname(normalizePath(window.location.pathname))
    window.addEventListener('popstate', updatePath)
    return () => window.removeEventListener('popstate', updatePath)
  }, [])

  return pathname
}

export function PrimaryNavigation({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    menuRef.current?.querySelector<HTMLAnchorElement>('a')?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return (
    <nav aria-label="Primary navigation">
      <button ref={buttonRef} className="menu-button" type="button" aria-expanded={open} aria-controls="primary-menu" onClick={() => setOpen(!open)}>
        <span aria-hidden="true">{open ? 'Close' : 'Menu'}</span><span className="sr-only"> primary navigation</span>
      </button>
      <div ref={menuRef} id="primary-menu" className="primary-menu" data-open={open}>
        {navigation.map(([label, path]) => (
          <InternalLink key={path} href={path} ariaCurrent={currentPath === path ? 'page' : undefined} onNavigate={() => setOpen(false)}>{label}</InternalLink>
        ))}
      </div>
    </nav>
  )
}

export function Header({ currentPath }: { currentPath: string }) {
  return <header className="site-header"><div className="shell header-inner">
    <InternalLink className="brand" href="/"><img src="/assets/Elustondo.ai-Logo-Primary.svg" alt="Elustondo.ai" /></InternalLink>
    <PrimaryNavigation currentPath={currentPath} />
  </div></header>
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return <a href={href}>{children} <span aria-hidden="true">↗</span></a>
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: ReactNode }) {
  return <section id={id} className="section" aria-labelledby={`${id}-title`}><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2>{children}</section>
}

function Page({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <main id="main-content" tabIndex={-1} className="page-main">
    <div className="page-intro shell"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p className="lede">{intro}</p></div>
    <div className="shell page-body">{children}</div>
  </main>
}

function ArticleCard({ article, headingLevel = 2 }: { article: (typeof articles)[number]; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 3 ? 'h3' : 'h2'
  return <article className="content-card">
    <p className="card-label">Article · {article.publishedLabel}</p>
    <Heading>{article.title}</Heading>
    {article.summary && <p>{article.summary}</p>}
    <ExternalLink href={article.url}>Read on Medium</ExternalLink>
  </article>
}

const pillarDefinitions: Record<ArticlePillar, string> = {
  'SDLC²': 'Specification-driven and evidence-driven AI-assisted software engineering.',
  Architecture: 'System boundaries, responsibilities, runtimes, and agent design.',
  Modernization: 'Careful evolution of established software and delivery systems.',
}

const classifiedArticles = applyArticleTaxonomy(approvedArticleSnapshot, editorialTaxonomy)

// Reviewed bundled snapshot: shown immediately and kept when the catalog fetch fails.
const fallbackLibrary: ArticleLibrary = {
  refreshedAt: approvedArticleSnapshot.refreshedAt,
  articles,
  classified: classifiedArticles,
}

function useArticleLibrary(): { library: ArticleLibrary; status: ArticleLibraryStatus } {
  const [state, setState] = useState<{ library: ArticleLibrary; status: ArticleLibraryStatus }>({
    library: fallbackLibrary,
    status: 'READY',
  })

  useEffect(() => {
    let active = true
    fetchArticleLibrary().then((library) => {
      if (!active) return
      setState(library ? { library, status: 'READY' } : { library: fallbackLibrary, status: 'REFRESH_FAILURE' })
    })
    return () => { active = false }
  }, [])

  return state
}

function DiscoveryArticle({ reasons, publicArticle }: { reasons: readonly string[]; publicArticle: (typeof articles)[number] | undefined }) {
  if (!publicArticle) return null
  return <article className="discovery-card">
    <p className="card-label">{publicArticle.author} · {publicArticle.publishedLabel}</p>
    <h4>{publicArticle.title}</h4>
    {publicArticle.summary && <p>{publicArticle.summary}</p>}
    <p className="relevance-reason"><strong>Why this appears:</strong> {reasons.join(' ')}</p>
    <ExternalLink href={publicArticle.url}>Read on Medium</ExternalLink>
  </article>
}

export type ArticleLibraryStatus = 'READY' | 'PARTIAL' | 'REFRESH_FAILURE'

export function ArticlesExperience({ records = classifiedArticles, status = 'READY', publicArticles = articles }: { records?: readonly ClassifiedArticle[]; status?: ArticleLibraryStatus; publicArticles?: readonly (typeof articles)[number][] }) {
  const publicArticleById = new Map(publicArticles.map((article) => [article.id, article]))
  const latest = rankLatest(records)
  const unclassified = records.filter((article) => article.classificationState === 'UNCLASSIFIED')

  if (records.length === 0) {
    return <div className="library-state" role="status"><h2>No approved articles yet</h2><p>The article library will appear after an approved local snapshot is available.</p></div>
  }

  return <div className="article-library">
    {status !== 'READY' && <div className="library-state" role="status">
      <h2>{status === 'PARTIAL' ? 'Article index partially refreshed' : 'Latest refresh was not published'}</h2>
      <p>{status === 'PARTIAL' ? 'The reviewed local snapshot remains available while some source records await review.' : 'The last known good local snapshot remains available while the refresh issue is reviewed.'}</p>
    </div>}
    <section className="pillar-discovery" aria-labelledby="pillar-discovery-title">
      <p className="eyebrow">Browse by pillar</p>
      <h2 id="pillar-discovery-title">Start with the ideas that matter to your work</h2>
      <div className="pillar-grid">
        {APPROVED_PILLARS.map((pillar) => {
          const ranked = rankPillarArticles(records, pillar)
          return <section className="pillar-panel" key={pillar} aria-labelledby={`pillar-${pillar}`}>
            <h3 id={`pillar-${pillar}`}>{pillar}</h3>
            <p>{pillarDefinitions[pillar]}</p>
            <div className="pillar-articles">{ranked.length > 0
              ? ranked.map(({ article, reasons }) => <DiscoveryArticle key={article.sourceId} reasons={reasons} publicArticle={publicArticleById.get(article.sourceId)} />)
              : <p className="empty-state">No approved articles are classified here yet.</p>}</div>
          </section>
        })}
      </div>
    </section>
    <section className="unclassified-note" aria-labelledby="unclassified-title">
      <p className="eyebrow">Awaiting classification</p>
      <h2 id="unclassified-title">Useful writing without an assigned pillar</h2>
      <p>{unclassified.length === 0 ? 'Every approved article currently has an editorial assignment.' : `${unclassified.length} approved ${unclassified.length === 1 ? 'article remains' : 'articles remain'} visible in Latest while Pablo decides where ${unclassified.length === 1 ? 'it belongs' : 'they belong'}.`}</p>
      {unclassified.length > 0 && <ul>{unclassified.map((article) => <li key={article.sourceId}>{article.canonicalTitle}</li>)}</ul>}
    </section>
    <section className="latest-writing" aria-labelledby="latest-writing-title">
      <p className="eyebrow">Latest by publication date</p>
      <h2 id="latest-writing-title">Recent writing</h2>
      <p className="section-intro">This stream is strictly chronological. Editorial relevance never changes its order.</p>
      <div className="content-list">{latest.map((article) => {
        const publicArticle = publicArticleById.get(article.sourceId)
        return publicArticle ? <ArticleCard key={article.sourceId} article={publicArticle} headingLevel={3} /> : null
      })}</div>
    </section>
  </div>
}

export function HomePage() {
  const { library } = useArticleLibrary()
  return <main id="main-content" tabIndex={-1}>
    <section className="hero shell" aria-labelledby="page-title">
      <p className="eyebrow">{company.legalName}</p>
      <h1 id="page-title">Spec-driven AI-assisted software engineering, solution architecture, agentic systems, and modernization.</h1>
      <p className="lede">Elustondo.ai brings decades of experience together with a younger team, advancing leading-edge AI-assisted engineering while sharing our methods, selected projects, and research.</p>
      <div className="actions"><InternalLink className="button primary" href="/articles">Read our work</InternalLink><InternalLink className="button secondary" href="/projects">View current work</InternalLink></div>
    </section>
    <div className="shell content-grid"><div>
      <Section id="writing" eyebrow="Selected writing" title="Ideas developed through practice">
        <div className="cards">{library.articles.slice(0, 3).map((article) => <article key={article.id}><p className="card-label">{article.publishedLabel}</p><h3>{article.title}</h3>{article.summary && <p>{article.summary}</p>}<ExternalLink href={article.url}>Read on Medium</ExternalLink></article>)}</div>
        <p className="section-link"><InternalLink href="/articles">View all articles</InternalLink></p>
      </Section>
      <Section id="work" eyebrow="Current work" title="Building and learning in public">
        <div className="feature"><h3>{projects[0].name}</h3><p>{projects[0].summary}</p><InternalLink href="/projects">View projects</InternalLink></div>
      </Section>
      <Section id="methods" eyebrow="Methods" title="Clarity before automation">
        <div className="feature"><h3>{methods[0].name}</h3><p>{methods[0].summary}</p><InternalLink href="/methods">Explore the method</InternalLink></div>
      </Section>
      <Section id="people" eyebrow="People" title="A collaborative practice">
        <p>{people.map((person) => person.name).join(', ')}.</p><InternalLink href="/people">Meet the people</InternalLink>
      </Section>
      <Section id="about" eyebrow="About" title="A serious space for practical engineering">
        <p>We use the site to publish useful technical material, present reviewed work, and improve our own software delivery discipline.</p><InternalLink href="/about">About Elustondo.ai</InternalLink>
      </Section>
    </div><aside className="editorial-note" aria-labelledby="editorial-title"><p className="eyebrow">Editorial note</p><h2 id="editorial-title">Clarity over volume. Substance over noise.</h2><p>This site evolves deliberately as projects mature and articles are revised and curated.</p></aside></div>
    <section className="contact"><div className="shell"><p className="eyebrow">Contact</p><h2>Start a thoughtful conversation.</h2><p>For an engagement or professional inquiry, contact Elustondo.ai directly.</p><InternalLink className="button light" href="/contact">Contact Elustondo.ai</InternalLink></div></section>
  </main>
}

function ArticlesPage() {
  const { library, status } = useArticleLibrary()
  return <Page eyebrow="Knowledge" title="Articles" intro="Explore approved writing by editorial pillar and relevance, or follow the separate newest-first stream."><ArticlesExperience records={library.classified} status={status} publicArticles={library.articles} /></Page>
}

function ProjectsPage() {
  return <Page eyebrow="Selected work" title="Projects" intro="Public work chosen deliberately from the Elustondo.ai GitHub list."><div className="content-list">{projects.map((project) => <article className="content-card" key={project.id}><p className="card-label">Public repository</p><h2>{project.name}</h2><p>{project.summary}</p>{project.repositoryUrl && <ExternalLink href={project.repositoryUrl}>View on GitHub</ExternalLink>}</article>)}</div></Page>
}

function MethodsPage() {
  return <Page eyebrow="How we work" title="Methods" intro="Engineering practices made explicit, testable, and useful to people and AI agents."><div className="content-list">{methods.map((method) => <article className="content-card method-card" key={method.id}><p className="card-label">Canonical method</p><h2>{method.name}</h2><p>{method.summary}</p><p className="source-note">The canonical specification is maintained with this website’s source and delivery documentation.</p></article>)}</div></Page>
}

function PeoplePage() {
  return <Page eyebrow="The practice" title="People" intro="The people currently represented by Elustondo.ai, with public professional profiles on LinkedIn."><div className="people-grid">{people.map((person) => <article className="person-card" key={person.id}><div className="initials" aria-hidden="true">{person.name.split(' ').map((part) => part[0]).join('')}</div><h2>{person.name}</h2><ExternalLink href={person.linkedInUrl}>LinkedIn profile</ExternalLink></article>)}</div></Page>
}

function AboutPage() {
  return <Page eyebrow={company.legalName} title="About Elustondo.ai" intro="A serious public space for practical software engineering, carefully reviewed work, and continuing learning."><div className="prose"><h2>Why this site exists</h2><p>Elustondo.ai is the public brand of {company.legalName}. We use the site to publish useful technical material, present reviewed work, and improve our own software delivery discipline.</p><p>The permanent experience remains useful without AI. New capabilities and content are added deliberately as their purpose, source, and evidence become clear.</p><h2>Where we are</h2><p>{company.location}.</p></div></Page>
}

function ContactPage() {
  return <Page eyebrow="Professional inquiries" title="Contact" intro="Start a thoughtful conversation about an engagement, collaboration, or the material published here."><div className="contact-panel"><h2>Email Elustondo.ai</h2><p>Contact Pablo Elustondo directly at the approved company address.</p><a className="button primary" href={`mailto:${company.email}`}>Email {company.email}</a></div></Page>
}

function NotFoundPage() {
  return <Page eyebrow="Elustondo.ai" title="Page not found" intro="The page you requested is not part of the public site."><p><InternalLink className="button primary" href="/">Return home</InternalLink></p></Page>
}

function CurrentPage({ pathname }: { pathname: string }) {
  switch (pathname) {
    case '/': return <HomePage />
    case '/articles': return <ArticlesPage />
    case '/projects': return <ProjectsPage />
    case '/methods': return <MethodsPage />
    case '/people': return <PeoplePage />
    case '/about': return <AboutPage />
    case '/contact': return <ContactPage />
    default: return <NotFoundPage />
  }
}

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><p>© 2026 {company.legalName}</p><p>{company.location}</p><a href={`mailto:${company.email}`}>{company.email}</a></div></footer>
}

export function App() {
  const pathname = usePathname()

  useEffect(() => {
    const current = navigation.find(([, path]) => path === pathname)?.[0]
    document.title = current && current !== 'Home' ? `${current} — Elustondo.ai` : pathname === '/' ? 'Elustondo.ai' : 'Page not found — Elustondo.ai'
  }, [pathname])

  const focusMainContent = (event: MouseEvent<HTMLAnchorElement>) => {
    const mainContent = document.getElementById('main-content')
    if (!mainContent) return
    event.preventDefault()
    mainContent.focus()
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}#main-content`)
  }

  return <><a className="skip-link" href="#main-content" onClick={focusMainContent}>Skip to main content</a><Header currentPath={pathname} /><CurrentPage pathname={pathname} /><Footer /></>
}
