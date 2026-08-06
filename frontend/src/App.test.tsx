import { act, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { axe } from 'vitest-axe'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App, ArticlesExperience } from './App'

function renderAt(path: string) {
  window.history.replaceState(null, '', path)
  return render(<App />)
}

describe('StableShell routes', () => {
  beforeEach(() => window.history.replaceState(null, '', '/'))
  afterEach(() => window.history.replaceState(null, '', '/'))

  it.each([
    ['/', 'Spec-driven AI-assisted software engineering, solution architecture, agentic systems, and modernization.'],
    ['/articles', 'Articles'],
    ['/projects', 'Projects'],
    ['/methods', 'Methods'],
    ['/people', 'People'],
    ['/about', 'About Elustondo.ai'],
    ['/contact', 'Contact'],
  ])('renders %s as a permanent route', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
  })

  it('navigates without a document reload and marks the current page', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const articlesLink = within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Articles' })
    await user.click(articlesLink)

    expect(window.location.pathname).toBe('/articles')
    expect(articlesLink).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument()
  })

  it('responds to browser history changes', () => {
    renderAt('/articles')
    act(() => {
      window.history.pushState(null, '', '/projects')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByRole('heading', { level: 1, name: 'Projects' })).toBeInTheDocument()

    act(() => {
      window.history.replaceState(null, '', '/articles')
      window.dispatchEvent(new PopStateEvent('popstate'))
    })
    expect(screen.getByRole('heading', { level: 1, name: 'Articles' })).toBeInTheDocument()
  })

  it('moves keyboard focus to main content on every permanent route', async () => {
    const user = userEvent.setup()
    renderAt('/methods')
    const skipLink = screen.getByRole('link', { name: 'Skip to main content' })
    await user.tab()
    expect(skipLink).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(screen.getByRole('main')).toHaveFocus()
  })

  it('opens and closes mobile navigation accessibly', async () => {
    const user = userEvent.setup()
    renderAt('/')
    const control = screen.getByRole('button', { name: 'primary navigation' })
    expect(control).toHaveAttribute('aria-expanded', 'false')
    await user.click(control)
    expect(control).toHaveAttribute('aria-expanded', 'true')
    expect(within(screen.getByRole('navigation', { name: 'Primary navigation' })).getByRole('link', { name: 'Home' })).toHaveFocus()
    await user.keyboard('{Escape}')
    expect(control).toHaveAttribute('aria-expanded', 'false')
    expect(control).toHaveFocus()
  })

  it('renders an accessible branded not-found page', async () => {
    const { container } = renderAt('/not-a-real-page')
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Return home' })).toHaveAttribute('href', '/')
    expect((await axe(container)).violations).toHaveLength(0)
  })

  it('has no automated accessibility violations on every permanent route', async () => {
    for (const path of ['/', '/articles', '/projects', '/methods', '/people', '/about', '/contact']) {
      const view = renderAt(path)
      expect((await axe(view.container)).violations).toHaveLength(0)
      view.unmount()
    }
  })

  it('keeps pillar relevance and Latest as visibly separate article journeys', () => {
    renderAt('/articles')
    expect(screen.getByRole('heading', { name: 'Start with the ideas that matter to your work' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Recent writing' })).toBeInTheDocument()
    expect(screen.getByText(/strictly chronological/i)).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Useful writing without an assigned pillar' })).toBeInTheDocument()
  })

  it('shows canonical titles and Medium destinations without a visitor-time request', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch')
    renderAt('/articles')
    const canonicalLinks = screen.getAllByRole('link', { name: 'Read on Medium' })
    expect(screen.getAllByText('Domain Analysis & Wirfs-Brock’s Responsibility-Driven Design for Agentic AI').length).toBeGreaterThan(0)
    expect(screen.queryByText('The Three Amigos Agent Architecture')).not.toBeInTheDocument()
    expect(canonicalLinks.every((link) => link.getAttribute('href')?.startsWith('https://medium.com/@pabloelustondo/'))).toBe(true)
    expect(fetchSpy).not.toHaveBeenCalled()
    fetchSpy.mockRestore()
  })

  it('presents empty, partial, and refresh-failure states clearly', () => {
    const empty = render(<ArticlesExperience records={[]} />)
    expect(screen.getByRole('status')).toHaveTextContent('No approved articles yet')
    empty.unmount()

    const partial = render(<ArticlesExperience status="PARTIAL" />)
    expect(screen.getByRole('status')).toHaveTextContent('partially refreshed')
    partial.unmount()

    render(<ArticlesExperience status="REFRESH_FAILURE" />)
    expect(screen.getByRole('status')).toHaveTextContent('last known good local snapshot')
  })
})
