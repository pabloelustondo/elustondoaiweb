import { useEffect, useRef, useState } from 'react'

const navigation = [
  ['Home', 'home'], ['Writing', 'writing'], ['Work', 'work'], ['Methods', 'methods'],
  ['People', 'people'], ['About', 'about'], ['Contact', 'contact'],
] as const

export function PrimaryNavigation() {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const firstLink = menuRef.current?.querySelector<HTMLAnchorElement>('a')
    firstLink?.focus()
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
        {navigation.map(([label, target]) => <a key={target} href={`#${target}`} onClick={() => setOpen(false)}>{label}</a>)}
      </div>
    </nav>
  )
}

export function Header() {
  return <header className="site-header"><div className="shell header-inner">
    <a className="brand" href="#home" aria-label="Elustondo.ai home"><img src="/assets/Elustondo.ai-Logo-Primary.svg" alt="Elustondo.ai" /></a>
    <PrimaryNavigation />
  </div></header>
}

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="section" aria-labelledby={`${id}-title`}><p className="eyebrow">{eyebrow}</p><h2 id={`${id}-title`}>{title}</h2>{children}</section>
}

export function HomePage() {
  return <main id="main-content" tabIndex={-1}>
    <section id="home" className="hero shell" aria-labelledby="page-title">
      <p className="eyebrow">Elustondo Systems Consulting Inc.</p>
      <h1 id="page-title">Practical software architecture, AI-assisted engineering, and agentic systems.</h1>
      <p className="lede">A Canadian technology practice sharing careful work, useful engineering methods, and disciplined experiments in how software is designed and delivered.</p>
      <div className="actions"><a className="button primary" href="#writing">Read our work</a><a className="button secondary" href="#work">View current work</a></div>
    </section>
    <div className="shell content-grid"><div>
      <Section id="writing" eyebrow="Selected writing" title="Ideas developed through practice">
        <div className="cards">
          <article><p className="card-label">Software engineering</p><h3>Specification-driven AI-assisted software engineering</h3><p>How intent, explicit boundaries, and evidence can make AI-assisted delivery more trustworthy.</p></article>
          <article><p className="card-label">Design methods</p><h3>Responsibility-driven design for the agentic AI era</h3><p>A practical way to reason about ownership, boundaries, and collaboration in systems that include agents.</p></article>
          <article><p className="card-label">Context architecture</p><h3>Simple context architecture for personal multi-agent systems</h3><p>Keeping durable knowledge, task context, and agent responsibilities understandable as a system grows.</p></article>
        </div>
      </Section>
      <Section id="work" eyebrow="Current work" title="Building and learning in public">
        <div className="feature"><h3>Elustondo.ai website</h3><p>This website is a real exercise in evidence-led delivery and a controlled environment for learning about AI-assisted interfaces. The permanent site is designed to remain useful without AI.</p></div>
      </Section>
      <Section id="methods" eyebrow="Methods" title="Clarity before automation">
        <div className="method-list"><p><strong>Explicit intent.</strong> Define the purpose and boundary before implementation.</p><p><strong>Responsible design.</strong> Make ownership and collaboration visible.</p><p><strong>Evidence-led delivery.</strong> Separate plans, implementation claims, independent checks, and approval.</p></div>
      </Section>
      <Section id="people" eyebrow="People" title="A collaborative practice">
        <p>Elustondo.ai is the public brand of Elustondo Systems Consulting Inc. Detailed people profiles and approved professional links will follow as reviewed public content.</p>
      </Section>
      <Section id="about" eyebrow="About" title="A serious space for practical engineering">
        <p>We use the site to publish useful technical material, present reviewed work, and improve our own software delivery discipline. It will evolve deliberately as projects mature and articles are revised.</p>
      </Section>
    </div><aside className="editorial-note" aria-labelledby="editorial-title"><p className="eyebrow">Editorial note</p><h2 id="editorial-title">Clarity over volume. Substance over noise.</h2><p>This site will evolve gradually as projects mature and articles are revised and curated.</p></aside></div>
    <section id="contact" className="contact"><div className="shell"><p className="eyebrow">Contact</p><h2>Start a thoughtful conversation.</h2><p>For an engagement or professional inquiry, contact Elustondo.ai directly.</p><a className="button light" href="mailto:pablo@elustondo.ai">Email pablo@elustondo.ai</a></div></section>
  </main>
}

export function Footer() {
  return <footer className="site-footer"><div className="shell footer-inner"><p>© 2026 Elustondo Systems Consulting Inc.</p><p>Toronto, Canada</p><a href="mailto:pablo@elustondo.ai">pablo@elustondo.ai</a></div></footer>
}

export function App() {
  const focusMainContent = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const mainContent = document.getElementById('main-content')
    if (!mainContent) return

    event.preventDefault()
    mainContent.focus()
    window.history.pushState(null, '', '#main-content')
  }

  return <><a className="skip-link" href="#main-content" onClick={focusMainContent}>Skip to main content</a><Header /><HomePage /><Footer /></>
}
